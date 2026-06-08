# Implementation Plan - Ritinari Karya Indonesia Website

Build a cultural dance studio website for "Ritinari Karya Indonesia" using Next.js 16 App Router, TypeScript, Tailwind CSS v4, Shadcn/ui, next-intl, and Supabase.

## User Review Required

> [!IMPORTANT]
> **Database Schema & Credentials**:
> Please ensure you have a Supabase project set up. In `.env.local` (or your environment variables), you will need:
> - `NEXT_PUBLIC_SUPABASE_URL`
> - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
> - `SUPABASE_SERVICE_ROLE_KEY` (for administrative functions like table view/CRUD if RLS is enabled)
>
> You will also need to execute the SQL schema in your Supabase SQL Editor.

## Proposed SQL Schema

Run the following SQL in your Supabase SQL Editor to set up the database tables and standard storage bucket:

```sql
-- 1. Create tables
CREATE TABLE public.portofolio (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  event_date DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.pendaftaran (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nama TEXT NOT NULL,
  email TEXT NOT NULL,
  no_hp TEXT NOT NULL,
  pilihan_kelas TEXT NOT NULL,
  pesan TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.konten (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL CHECK (type IN ('artikel', 'youtube', 'team')),
  title TEXT NOT NULL,
  content TEXT NOT NULL, -- Holds article body, YouTube URL, or team member role
  image_url TEXT, -- For article thumbnail or team member profile picture
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS and insert simple policies if desired, or disable RLS for direct client-side operations.
-- For a production app, RLS is recommended. For convenience here, we will configure standard policies.
ALTER TABLE public.portofolio ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pendaftaran ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.konten ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to portofolio" ON public.portofolio FOR SELECT USING (true);
CREATE POLICY "Allow authenticated full access to portofolio" ON public.portofolio FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow public inserts to pendaftaran" ON public.pendaftaran FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated read/write access to pendaftaran" ON public.pendaftaran FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow public read access to konten" ON public.konten FOR SELECT USING (true);
CREATE POLICY "Allow authenticated full access to konten" ON public.konten FOR ALL USING (auth.role() = 'authenticated');

-- 2. Create Storage Bucket for Media
-- Navigate to Storage in Supabase and create a public bucket named "media"
```

---

## Proposed Changes

### [Internationalization Config]

#### [NEW] [routing.ts](file:///c:/laragon/www/ritinari_claude/src/i18n/routing.ts)
Set up locales `id` and `en` with `id` as the default locale.

#### [NEW] [request.ts](file:///c:/laragon/www/ritinari_claude/src/i18n/request.ts)
Set up `next-intl` request handler to load messages from `messages/[locale].json`.

#### [NEW] [id.json](file:///c:/laragon/www/ritinari_claude/messages/id.json)
Indonesian translations for page headers, sections, CTAs, labels, and validation.

#### [NEW] [en.json](file:///c:/laragon/www/ritinari_claude/messages/en.json)
English translations for the website content.

#### [MODIFY] [next.config.ts](file:///c:/laragon/www/ritinari_claude/next.config.ts)
Wrap with `withNextIntl`.

---

### [Supabase Integration]

#### [NEW] [supabase.ts](file:///c:/laragon/www/ritinari_claude/src/lib/supabase.ts)
Provide Supabase client initializers:
1. `supabase`: Client-side client for auth and basic public data fetching.
2. `createClient`: Server-side client (with cookies) for Server Components and Route Handlers.
3. `supabaseAdmin`: Client with service-role key for backend admin actions (if bypass is required).

#### [NEW] [middleware.ts](file:///c:/laragon/www/ritinari_claude/src/middleware.ts)
Combine `next-intl` path redirection and Supabase Auth session refresh/route protection. Protect `/admin/*` routes (except `/admin/login`).

---

### [Components & Styles]

#### [MODIFY] [globals.css](file:///c:/laragon/www/ritinari_claude/src/app/globals.css)
Inject Playfair Display serif font, elegant gold/blue theme variables, and custom Indonesian traditional batik pattern helpers (SVG masks or CSS gradients).

#### [NEW] [AudioPlayer.tsx](file:///c:/laragon/www/ritinari_claude/src/components/AudioPlayer.tsx)
Background music player component with subtle traditional Indonesian gamelan/gending music. Autoplay disabled, has floating audio controls toggle.

#### [NEW] [WhatsAppButton.tsx](file:///c:/laragon/www/ritinari_claude/src/components/WhatsAppButton.tsx)
Floating WhatsApp icon at the bottom right with beautiful pulsate animations.

