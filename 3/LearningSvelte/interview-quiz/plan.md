# Interview Quiz — Student Tracking & Custom Test Builder

## Goal

Track every quiz attempt the student makes. Give the teacher a dashboard to
review results and hand-pick questions into a custom test.

---

## Database (Supabase — same project as Chess-Analyzer)

### Table: `quiz_attempts`

One row per question answered per session.

```sql
id            uuid        PK, auto
session_id    uuid        groups all questions from one quiz sitting
quiz_id       int         which quiz topic (matches questions.json id)
quiz_name     text        e.g. "JavaScript"
question_id   int         matches question id inside questions.json
question_text text        stored so it's readable without joining JSON
selected_opt  text        label the student picked, e.g. "b"
correct_opt   text        the correct label, e.g. "a"
is_correct    bool
attempted_at  timestamptz default now()
```

`session_id` is a random UUID generated on the client when the quiz starts.
This groups all questions from one sitting together so the teacher can browse
session-by-session.

No user/auth columns — single student setup.

---

## App Pages

### Existing pages (unchanged)
- `/` — home, quiz topic cards
- `/quiz/[id]` — quiz flow
- `/results` — score + breakdown  ← **save to Supabase here**

### New pages

#### `/progress` — Teacher dashboard
- Lists all past sessions grouped by date
- Each session shows: quiz name, score, and each question as a green ✓ or red ✗
- Each question card has a **checkbox** the teacher can click to select it
- A sticky footer shows "X questions selected" + a **"Build Test"** button
- Clicking "Build Test" saves the selection as a custom test and navigates to `/tests`

#### `/tests` — Custom test list
- Lists all saved custom tests (name = auto-generated, e.g. "Custom Test — May 16")
- Each test shows how many questions it has
- A "Start" button navigates the student to `/practice/[testId]`

#### `/practice/[testId]` — Custom practice quiz
- Same UI as `/quiz/[id]` but loads questions from the saved custom test
- Results also saved to `quiz_attempts` with `quiz_name = "Practice"`

---

## Table: `custom_tests`

Stores teacher-built tests.

```sql
id           uuid        PK, auto
name         text        e.g. "Custom Test — May 16"
question_ids jsonb       array of { quiz_id, question_id } pairs
created_at   timestamptz default now()
```

---

## Implementation Steps

1. **Supabase migration** — create `quiz_attempts` and `custom_tests` tables
2. **Add Supabase client** — install `@supabase/supabase-js`, create `src/lib/supabase.ts`, add `.env` with URL + anon key
3. **Save results** — in `/results` page, after quiz completes write all answers to `quiz_attempts`
4. **`/progress` page** — fetch sessions from Supabase, render with checkboxes, Build Test button
5. **`/tests` page** — list saved custom tests from `custom_tests` table
6. **`/practice/[testId]` page** — load questions from JSON by the stored IDs, run quiz, save attempts

---

## Data Flow

```
Student takes quiz
       ↓
/results saves to quiz_attempts (Supabase)
       ↓
Teacher opens /progress
       ↓
Teacher checks questions → clicks "Build Test"
       ↓
Saved to custom_tests (Supabase)
       ↓
Teacher opens /tests → clicks "Start"
       ↓
Student takes /practice/[testId]
       ↓
Results saved to quiz_attempts again (cycle repeats)
```

---

## Open Questions

- Should the teacher be able to rename a custom test?
- Should past practice sessions show up separately in `/progress` vs regular quizzes?
- Do we need any simple passcode so only the teacher can access `/progress` and `/tests`?
