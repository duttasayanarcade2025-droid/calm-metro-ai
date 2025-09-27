-- Trainsets table
create table if not exists public.trainsets (
  id text primary key,
  branding_priority boolean default false,
  updated_at timestamptz default now()
);

-- Jobs table
create table if not exists public.jobs (
  id text primary key,
  status text default 'open',
  overridden_at timestamptz
);

-- Overrides table
create table if not exists public.overrides (
  id uuid primary key default gen_random_uuid(),
  trainset_id text references public.trainsets(id) on delete cascade,
  note text,
  created_at timestamptz default now()
);

-- Cleaning slots table
create table if not exists public.cleaning_slots (
  id text primary key,
  blocked boolean default false,
  updated_at timestamptz default now()
);

-- Telemetry table for live train pulses
create table if not exists public.telemetry (
  id uuid primary key default gen_random_uuid(),
  trainset_id text references public.trainsets(id) on delete cascade,
  station text,
  x float8,
  y float8,
  z float8,
  updated_at timestamptz default now()
);

-- Recommended RLS (adjust policies per your org)
alter table public.trainsets enable row level security;
alter table public.jobs enable row level security;
alter table public.overrides enable row level security;
alter table public.cleaning_slots enable row level security;
alter table public.telemetry enable row level security;

-- Simple policies for authenticated users
do $$ begin
  create policy "auth select all" on public.trainsets for select to authenticated using (true);
exception when duplicate_object then null; end $$;
do $$ begin
  create policy "auth upsert all" on public.trainsets for insert to authenticated with check (true);
exception when duplicate_object then null; end $$;
do $$ begin
  create policy "auth update all" on public.trainsets for update to authenticated using (true) with check (true);
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "auth select all jobs" on public.jobs for select to authenticated using (true);
exception when duplicate_object then null; end $$;
do $$ begin
  create policy "auth update jobs" on public.jobs for update to authenticated using (true) with check (true);
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "auth select overrides" on public.overrides for select to authenticated using (true);
exception when duplicate_object then null; end $$;
do $$ begin
  create policy "auth insert overrides" on public.overrides for insert to authenticated with check (true);
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "auth select slots" on public.cleaning_slots for select to authenticated using (true);
exception when duplicate_object then null; end $$;
do $$ begin
  create policy "auth upsert slots" on public.cleaning_slots for insert to authenticated with check (true);
exception when duplicate_object then null; end $$;
do $$ begin
  create policy "auth update slots" on public.cleaning_slots for update to authenticated using (true) with check (true);
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "auth select telemetry" on public.telemetry for select to authenticated using (true);
exception when duplicate_object then null; end $$;
do $$ begin
  create policy "auth insert telemetry" on public.telemetry for insert to authenticated with check (true);
exception when duplicate_object then null; end $$;