#### [NEW] [LanguageToggle.tsx](file:///c:/laragon/www/ritinari_claude/src/components/LanguageToggle.tsx)
Locales toggle component (ID/EN) for Navbar.

#### [NEW] [Navbar.tsx](file:///c:/laragon/www/ritinari_claude/src/components/Navbar.tsx)
Responsive site navbar with traditional design elements (thin gold border, batik accent lines).

#### [NEW] [Footer.tsx](file:///c:/laragon/www/ritinari_claude/src/components/Footer.tsx)
Footer containing copyright, address, contact, and quick links.

---

### [App Router Layout & Pages]

Rearrange files to place page routes under `src/app/[locale]/`.

#### [NEW] [layout.tsx](file:///c:/laragon/www/ritinari_claude/src/app/%5Blocale%5D/layout.tsx)
Dynamic localization layout injecting messages provider, fonts, navbar, footer, background music, and WhatsApp button.

#### [NEW] [page.tsx](file:///c:/laragon/www/ritinari_claude/src/app/%5Blocale%5D/page.tsx)
Hero section with batik background overlay, tagline "Menari Dengan Hati", Layanan cards, meet team, Instagram/YouTube sections.

#### [NEW] [layanan/page.tsx](file:///c:/laragon/www/ritinari_claude/src/app/%5Blocale%5D/layanan/page.tsx)
Detailed view for the 3 core services: Kelas Tari, Penampilan Profesional, Sewa Busana.

#### [NEW] [portofolio/page.tsx](file:///c:/laragon/www/ritinari_claude/src/app/%5Blocale%5D/portofolio/page.tsx)
Grid layout pulling items from the `portofolio` table on Supabase.

#### [NEW] [gallery/page.tsx](file:///c:/laragon/www/ritinari_claude/src/app/%5Blocale%5D/gallery/page.tsx)
Masonry grid showing images from Supabase storage.

#### [NEW] [daftar/page.tsx](file:///c:/laragon/www/ritinari_claude/src/app/%5Blocale%5D/daftar/page.tsx)
Registration form submitting to `/api/form`.

#### [NEW] [kontak/page.tsx](file:///c:/laragon/www/ritinari_claude/src/app/%5Blocale%5D/kontak/page.tsx)
Contact details, social media links, WhatsApp direct link, Google Maps embed.

#### [NEW] [route.ts](file:///c:/laragon/www/ritinari_claude/src/app/api/form/route.ts)
Route Handler for `/api/form`. Accepts POST requests, saves data to `pendaftaran` table, and returns JSON success/error.

---

### [Admin Dashboard & Protected Routes]

#### [NEW] [admin/login/page.tsx](file:///c:/laragon/www/ritinari_claude/src/app/%5Blocale%5D/admin/login/page.tsx)
Admin login interface using Supabase Auth (email & password).

#### [NEW] [admin/layout.tsx](file:///c:/laragon/www/ritinari_claude/src/app/%5Blocale%5D/admin/layout.tsx)
Admin dashboard wrapper with sidebar, logout button, and header.

#### [NEW] [admin/page.tsx](file:///c:/laragon/www/ritinari_claude/src/app/%5Blocale%5D/admin/page.tsx)
Admin main dashboard displaying stats/counters (registrations, portfolio items, active content).

#### [NEW] [admin/konten/page.tsx](file:///c:/laragon/www/ritinari_claude/src/app/%5Blocale%5D/admin/konten/page.tsx)
CRUD control interface for `konten` table (Add/Edit/Delete articles, manage team profile, manage YouTube URL).

#### [NEW] [admin/pendaftar/page.tsx](file:///c:/laragon/www/ritinari_claude/src/app/%5Blocale%5D/admin/pendaftar/page.tsx)
Table view of `pendaftaran` list with quick search and a button to export data to CSV.

#### [NEW] [admin/media/page.tsx](file:///c:/laragon/www/ritinari_claude/src/app/%5Blocale%5D/admin/media/page.tsx)
Upload new pictures directly to Supabase storage `media` bucket, list images, and delete them.

---

## Verification Plan

### Automated Tests
- Run `npm run build` to verify there are no TypeScript or compilation errors.
- Run `npm run lint` to check for formatting or rules issues.

### Manual Verification
- Deploy locally and test the localization URLs (e.g. `/id`, `/en`).
- Submit a test registration form in `/daftar` and check if it inserts into `pendaftaran` table.
- Test Admin login with dummy credentials, access protected admin pages, and attempt unauthorized access to test redirection.
- Verify storage upload and deletion in the `/admin/media` page.
- Test language switching, background music play/pause, and mobile responsiveness.
