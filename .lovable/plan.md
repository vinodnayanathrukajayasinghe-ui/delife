# DELIFE Admin CMS, Projects Editor & Lead Notifications

A three-part build on top of the existing site. All admin access becomes server-side authenticated (Supabase Auth + role table). Content is moved out of hardcoded files into Supabase tables, edited through an admin UI. Leads are captured to the database and emailed to you.

---

## 1. Secure server-side admin

**Auth model**
- Supabase Auth (email + password) replaces the current client-side credential check.
- New `user_roles` table + `app_role` enum (`admin`) + `has_role()` security definer function — the standard secure pattern (no roles on profiles).
- Route protection via TanStack `_authenticated` layout + a child `beforeLoad` that calls a `requireAdmin` server fn. Non-admins are redirected to `/login`.
- The existing hardcoded `admin@delifeinterior.com / Delife@12#` credentials are removed from the codebase. After the migration runs, you sign up that email once in Supabase and I'll grant it the `admin` role via SQL.

**CMS surface (editable from /admin)**
- Site Settings (phone, WhatsApp number, email, address, social links, hero headline/subheadline)
- Services (title, slug, description, icon, order, published)
- Projects (full editor — see §2)
- Gallery images (upload, caption, category, order)
- Page content blocks for About, Company Profile, Home highlights (rich text via a simple textarea + markdown render)
- Leads inbox (contact + WhatsApp inquiries with status: new / contacted / closed)

**Public pages** read from Supabase via `createServerFn` using `supabaseAdmin` with safe column projection (so public reads work during SSR without a session). Existing routes (`/services`, `/projects`, `/gallery`, etc.) are rewired to these server fns.

---

## 2. Projects admin editor

**`projects` table**
- title, slug, category, location, client, summary, description (markdown)
- cover_image_url, status (`completed` | `ongoing` | `upcoming`), completion_date, year
- featured (bool), published (bool), display_order

**`project_images` table** (one-to-many)
- project_id, url, caption, kind (`gallery` | `before` | `after`), pair_id (groups a before/after pair), display_order

**Storage**
- Public Supabase Storage bucket `project-media` with RLS: anyone can read, only admins can write/delete.

**Editor UI**
- Project list with search, status filter, drag-to-reorder.
- Create/edit form: all fields above, cover uploader, multi-upload gallery with reorder + delete, dedicated before/after pair uploader, category dropdown (editable list), date picker, publish toggle.
- Slug auto-generated from title with manual override + uniqueness check.

---

## 3. Lead notifications

**`leads` table**
- source (`contact_form` | `whatsapp_inquiry`), name, email, phone, subject, message, page_url, status, created_at.
- Public insert allowed via a dedicated server route at `/api/public/leads` (Zod-validated, basic rate limit by IP+email, honeypot field). No PII returned.

**Email**
- Lovable Emails (built-in). Sets up an email domain on `delifeinterior.com` if not configured, then scaffolds transactional emails.
- Two templates:
  - `lead-admin-notification` — sent to your inbox with full lead details + reply-to set to the lead's email.
  - `lead-user-confirmation` — sent to the visitor confirming receipt.
- Triggered from the `/api/public/leads` route after the row is inserted (idempotency key = lead id).

**Contact form & WhatsApp inquiry**
- Contact page form posts to `/api/public/leads` (`source: contact_form`).
- WhatsApp floating button: opens a small inquiry modal first (name + phone + short message), saves the lead, sends the emails, then opens `wa.me/<number>?text=...` with the pre-filled message. This way you capture every inquiry even if WhatsApp isn't completed.

**Google Sheets** — skipped by default (you said optional). Easy to add later via a connector if you want it.

---

## What I'll need from you after the build

1. Confirm the recipient email for lead notifications (default: `admin@delifeinterior.com`).
2. Confirm the sender domain for emails (default: `delifeinterior.com`). If DNS isn't on Lovable yet, you'll complete the domain setup dialog.
3. After deploy, sign up your admin email at `/login`; I'll run a one-line SQL insert into `user_roles` to grant admin.

---

## Technical notes (for reference)

- Migrations: `user_roles` + `has_role`, `site_settings` (single row), `services`, `projects`, `project_images`, `gallery_images`, `page_blocks`, `leads`, storage bucket + policies. All tables RLS-enabled; public read only on published rows where applicable; writes restricted to `has_role(auth.uid(),'admin')`.
- Server fns: `requireAdmin` middleware wraps all admin mutations; public reads use `supabaseAdmin` with WHERE filters.
- Image uploads go through a `createServerFn` that gets a signed upload URL — the browser uploads directly to Storage.
- Existing `/admin-login` and `/admin` pages are replaced; hardcoded credentials removed from `src/lib/auth.ts`.
- Email infra: `setup_email_infra` → `scaffold_transactional_email` → two templates registered in `email-templates/registry.ts`.
- All public endpoints under `/api/public/*` validate input with Zod and never return sensitive fields.

Approve and I'll start with the database migration, then build the admin UI, then wire up leads + email.
