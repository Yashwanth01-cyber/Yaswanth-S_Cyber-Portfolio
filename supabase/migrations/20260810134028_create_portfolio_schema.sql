/*
# Create portfolio database schema

## Purpose
Stores all dynamic content for Yaswanth S's cybersecurity portfolio —
projects, internships, certifications, PortSwigger labs, research papers,
learning timeline, blog posts, and contact messages — so the website reads
from the database instead of static JS data files.

## New Tables (all single-tenant, no auth, public read / public write)

1. `projects` — portfolio projects
   - id (uuid PK)
   - slug (text, unique) — URL-friendly identifier
   - name (text, not null)
   - tagline (text)
   - overview (text)
   - technologies (text[]) — array of tech names
   - features (text[])
   - architecture (text)
   - github_url (text)
   - live_demo_url (text)
   - status (text) — e.g. "Active Development", "Completed"
   - screenshots (text[]) — image URLs
   - sort_order (int, default 0)
   - created_at, updated_at (timestamps)

2. `experiences` — internships / work experience
   - id (uuid PK)
   - company (text)
   - role (text)
   - duration (text)
   - period (text)
   - description (text)
   - highlights (text[])
   - sort_order (int, default 0)
   - created_at, updated_at

3. `certifications` — professional certifications
   - id (uuid PK)
   - name (text)
   - issuer (text)
   - date (text)
   - credential_id (text)
   - url (text)
   - status (text) — "Completed" or "In Progress"
   - sort_order (int, default 0)
   - created_at, updated_at

4. `labs` — PortSwigger Web Security Academy lab records
   - id (uuid PK)
   - title (text)
   - module (text)
   - status (text) — "Completed", "In Progress", "Not Started"
   - completed_at (date)
   - created_at, updated_at

5. `research_papers` — security research papers
   - id (uuid PK)
   - slug (text, unique)
   - title (text)
   - abstract (text)
   - status (text) — "Writing", "Published"
   - progress (int, default 0) — 0-100
   - date (text)
   - authors (text[])
   - tags (text[])
   - created_at, updated_at

6. `timeline_events` — learning journey milestones
   - id (uuid PK)
   - event (text)
   - date (text) — YYYY-MM format
   - icon (text) — Lucide icon name
   - sort_order (int, default 0)
   - created_at, updated_at

7. `blog_posts` — blog articles (content stored as markdown)
   - id (uuid PK)
   - slug (text, unique)
   - title (text)
   - excerpt (text)
   - content (text) — markdown body
   - date (date)
   - read_time (text)
   - tags (text[])
   - published (boolean, default true)
   - created_at, updated_at

8. `contact_messages` — messages submitted through the contact form
   - id (uuid PK)
   - name (text)
   - email (text)
   - message (text)
   - read (boolean, default false)
   - created_at

## Security
- RLS enabled on every table.
- All tables use `TO anon, authenticated` with `USING (true)` / `WITH CHECK (true)`
  because this is a single-tenant public portfolio with no sign-in screen.
  The anon-key frontend must be able to read all content and insert contact messages.
- `contact_messages` allows public INSERT but restricts SELECT/UPDATE/DELETE to
  authenticated only, so visitors can submit messages but cannot read or delete
  other people's messages through the anon key.

## Important Notes
1. All content tables are read-write for anon so the portfolio can display data
   without requiring authentication.
2. `contact_messages` is the exception: anyone can submit, but only an
   authenticated admin can read or manage messages.
3. `sort_order` columns let the owner control display ordering from the database.
4. `updated_at` auto-updates via trigger on every row change.
*/

-- =========================================================
-- Helper: updated_at trigger function
-- =========================================================
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =========================================================
-- 1. projects
-- =========================================================
CREATE TABLE IF NOT EXISTS public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  tagline text,
  overview text,
  technologies text[] DEFAULT '{}',
  features text[] DEFAULT '{}',
  architecture text,
  github_url text,
  live_demo_url text,
  status text DEFAULT 'Active Development',
  screenshots text[] DEFAULT '{}',
  sort_order int DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_projects" ON public.projects;
CREATE POLICY "anon_select_projects" ON public.projects FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_projects" ON public.projects;
CREATE POLICY "anon_insert_projects" ON public.projects FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_projects" ON public.projects;
CREATE POLICY "anon_update_projects" ON public.projects FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_projects" ON public.projects;
CREATE POLICY "anon_delete_projects" ON public.projects FOR DELETE
  TO anon, authenticated USING (true);

CREATE TRIGGER projects_updated_at BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- =========================================================
-- 2. experiences
-- =========================================================
CREATE TABLE IF NOT EXISTS public.experiences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company text NOT NULL,
  role text NOT NULL,
  duration text,
  period text,
  description text,
  highlights text[] DEFAULT '{}',
  sort_order int DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_experiences" ON public.experiences;
CREATE POLICY "anon_select_experiences" ON public.experiences FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_experiences" ON public.experiences;
CREATE POLICY "anon_insert_experiences" ON public.experiences FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_experiences" ON public.experiences;
CREATE POLICY "anon_update_experiences" ON public.experiences FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_experiences" ON public.experiences;
CREATE POLICY "anon_delete_experiences" ON public.experiences FOR DELETE
  TO anon, authenticated USING (true);

