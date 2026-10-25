-- Royal Sweets initial schema. Apply to a new Supabase project before running seed.sql.
create extension if not exists pgcrypto;

create table public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role = 'admin'),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Only a database owner may insert or change admin_users. No client write policy.
create or replace function public.is_admin()
returns boolean language sql stable security definer
set search_path = ''
as $$ select exists (
  select 1 from public.admin_users
  where user_id = (select auth.uid()) and role = 'admin' and is_active
); $$;
revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

create table public.categories (
  id text primary key,
  name text not null check (length(name) between 1 and 100),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  description text not null default '',
  image_path text,
  image_alt text,
  parent_id text references public.categories(id) on delete restrict,
  display_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint category_not_own_parent check (id <> parent_id)
);
create index categories_parent_order_idx on public.categories(parent_id, display_order);

create table public.products (
  id text primary key,
  category_id text not null references public.categories(id) on delete restrict,
  subcategory_id text references public.categories(id) on delete restrict,
  name text not null check (length(name) between 1 and 140),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  short_description text,
  detailed_description text,
  primary_image_path text,
  image_alt text,
  stock_status text not null default 'unknown' check (stock_status in ('unknown','available','out-of-stock')),
  is_published boolean not null default false,
  is_featured boolean not null default false,
  display_order integer not null default 0,
  price_source text,
  price_verified_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index products_category_order_idx on public.products(category_id, subcategory_id, display_order);
create index products_public_idx on public.products(is_published, stock_status);

create table public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id text not null references public.products(id) on delete cascade,
  storage_path text not null unique,
  alt_text text not null check (length(alt_text) between 1 and 240),
  display_order integer not null default 0,
  created_at timestamptz not null default now()
);
create index product_images_order_idx on public.product_images(product_id, display_order);

create table public.product_price_options (
  id text primary key,
  product_id text not null references public.products(id) on delete cascade,
  label text not null check (length(label) between 1 and 80),
  unit text check (unit is null or (length(unit) between 1 and 40)),
  quantity numeric(10,3) check (quantity is null or quantity > 0),
  price_cents integer not null check (price_cents >= 0),
  price_kind text not null default 'reference' check (price_kind in ('reference','direct')),
  is_active boolean not null default true,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index product_prices_order_idx on public.product_price_options(product_id, display_order);

create table public.homepage_sections (
  id text primary key,
  section_key text not null unique,
  section_type text not null check (section_type in ('hero','categories','specials','offers','visit')),
  heading text not null default '' check (length(heading) <= 180),
  eyebrow text check (length(eyebrow) <= 180),
  subheading text check (length(subheading) <= 400),
  description text check (length(description) <= 1500),
  image_path text,
  image_alt text,
  is_visible boolean not null default false,
  display_order integer not null default 0,
  updated_at timestamptz not null default now()
);

create table public.promotions (
  id uuid primary key default gen_random_uuid(),
  title text not null check (length(title) between 1 and 140),
  description text not null default '' check (length(description) <= 1200),
  image_path text,
  image_alt text,
  discount_type text check (discount_type in ('percent','amount')),
  discount_value integer check (discount_value is null or discount_value > 0),
  starts_at timestamptz,
  ends_at timestamptz,
  is_published boolean not null default false,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint valid_promotion_schedule check (ends_at is null or starts_at is null or ends_at > starts_at),
  constraint valid_discount_pair check ((discount_type is null) = (discount_value is null)),
  constraint valid_percent check (discount_type <> 'percent' or discount_value <= 100)
);

create table public.todays_specials (
  id uuid primary key default gen_random_uuid(),
  product_id text not null references public.products(id) on delete restrict,
  promotional_message text check (length(promotional_message) <= 300),
  starts_at timestamptz,
  ends_at timestamptz,
  is_published boolean not null default false,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint valid_special_schedule check (ends_at is null or starts_at is null or ends_at > starts_at)
);

create or replace function public.set_updated_at()
returns trigger language plpgsql set search_path = '' as $$
begin new.updated_at = now(); return new; end; $$;
create trigger admin_users_updated before update on public.admin_users for each row execute function public.set_updated_at();
create trigger categories_updated before update on public.categories for each row execute function public.set_updated_at();
create trigger products_updated before update on public.products for each row execute function public.set_updated_at();
create trigger prices_updated before update on public.product_price_options for each row execute function public.set_updated_at();
create trigger sections_updated before update on public.homepage_sections for each row execute function public.set_updated_at();
create trigger promotions_updated before update on public.promotions for each row execute function public.set_updated_at();
create trigger specials_updated before update on public.todays_specials for each row execute function public.set_updated_at();

create or replace function public.check_product_category()
returns trigger language plpgsql set search_path = '' as $$
begin
  if not exists (select 1 from public.categories where id = new.category_id and parent_id is null) then
    raise exception 'category_id must identify a primary category';
  end if;
  if new.subcategory_id is not null and not exists (
    select 1 from public.categories where id = new.subcategory_id and parent_id = new.category_id
  ) then raise exception 'subcategory must belong to category'; end if;
  return new;
end; $$;
create trigger product_category_valid before insert or update of category_id, subcategory_id on public.products
for each row execute function public.check_product_category();

create or replace function public.check_category_parent()
returns trigger language plpgsql set search_path = '' as $$
begin
  if new.parent_id is not null and not exists (
    select 1 from public.categories where id = new.parent_id and parent_id is null
  ) then raise exception 'only one level of subcategory is supported'; end if;
  if new.parent_id is not null and exists (
    select 1 from public.categories where parent_id = new.id
  ) then raise exception 'a category with children cannot become a subcategory'; end if;
  return new;
end; $$;
create trigger category_parent_valid before insert or update of parent_id on public.categories
for each row execute function public.check_category_parent();

alter table public.admin_users enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.product_images enable row level security;
alter table public.product_price_options enable row level security;
alter table public.homepage_sections enable row level security;
alter table public.promotions enable row level security;
alter table public.todays_specials enable row level security;

create policy admin_self_read on public.admin_users for select to authenticated
  using (user_id = (select auth.uid()));

create policy category_public_read on public.categories for select to anon, authenticated
  using (is_active);
create policy category_admin_read on public.categories for select to authenticated using ((select public.is_admin()));
create policy category_admin_insert on public.categories for insert to authenticated with check ((select public.is_admin()));
create policy category_admin_update on public.categories for update to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));
create policy category_admin_delete on public.categories for delete to authenticated using ((select public.is_admin()));

