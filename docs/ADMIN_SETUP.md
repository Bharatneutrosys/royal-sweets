# Administrator setup and activation

The admin application is implemented, but this workspace has no Supabase credentials. **No live database, login, storage, or RLS behavior has been verified.** Use a separate development Supabase project first; do not test destructive actions against production.

## 1. Create and configure Supabase

1. Create a Supabase project. Record its Project URL and **publishable** API key. Do not use a service-role or secret key in the application. Disable public signups in Auth settings; there is no customer account flow in this sprint.
2. In the development project's SQL Editor, apply `supabase/migrations/202610240001_initial.sql` as the database owner. Inspect its output and confirm all eight public tables, their RLS policies, and the private `royal-assets` bucket exist. The migration creates the bucket and its object policies; do not switch it to public.
3. Apply the committed `supabase/seed.sql` **once** in the same project's SQL Editor. It inserts 17 categories, 47 products, 47 reference prices, and five homepage sections. Its `ON CONFLICT DO NOTHING` inserts do not overwrite owner edits on a later deliberate rerun, but do not run it automatically on startup or deployment. Regenerate it with `npm run seed:export` only when the source catalog deliberately changes.
4. Review Supabase Auth's URL configuration. Add `http://localhost:3000/auth/confirm` and the eventual production `/auth/confirm` URL to allowed redirects. Set the production site URL when ready. Configure an email provider appropriate for production password recovery; the default development mail service is insufficient for reliable delivery.
5. Customize the **Reset password** email template for SSR. The link must point to `{{ .RedirectTo }}?token_hash={{ .TokenHash }}&type=recovery` so the server route can verify the OTP and set the session cookie. Test the resulting link in the development project before relying on recovery. The default fragment-based link does not supply a server-readable token hash. Supabase documents this pattern in its [email template guide](https://supabase.com/docs/guides/auth/auth-email-templates).

## 2. Create the first administrator safely

1. From the Supabase dashboard as a project administrator, create or invite the owner's Auth user and set a strong password through Supabase's secure flow. Copy the resulting `auth.users.id` UUID. There is no public registration or first-admin endpoint.
2. While signed into the SQL Editor as the database owner, execute the following with that **real** UUID. Never place a UUID supplied by a browser form into this query without checking the Auth user first:

```sql
insert into public.admin_users (user_id, role, is_active)
values ('REPLACE_WITH_EXISTING_AUTH_USER_UUID', 'admin', true);
```

3. To revoke access, set `is_active = false` in this table and revoke the Auth session in the Supabase dashboard. Ordinary authenticated users cannot modify this allowlist under RLS. Keep dashboard/SQL Editor access limited to trusted operators.

## 3. Configure local and Vercel environments

Copy `.env.example` to `.env.local` locally and fill only these values:

```dotenv
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=YOUR_PUBLISHABLE_KEY
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

`.env.local` is ignored by Git. For Vercel, add the same names in Project Settings → Environment Variables with the exact production origin for `NEXT_PUBLIC_SITE_URL`; use separate Supabase projects/keys for development and production. After changing environment variables, build/deploy through the normal approved workflow. Never put a service-role or database password in a `NEXT_PUBLIC_` variable. See [Vercel environment variables](https://vercel.com/docs/environment-variables).

With no valid Supabase configuration, public pages show the local 47-item seed and `/admin/login` shows setup required. With configuration present, the database is authoritative; a failed query does not fall back to stale hardcoded catalog data. Admin changes are server writes and public reads occur at request time, so an owner edit should not require a GitHub push.

## 4. Verify in the development project

- Run `npm run seed:export`, `npm run validate:menu`, `npm run validate:admin`, `npm run typecheck`, `npm run lint`, and `npm run build` locally.
- Check Auth: admin login/logout, wrong password, inactive admin, normal signed-in user, missing configuration, password reset request and recovery link. Confirm `/admin` and every child route redirect or deny unauthorized users.
- Verify RLS directly with the development project's anon key and with a nonadmin Auth user: reads of drafts/inactive content and **all writes** must fail. The admin must be able to write. Check object uploads, reads of unpublished image paths, replacement, and removal. Review the [Supabase Storage access-control guide](https://supabase.com/docs/guides/storage/security/access-control).
- Create a draft product, add a direct price option, publish it, change category, set out of stock, hide/restore, upload/select/reorder/remove images, and confirm public menu reflection after refresh. Existing reference prices should remain labeled as reference until explicitly replaced.
- Edit homepage copy and order, disable/enable sections, schedule a special and promotion, and confirm start/end behavior in America/Chicago. Dates are stored as UTC; ambiguous or nonexistent DST times are rejected.
- Test the mobile layout and keyboard behavior manually. Browser-based visual verification is the owner's responsibility. Do not activate the production admin until login, persistence, RLS, storage, and negative authorization tests all pass.

## 5. Operations and remaining work

Back up the PostgreSQL database and Storage objects before bulk edits, migration changes, or production seeding. Restrict SQL Editor access; it bypasses application RLS. Record the date and operator of initial seed and admin allowlist changes. Storage and database writes are not one transaction, so investigate any upload cleanup error and remove orphaned files manually when necessary. Keep image rights/source records in `docs/IMAGE_SOURCES.md`; imported local photos are illustrative, not restaurant product proof.

This sprint intentionally has no native cart, checkout, payment, order tables, or order management. Sprint 3 will validate sellable prices and stock again on the server before accepting purchases. Sprint 4 remains the full security, accessibility, responsive, SEO, and performance launch review.
