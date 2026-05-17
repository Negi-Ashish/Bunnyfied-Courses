# Interview Quiz — Developer Reference

## Stack

- **Framework:** SvelteKit (Svelte 4) + TypeScript
- **Styling:** Tailwind CSS (dark glassmorphism theme)
- **Database:** Supabase (shared project with Chess-Analyzer)
- **Deployment:** Vercel (`@sveltejs/adapter-vercel`)

---

## Project Structure

```
src/
├── app.css                        Global styles
├── assets.ts                      Image URL exports (used by Card.svelte)
├── questions.json                 All quiz data (quizzes → questions → options)
├── store.ts                       Global Svelte stores
├── lib/
│   └── supabase.ts                Supabase browser client
└── routes/
    ├── +layout.svelte             App shell — fixed top nav
    ├── +page.svelte               Home — quiz topic card grid
    ├── about/
    │   └── +page.svelte
    ├── quiz/[id]/
    │   ├── +page.ts               Load function — finds quiz by id from questions.json
    │   ├── +page.svelte           Quiz flow (questions, submit, next)
    │   └── components/
    │       ├── QuestionText.svelte
    │       ├── QuestionOption.svelte
    │       ├── QuestionButton.svelte
    │       └── QuestionProgressCircle.svelte
    ├── results/
    │   └── +page.svelte           Score screen — also saves session to Supabase
    ├── progress/
    │   └── +page.svelte           Teacher dashboard (localhost only — see nav guard)
    ├── tests/
    │   └── +page.svelte           Custom test list (accessible online)
    └── practice/[testId]/
        └── +page.svelte           Practice quiz loaded from Supabase custom_tests
```

---

## Environment Variables

Create `.env` in the project root:

```
PUBLIC_SUPABASE_URL=https://<your-project>.supabase.co
PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
```

Both are `PUBLIC_` so they are safe to expose in the browser bundle. Supabase
anon key is read-only without RLS policies, which is fine for this single-student
setup.

---

## Database

Run `supabase/migrations/001_quiz_tracking.sql` in the Supabase SQL editor once
to create the two tables.

### `quiz_attempts`

One row per question answered per session.

| Column         | Type        | Notes                                      |
|----------------|-------------|--------------------------------------------|
| `id`           | uuid PK     | auto                                       |
| `session_id`   | uuid        | random UUID generated when a quiz starts — groups all questions from one sitting |
| `quiz_id`      | int         | matches `id` in `questions.json`; `0` for practice tests |
| `quiz_name`    | text        | e.g. `"JavaScript"` or `"Custom Test — May 16"` |
| `question_id`  | int         | matches `id` inside the quiz's questions array |
| `question_text`| text        | stored here so it's readable without re-joining the JSON |
| `selected_opt` | text        | label the student picked, e.g. `"b"`       |
| `correct_opt`  | text        | the correct label                          |
| `is_correct`   | bool        |                                            |
| `attempted_at` | timestamptz | default `now()`                            |

### `custom_tests`

Teacher-built tests saved from the progress page.

| Column         | Type        | Notes                                      |
|----------------|-------------|--------------------------------------------|
| `id`           | uuid PK     | auto                                       |
| `name`         | text        | e.g. `"Custom Test — May 16"`              |
| `question_ids` | jsonb       | `[{ quiz_id, question_id, quiz_name }, ...]` |
| `created_at`   | timestamptz | default `now()`                            |

---

## Global Store (`src/store.ts`)

```ts
answers          writable<Answer[]>   // all questions + student's answers for the active session
sessionId        writable<string>     // UUID set when a quiz or practice test starts
currentQuizId    writable<number>     // quiz id (0 for practice tests)
currentQuizName  writable<string>     // quiz name or custom test name
```

These are set in `onMount` of `/quiz/[id]` and `/practice/[testId]`, then read
by `/results` to save to Supabase.

---

## Page-by-page

### `/quiz/[id]`

- Load function (`+page.ts`) finds the quiz in `questions.json` by `params.id`, throws 404 if missing.
- `onMount` generates a new `sessionId`, sets `currentQuizId`/`currentQuizName`, and populates the `answers` store.
- `handleSubmit` marks the answer as correct/incorrect in the store.
- `handleNext` advances the index; on the last question navigates to `/results`.

### `/results`

