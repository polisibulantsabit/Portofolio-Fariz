-- Jalankan di Supabase Dashboard > SQL Editor
create table if not exists public.contacts (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    email text,
    subject text,
    service text,
    budget text,
    message text not null,
    created_at timestamptz not null default now()
);

alter table public.contacts enable row level security;

drop policy if exists "allow anon insert contacts" on public.contacts;
create policy "allow anon insert contacts"
    on public.contacts
    for insert
    to anon, authenticated
    with check (true);
