create table if not exists example (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  created_at  timestamptz not null default now()
);

-- Row-level security
alter table example enable row level security;

create policy "Public read" on example
  for select using (true);

create policy "Authenticated insert" on example
  for insert with check (auth.role() = 'authenticated');

create policy "Owner delete" on example
  for delete using (auth.role() = 'authenticated');
