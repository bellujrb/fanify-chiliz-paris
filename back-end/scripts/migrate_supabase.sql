-- Tabela de partidas (matches)
create table if not exists matches (
  id text primary key,
  "HypeA" numeric,
  "HypeB" numeric,
  "goalsA" integer,
  "goalsB" integer,
  "start" bigint,
  "end" bigint,
  "scheduledTime" bigint,
  "status" integer,
  "teamAAbbreviation" text,
  "teamBAbbreviation" text,
  "hashtag" text
);

-- Tabela de twits
create table if not exists twits (
  id text primary key,
  text text,
  hype_id text references matches(id),
  teamA boolean,
  created_at bigint,
  hypeA numeric,
  hypeB numeric
); 