- Reads from the `answers` store (populated by the quiz or practice page).
- `onMount` inserts all answers into `quiz_attempts` in one Supabase call. A `saved` flag prevents double-saving on re-render.
- Displays a circular SVG score gauge and per-question breakdown with explanations.
- If the page is refreshed directly (store is empty), it silently skips the save.

### `/progress` *(teacher only — localhost)*

**Nav guard:** the navbar links to this page only render when
`$page.url.hostname === 'localhost'`. The page itself has no server-side block
so you can still open it on any URL if you know the path.

**What it shows:**
- All `quiz_attempts` rows fetched from Supabase, grouped by `session_id` (most recent first).
- Each session card: quiz name, timestamp, score (`X/Y correct`).
- Each question row: ✓/✗ badge + truncated question text + checkbox.

**Selection:**
- Click any question to toggle its checkbox.
- `selectedQuestions` is a `Map<string, { quiz_id, question_id, quiz_name }>` keyed by `"${quiz_id}-${question_id}"`. This deduplicates the same question across sessions — selecting it twice does nothing.
- **Select All Wrong** — adds every `is_correct === false` question.
- **Select All Right** — adds every `is_correct === true` question.

**Sticky footer** (visible when at least one question is selected):
- **Delete Selected** — deletes all `quiz_attempts` rows matching the selected `(quiz_id, question_id)` pairs from Supabase, then removes them from the local state without re-fetching.
- **Export JSON** — builds a JSON array in the same format as `questions.json` (grouped by quiz, full question objects) and triggers a browser download. Filenames increment via `localStorage` key `sq_export_count`: `selected_questions.json`, `selected_questions2.json`, etc.
- **Build Test →** — inserts a new row in `custom_tests` with the selected question refs, then navigates to `/tests`.

### `/tests`

- Lists all `custom_tests` rows ordered by `created_at DESC`.
- Each card: test name, question count, date.
- **Start →** links to `/practice/[id]` (works online — safe to share with the student).
- **Delete** removes the row from Supabase and the local list.
- Empty state: "No custom tests yet. Check back later." — no mention of the progress page.

### `/practice/[testId]`

- No load function. `onMount` fetches the custom test from `custom_tests` by `$page.params.testId`.
- Resolves full question objects from `questions.json` using the stored `{ quiz_id, question_id }` pairs.
- Sets `sessionId`, `currentQuizId = 0`, `currentQuizName = testName` in the store, then populates `answers`.
- Runs the exact same quiz flow and components as `/quiz/[id]`.
- On the last question navigates to `/results`, which saves results to `quiz_attempts` with `quiz_name = testName`.

---

## Full Data Flow

```
Student opens /quiz/[id]
  → onMount: new sessionId, answers store populated

Student answers questions
  → handleSubmit: answers store updated with is_correct

Last question submitted → navigate to /results
  → onMount: entire session written to quiz_attempts (Supabase)

Teacher opens /progress (localhost only)
  → all quiz_attempts fetched and grouped by session_id

Teacher selects questions
  → Select All Wrong / Select All Right / click individual rows

Teacher actions on selection:
  → Export JSON     : download selected_questionsN.json
  → Delete Selected : remove from Supabase + local state
  → Build Test      : save to custom_tests → navigate to /tests

Teacher opens /tests
  → copies /practice/[id] URL → sends to student

Student opens /practice/[testId] (works online)
  → same quiz flow → /results → saved to quiz_attempts

Cycle repeats: teacher reviews new session in /progress
```

---

## Adding New Quizzes

1. Add an entry to `src/questions.json` — follow the existing shape:
   ```json
   {
     "id": <unique int>,
     "name": "Topic Name",
     "imageUrl": "<key from src/assets.ts>",
     "questions": [
       {
         "id": <int, unique within this quiz>,
         "question": "Question text\noptional code block here",
         "options": [
           { "id": 1, "label": "a", "text": "..." },
           { "id": 2, "label": "b", "text": "..." },
           { "id": 3, "label": "c", "text": "..." },
           { "id": 4, "label": "d", "text": "..." }
         ],
         "answer": "b",
         "explanation": "Why b is correct."
       }
     ]
   }
   ```
2. Add a matching image export to `src/assets.ts`.
3. No code changes needed — the home page and quiz page read from the JSON automatically.
