-- Migration: Universal Store Tables

-- profiles (singleton)
CREATE TABLE public.profiles (
  id text PRIMARY KEY DEFAULT 'global',
  name text NOT NULL DEFAULT '',
  headline text NOT NULL DEFAULT '',
  bio text NOT NULL DEFAULT '',
  avatar_url text,
  location text,
  email text,
  phone text,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.profiles TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read profiles" ON public.profiles FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admin write profiles" ON public.profiles FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER profiles_updated BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- projects
CREATE TABLE public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text NOT NULL DEFAULT '',
  thumbnail_url text,
  images jsonb NOT NULL DEFAULT '[]'::jsonb,
  technologies jsonb NOT NULL DEFAULT '[]'::jsonb,
  github_url text,
  live_demo_url text,
  featured boolean NOT NULL DEFAULT false,
  status text NOT NULL DEFAULT 'published',
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.projects TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.projects TO authenticated;
GRANT ALL ON public.projects TO service_role;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read projects" ON public.projects FOR SELECT TO anon, authenticated USING (status = 'published');
CREATE POLICY "Admin read all projects" ON public.projects FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admin write projects" ON public.projects FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER projects_updated BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- skills
CREATE TABLE public.skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL DEFAULT 'General',
  level integer NOT NULL DEFAULT 0,
  icon text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.skills TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.skills TO authenticated;
GRANT ALL ON public.skills TO service_role;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read skills" ON public.skills FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admin write skills" ON public.skills FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER skills_updated BEFORE UPDATE ON public.skills FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- experience
CREATE TABLE public.experience (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company text NOT NULL,
  position text NOT NULL,
  start_date text NOT NULL,
  end_date text,
  description text NOT NULL DEFAULT '',
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.experience TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.experience TO authenticated;
GRANT ALL ON public.experience TO service_role;
ALTER TABLE public.experience ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read experience" ON public.experience FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admin write experience" ON public.experience FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER experience_updated BEFORE UPDATE ON public.experience FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- education
CREATE TABLE public.education (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school text NOT NULL,
  degree text NOT NULL,
  year text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.education TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.education TO authenticated;
GRANT ALL ON public.education TO service_role;
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read education" ON public.education FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admin write education" ON public.education FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER education_updated BEFORE UPDATE ON public.education FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- certificates
CREATE TABLE public.certificates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  issuer text NOT NULL,
  issue_date text NOT NULL,
  credential_url text,
  image_url text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.certificates TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.certificates TO authenticated;
GRANT ALL ON public.certificates TO service_role;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read certificates" ON public.certificates FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admin write certificates" ON public.certificates FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER certificates_updated BEFORE UPDATE ON public.certificates FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- media
CREATE TABLE public.media (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  type text NOT NULL,
  url text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.media TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.media TO authenticated;
GRANT ALL ON public.media TO service_role;
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read media" ON public.media FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admin write media" ON public.media FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER media_updated BEFORE UPDATE ON public.media FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- testimonials
CREATE TABLE public.testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author_name text NOT NULL,
  author_title text NOT NULL DEFAULT '',
  content text NOT NULL,
  avatar_url text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.testimonials TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.testimonials TO authenticated;
GRANT ALL ON public.testimonials TO service_role;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read testimonials" ON public.testimonials FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admin write testimonials" ON public.testimonials FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER testimonials_updated BEFORE UPDATE ON public.testimonials FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- services
CREATE TABLE public.services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  icon text,
  featured boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.services TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.services TO authenticated;
GRANT ALL ON public.services TO service_role;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read services" ON public.services FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admin write services" ON public.services FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER services_updated BEFORE UPDATE ON public.services FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- social_links (singleton)
CREATE TABLE public.social_links (
  id text PRIMARY KEY DEFAULT 'global',
  github text,
  linkedin text,
  twitter text,
  youtube text,
  instagram text,
  website text,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.social_links TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.social_links TO authenticated;
GRANT ALL ON public.social_links TO service_role;
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read social_links" ON public.social_links FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admin write social_links" ON public.social_links FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER social_links_updated BEFORE UPDATE ON public.social_links FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- seo (singleton)
CREATE TABLE public.seo (
  id text PRIMARY KEY DEFAULT 'global',
  title text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  keywords jsonb NOT NULL DEFAULT '[]'::jsonb,
  og_image_url text,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.seo TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.seo TO authenticated;
GRANT ALL ON public.seo TO service_role;
ALTER TABLE public.seo ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read seo" ON public.seo FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admin write seo" ON public.seo FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER seo_updated BEFORE UPDATE ON public.seo FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- settings (singleton)
CREATE TABLE public.settings (
  id text PRIMARY KEY DEFAULT 'global',
  theme text NOT NULL DEFAULT 'noir-aurora',
  language text NOT NULL DEFAULT 'en',
  animations boolean NOT NULL DEFAULT true,
  dark_mode boolean NOT NULL DEFAULT true,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.settings TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.settings TO authenticated;
GRANT ALL ON public.settings TO service_role;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read settings" ON public.settings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admin write settings" ON public.settings FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER settings_updated BEFORE UPDATE ON public.settings FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- theme_preferences (multi-theme configs)
CREATE TABLE public.theme_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  theme_id text NOT NULL UNIQUE,
  primary_color text,
  secondary_color text,
  font text,
  border_radius text,
  animation_speed text,
  layout text,
  sidebar_position text,
  card_style text,
  glass_effect boolean NOT NULL DEFAULT false,
  terminal_color text,
  wallpaper text,
  accent text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.theme_preferences TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.theme_preferences TO authenticated;
GRANT ALL ON public.theme_preferences TO service_role;
ALTER TABLE public.theme_preferences ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read theme_preferences" ON public.theme_preferences FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admin write theme_preferences" ON public.theme_preferences FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER theme_preferences_updated BEFORE UPDATE ON public.theme_preferences FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- navigation
CREATE TABLE public.navigation (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  label text NOT NULL,
  path text NOT NULL,
  icon text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.navigation TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.navigation TO authenticated;
GRANT ALL ON public.navigation TO service_role;
ALTER TABLE public.navigation ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read navigation" ON public.navigation FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admin write navigation" ON public.navigation FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER navigation_updated BEFORE UPDATE ON public.navigation FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
