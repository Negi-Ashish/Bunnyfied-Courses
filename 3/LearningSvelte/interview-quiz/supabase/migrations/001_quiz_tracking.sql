-- ============================================================
-- Quiz attempt tracking + custom test builder
-- ============================================================

-- One row per question answered per session
create table if not exists quiz_attempts (
  id            uuid        primary key default gen_random_uuid(),
  session_id    uuid        not null,
  quiz_id       int         not null,
  quiz_name     text        not null,
  question_id   int         not null,
  question_text text        not null,
  selected_opt  text,
  correct_opt   text        not null,
  is_correct    boolean,
  attempted_at  timestamptz default now()
);

create index if not exists quiz_attempts_session   on quiz_attempts (session_id);
create index if not exists quiz_attempts_question  on quiz_attempts (quiz_id, question_id);
create index if not exists quiz_attempts_time      on quiz_attempts (attempted_at desc);


-- Teacher-built custom tests
create table if not exists custom_tests (
  id            uuid        primary key default gen_random_uuid(),
  name          text        not null,
  -- array of { quiz_id, question_id, quiz_name }
  question_ids  jsonb       not null default '[]',
  created_at    timestamptz default now()
);
