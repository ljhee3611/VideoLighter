create table if not exists public.free_daily_usage (
  device_fingerprint text not null,
  usage_date date not null,
  files_used integer not null default 0,
  updated_at timestamptz not null default now(),
  primary key (device_fingerprint, usage_date)
);

create index if not exists idx_free_daily_usage_date on public.free_daily_usage(usage_date desc);
