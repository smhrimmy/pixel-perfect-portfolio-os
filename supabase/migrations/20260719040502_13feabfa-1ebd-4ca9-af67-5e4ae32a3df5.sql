
-- Roles
CREATE TYPE public.app_role AS ENUM ('admin','editor','user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role);
$$;

-- Shared updated_at trigger
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- site_content (singleton keyed by id='global')
CREATE TABLE public.site_content (
  id text PRIMARY KEY,
  content jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_content TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.site_content TO authenticated;
GRANT ALL ON public.site_content TO service_role;
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read site_content" ON public.site_content FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admin write site_content" ON public.site_content FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER site_content_updated BEFORE UPDATE ON public.site_content FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- cms_config: two rows -> state='live' | 'draft'
CREATE TABLE public.cms_config (
  state text PRIMARY KEY CHECK (state IN ('live','draft')),
  website_theme text NOT NULL DEFAULT 'noir-aurora',
  blog_theme text NOT NULL DEFAULT 'editorial-longform',
  feature_flags jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.cms_config TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.cms_config TO authenticated;
GRANT ALL ON public.cms_config TO service_role;
ALTER TABLE public.cms_config ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read live config" ON public.cms_config FOR SELECT TO anon, authenticated USING (state = 'live');
CREATE POLICY "Admin read draft config" ON public.cms_config FOR SELECT TO authenticated
  USING (state = 'draft' AND public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admin write cms_config" ON public.cms_config FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER cms_config_updated BEFORE UPDATE ON public.cms_config FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- theme_history
CREATE TABLE public.theme_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  snapshot jsonb NOT NULL,
  note text,
  created_at timestamptz NOT NULL DEFAULT now(),
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL
);
GRANT SELECT, INSERT ON public.theme_history TO authenticated;
GRANT ALL ON public.theme_history TO service_role;
ALTER TABLE public.theme_history ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admin read history" ON public.theme_history FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admin write history" ON public.theme_history FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(),'admin'));

-- articles
CREATE TABLE public.articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  excerpt text,
  markdown text NOT NULL DEFAULT '',
  cover_image_url text,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published')),
  published_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  author_id uuid REFERENCES auth.users(id) ON DELETE SET NULL
);
GRANT SELECT ON public.articles TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.articles TO authenticated;
GRANT ALL ON public.articles TO service_role;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read published articles" ON public.articles FOR SELECT TO anon, authenticated USING (status = 'published');
CREATE POLICY "Admin read all articles" ON public.articles FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admin write articles" ON public.articles FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER articles_updated BEFORE UPDATE ON public.articles FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Seed content + config
INSERT INTO public.site_content (id, content) VALUES ('global', $json${
  "identity": {
    "name": "Prajwal DL",
    "brandDot": ".",
    "role": "AI Automation & Web Developer"
  },
  "hero": {
    "badge": "Currently accepting new projects",
    "headingLead": "I build AI automation and",
    "headingAccent": "premium websites",
    "headingTail": "for ambitious brands.",
    "sub": "Freelance developer & designer helping healthcare, e-commerce, and service businesses ship high-converting systems that print — not just look good.",
    "industries": ["Healthcare", "E-commerce", "Services"]
  },
  "services": [
    { "icon": "Bot", "title": "AI Automation", "body": "Custom agents, workflows, and internal tools that replace hours of manual work every week.", "featured": true },
    { "icon": "Code2", "title": "Web Development", "body": "Fast, accessible sites built with modern React and edge infrastructure." },
    { "icon": "LayoutTemplate", "title": "Conversion Design", "body": "Landing pages engineered for signup, booking, and revenue." },
    { "icon": "Plug", "title": "Integrations", "body": "Stripe, Supabase, CRMs, and every API in between — cleanly wired." },
    { "icon": "Repeat", "title": "Retainers", "body": "Ongoing product partnership: ship weekly, measure monthly." }
  ],
  "stats": [
    { "value": "40+", "label": "Projects shipped" },
    { "value": "$2.4M", "label": "Revenue influenced" },
    { "value": "18", "label": "Happy clients" },
    { "value": "5yr", "label": "Building on the web" }
  ],
  "projects": [
    { "title": "Nova Clinics", "tag": "Healthcare · Booking", "outcome": "+38% booking conversion in 6 weeks", "hue": "from-amber-500/30 to-transparent" },
    { "title": "Alto Commerce", "tag": "E-commerce · Shopify", "outcome": "$310k additional revenue in Q1", "hue": "from-yellow-500/30 to-transparent" },
    { "title": "Relay Ops", "tag": "Services · Automation", "outcome": "42 hrs/week returned to the team", "hue": "from-orange-500/25 to-transparent" },
    { "title": "Aster AI", "tag": "SaaS · Agents", "outcome": "MVP shipped in 3 weeks, seed closed", "hue": "from-amber-400/25 to-transparent" }
  ],
  "why": [
    { "title": "Ship weekly, not quarterly.", "body": "Tight scope, transparent progress, working software in your hands every week." },
    { "title": "Design that converts.", "body": "Every pixel earns its place — visual craft in service of the metric that matters." },
    { "title": "Systems, not one-offs.", "body": "Automation and architecture that keep paying you back long after launch." }
  ],
  "contact": {
    "badge": "One project slot open for next month",
    "headingLead": "Let's build something that",
    "headingAccent": "prints",
    "sub": "Tell me about your product, your goal, and your timeline. I'll come back within 24 hours with a plan."
  },
  "links": {
    "book": "#contact",
    "email": "mailto:hello@example.com",
    "twitter": "#",
    "linkedin": "#",
    "github": "#"
  },
  "seo": {
    "title": "Prajwal DL — AI Automation & Web Developer",
    "description": "Prajwal DL builds AI automation systems and premium, high-converting websites for ambitious brands in healthcare, e-commerce, and services."
  }
}$json$::jsonb);

INSERT INTO public.cms_config (state, website_theme, blog_theme) VALUES
  ('live','noir-aurora','editorial-longform'),
  ('draft','noir-aurora','editorial-longform');