create policy product_public_read on public.products for select to anon, authenticated
  using (is_published and exists (
    select 1 from public.categories c where c.id = category_id and c.is_active
  ) and (subcategory_id is null or exists (
    select 1 from public.categories s where s.id = subcategory_id and s.is_active
  )));
create policy product_admin_read on public.products for select to authenticated using ((select public.is_admin()));
create policy product_admin_insert on public.products for insert to authenticated with check ((select public.is_admin()));
create policy product_admin_update on public.products for update to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));
create policy product_admin_delete on public.products for delete to authenticated using ((select public.is_admin()));

create policy product_image_public_read on public.product_images for select to anon, authenticated
  using (exists (select 1 from public.products p where p.id = product_id and p.is_published));
create policy product_image_admin_read on public.product_images for select to authenticated using ((select public.is_admin()));
create policy product_image_admin_insert on public.product_images for insert to authenticated with check ((select public.is_admin()));
create policy product_image_admin_update on public.product_images for update to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));
create policy product_image_admin_delete on public.product_images for delete to authenticated using ((select public.is_admin()));

create policy price_public_read on public.product_price_options for select to anon, authenticated
  using (is_active and exists (select 1 from public.products p where p.id = product_id and p.is_published));
create policy price_admin_read on public.product_price_options for select to authenticated using ((select public.is_admin()));
create policy price_admin_insert on public.product_price_options for insert to authenticated with check ((select public.is_admin()));
create policy price_admin_update on public.product_price_options for update to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));
create policy price_admin_delete on public.product_price_options for delete to authenticated using ((select public.is_admin()));

create policy section_public_read on public.homepage_sections for select to anon, authenticated using (is_visible);
create policy section_admin_read on public.homepage_sections for select to authenticated using ((select public.is_admin()));
create policy section_admin_insert on public.homepage_sections for insert to authenticated with check ((select public.is_admin()));
create policy section_admin_update on public.homepage_sections for update to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));
create policy section_admin_delete on public.homepage_sections for delete to authenticated using ((select public.is_admin()));

create policy promotion_public_read on public.promotions for select to anon, authenticated
  using (is_published and (starts_at is null or starts_at <= now()) and (ends_at is null or ends_at > now()));
create policy promotion_admin_read on public.promotions for select to authenticated using ((select public.is_admin()));
create policy promotion_admin_insert on public.promotions for insert to authenticated with check ((select public.is_admin()));
create policy promotion_admin_update on public.promotions for update to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));
create policy promotion_admin_delete on public.promotions for delete to authenticated using ((select public.is_admin()));

create policy special_public_read on public.todays_specials for select to anon, authenticated
  using (is_published and (starts_at is null or starts_at <= now()) and (ends_at is null or ends_at > now())
    and exists (select 1 from public.products p where p.id = product_id and p.is_published));
create policy special_admin_read on public.todays_specials for select to authenticated using ((select public.is_admin()));
create policy special_admin_insert on public.todays_specials for insert to authenticated with check ((select public.is_admin()));
create policy special_admin_update on public.todays_specials for update to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));
create policy special_admin_delete on public.todays_specials for delete to authenticated using ((select public.is_admin()));

-- Private bucket: object reads require a referenced public record or administrator role.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('royal-assets', 'royal-assets', false, 5242880, array['image/jpeg','image/png','image/webp'])
on conflict (id) do nothing;

create policy royal_asset_read on storage.objects for select to anon, authenticated
  using (bucket_id = 'royal-assets' and (
    (select public.is_admin()) or
    exists (select 1 from public.products p where p.primary_image_path = name and p.is_published) or
    exists (select 1 from public.product_images pi join public.products p on p.id = pi.product_id
      where pi.storage_path = name and p.is_published) or
    exists (select 1 from public.categories c where c.image_path = name and c.is_active) or
    exists (select 1 from public.homepage_sections h where h.image_path = name and h.is_visible) or
    exists (select 1 from public.promotions pr where pr.image_path = name and pr.is_published
      and (pr.starts_at is null or pr.starts_at <= now()) and (pr.ends_at is null or pr.ends_at > now()))
  ));
create policy royal_asset_insert on storage.objects for insert to authenticated
  with check (bucket_id = 'royal-assets' and (select public.is_admin())
    and name ~ '^(products|categories|homepage|promotions)/[a-zA-Z0-9_-]+/[a-zA-Z0-9_-]+\.(jpg|jpeg|png|webp)$');
create policy royal_asset_update on storage.objects for update to authenticated
  using (bucket_id = 'royal-assets' and (select public.is_admin()))
  with check (bucket_id = 'royal-assets' and (select public.is_admin()));
create policy royal_asset_delete on storage.objects for delete to authenticated
  using (bucket_id = 'royal-assets' and (select public.is_admin()));
