create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'student' check (role in ('student','teacher','admin')),
  created_at timestamp with time zone default now()
);

alter table public.profiles enable row level security;

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id) values (new.id);
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

create table if not exists public.rooms (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  status text not null default 'waiting' check (status in ('waiting','active','finished')),
  player1 uuid references auth.users(id),
  player2 uuid references auth.users(id),
  current_card_id text,
  p1_score int not null default 0,
  p2_score int not null default 0,
  last_event jsonb,
  winner uuid
);

alter table public.rooms enable row level security;

create or replace function public.is_teacher_or_admin(uid uuid)
returns boolean language sql stable as $$
  select role in ('teacher','admin') from public.profiles where id = uid
$$;

create policy "rooms_read_own_or_teacher"
on public.rooms
for select
using (
  auth.role() = 'authenticated'
  and (
    public.is_teacher_or_admin(auth.uid())
    or player1 = auth.uid()
    or player2 = auth.uid()
  )
);

create policy "rooms_insert_self_p1"
on public.rooms
for insert
with check (player1 = auth.uid());

create policy "rooms_update_participants_or_teacher"
on public.rooms
for update
using (
  public.is_teacher_or_admin(auth.uid())
  or player1 = auth.uid()
  or player2 = auth.uid()
)
with check (
  public.is_teacher_or_admin(auth.uid())
  or player1 = auth.uid()
  or player2 = auth.uid()
);