CREATE TRIGGER experiences_updated_at BEFORE UPDATE ON public.experiences
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- =========================================================
-- 3. certifications
-- =========================================================
CREATE TABLE IF NOT EXISTS public.certifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  issuer text NOT NULL,
  date text,
  credential_id text,
  url text,
  status text DEFAULT 'Completed',
  sort_order int DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_certifications" ON public.certifications;
CREATE POLICY "anon_select_certifications" ON public.certifications FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_certifications" ON public.certifications;
CREATE POLICY "anon_insert_certifications" ON public.certifications FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_certifications" ON public.certifications;
CREATE POLICY "anon_update_certifications" ON public.certifications FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_certifications" ON public.certifications;
CREATE POLICY "anon_delete_certifications" ON public.certifications FOR DELETE
  TO anon, authenticated USING (true);

CREATE TRIGGER certifications_updated_at BEFORE UPDATE ON public.certifications
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- =========================================================
-- 4. labs
-- =========================================================
CREATE TABLE IF NOT EXISTS public.labs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  module text NOT NULL,
  status text DEFAULT 'Not Started',
  completed_at date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.labs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_labs" ON public.labs;
CREATE POLICY "anon_select_labs" ON public.labs FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_labs" ON public.labs;
CREATE POLICY "anon_insert_labs" ON public.labs FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_labs" ON public.labs;
CREATE POLICY "anon_update_labs" ON public.labs FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_labs" ON public.labs;
CREATE POLICY "anon_delete_labs" ON public.labs FOR DELETE
  TO anon, authenticated USING (true);

CREATE TRIGGER labs_updated_at BEFORE UPDATE ON public.labs
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- =========================================================
-- 5. research_papers
-- =========================================================
CREATE TABLE IF NOT EXISTS public.research_papers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  abstract text,
  status text DEFAULT 'Writing',
  progress int DEFAULT 0,
  date text,
  authors text[] DEFAULT '{}',
  tags text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.research_papers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_research_papers" ON public.research_papers;
CREATE POLICY "anon_select_research_papers" ON public.research_papers FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_research_papers" ON public.research_papers;
CREATE POLICY "anon_insert_research_papers" ON public.research_papers FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_research_papers" ON public.research_papers;
CREATE POLICY "anon_update_research_papers" ON public.research_papers FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_research_papers" ON public.research_papers;
CREATE POLICY "anon_delete_research_papers" ON public.research_papers FOR DELETE
  TO anon, authenticated USING (true);

CREATE TRIGGER research_papers_updated_at BEFORE UPDATE ON public.research_papers
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- =========================================================
-- 6. timeline_events
-- =========================================================
CREATE TABLE IF NOT EXISTS public.timeline_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event text NOT NULL,
  date text NOT NULL,
  icon text DEFAULT 'Rocket',
  sort_order int DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.timeline_events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_timeline_events" ON public.timeline_events;
CREATE POLICY "anon_select_timeline_events" ON public.timeline_events FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_timeline_events" ON public.timeline_events;
CREATE POLICY "anon_insert_timeline_events" ON public.timeline_events FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_timeline_events" ON public.timeline_events;
CREATE POLICY "anon_update_timeline_events" ON public.timeline_events FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_timeline_events" ON public.timeline_events;
CREATE POLICY "anon_delete_timeline_events" ON public.timeline_events FOR DELETE
  TO anon, authenticated USING (true);

CREATE TRIGGER timeline_events_updated_at BEFORE UPDATE ON public.timeline_events
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- =========================================================
-- 7. blog_posts
-- =========================================================
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  excerpt text,
  content text,
  date date NOT NULL,
  read_time text,
  tags text[] DEFAULT '{}',
  published boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_blog_posts" ON public.blog_posts;
CREATE POLICY "anon_select_blog_posts" ON public.blog_posts FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_blog_posts" ON public.blog_posts;
CREATE POLICY "anon_insert_blog_posts" ON public.blog_posts FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_blog_posts" ON public.blog_posts;
CREATE POLICY "anon_update_blog_posts" ON public.blog_posts FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_blog_posts" ON public.blog_posts;
CREATE POLICY "anon_delete_blog_posts" ON public.blog_posts FOR DELETE
  TO anon, authenticated USING (true);

CREATE TRIGGER blog_posts_updated_at BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- =========================================================
-- 8. contact_messages
-- =========================================================
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Anyone can submit a message, but only authenticated users can read/manage them
DROP POLICY IF EXISTS "anon_insert_contact_messages" ON public.contact_messages;
CREATE POLICY "anon_insert_contact_messages" ON public.contact_messages FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_select_contact_messages" ON public.contact_messages;
CREATE POLICY "auth_select_contact_messages" ON public.contact_messages FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "auth_update_contact_messages" ON public.contact_messages;
CREATE POLICY "auth_update_contact_messages" ON public.contact_messages FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_contact_messages" ON public.contact_messages;
CREATE POLICY "auth_delete_contact_messages" ON public.contact_messages FOR DELETE
  TO authenticated USING (true);
