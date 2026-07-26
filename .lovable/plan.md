# Portfolio OS — layered on top of current portfolio

The existing Prajwal landing page becomes **theme #1** in a dual-state, WordPress-style CMS. Content is decoupled from presentation; the admin can hot-swap themes, preview drafts in a sandbox, publish atomically, and roll back — without touching the public site.

## Guiding architecture

- **Content ≠ presentation.** All copy (bio, projects, services, stats, articles) lives in a normalized `content` store. Themes read from that store only.
- **Dual state.** `draftConfig` and `liveConfig` are separate rows. Public visitors always read `liveConfig`. Admin sandbox reads `draftConfig`.
- **Atomic publish.** Publishing snapshots the outgoing `liveConfig` into `theme_history`, then swaps in the draft in one transaction. Rollback re-applies a snapshot.
- **Lazy themes.** Each theme is a `React.lazy` module in a registry. Only the active theme's bundle ships to visitors.
- **Theme isolation.** Every theme mounts its own animation lifecycle and cleans up on unmount (Framer Motion is already in the stack; GSAP added only when a theme needs it).

## Phased build

### Phase 1 — Foundation (this milestone)
1. Enable Lovable Cloud (Supabase).
2. Schema + RLS:
   - `site_content` (jsonb: identity, bio, socials, services, projects, stats, contact) — public read.
   - `cms_config` (single row per state: `draft` | `live`, jsonb with `website_theme`, `blog_theme`, `feature_flags`) — public read for `live`, admin-only for `draft`.
   - `theme_history` (append-only snapshots) — admin-only.
   - `articles` (markdown + frontmatter, draft/published) — public read where `status='published'`.
   - `user_roles` + `has_role` (canonical admin gate).
3. Seed `site_content` and `live` config from the current Prajwal page.
4. Register the current landing page as theme `noir-aurora` (theme #1) — refactored to consume `site_content` instead of inline constants.
5. Public `/` route renders the live theme via a lazy registry; SSR-safe, keeps current metadata behavior.

### Phase 2 — Admin Terminal (`/hq-terminal-x9`)
- Auth-gated under `_authenticated/`, further gated by `has_role('admin')`.
- 5-panel layout: Theme Switcher · Sandbox Preview (iframe of `/?preview=draft`) · Content Editor · Publish Control (validator) · History Panel.
- Draft mutations write only to `cms_config[draft]`.
- Publish = server fn: validate → snapshot live → swap → invalidate.
- Rollback = server fn: pick snapshot → write to live.

### Phase 3 — Theme registry expansion
- Registry scaffolding + 1 additional website theme + 1 blog theme, both consuming the same content contract, to prove isolation.
- Article engine: markdown editor + `/blog` and `/blog/$slug` routes rendered by the active blog theme.

### Phase 4 (deferred, per your notes)
Multi-provider AI runtime, release engine (RSS/sitemap/OG), analytics, marketplace.

## Technical notes

- **Routing:** `/` (public, renders live website theme), `/blog`, `/blog/$slug` (public, live blog theme), `/hq-terminal-x9/*` mounted under `_authenticated/` with an admin `has_role` check inside each server fn.
- **State:** Zustand for admin-side draft editing; TanStack Query for server reads/writes. No Zustand on the public site.
- **Server fns:** `getLiveConfig`, `getDraftConfig` (admin), `updateDraft`, `publishDraft`, `rollbackTo(historyId)`, `listHistory`, `upsertContent`, `upsertArticle`. All privileged writes go through `requireSupabaseAuth` + `has_role('admin')` check.
- **Theme contract:** `type ThemeProps = { content: SiteContent }`. Registry: `{ id, name, load: () => import('./themes/<id>') }`.
- **Preview sandbox:** `/?preview=draft` reads `draftConfig` only when the viewer is an authenticated admin (server-checked); otherwise falls through to live. No public leak.
- **Existing page migration:** current `src/routes/index.tsx` body becomes `src/themes/website/noir-aurora/index.tsx`; the route file becomes a thin renderer that resolves the active theme.

## Scope of this plan

Phase 1 only in the next build turn. I'll stop after Phase 1 ships and we verify the site still looks identical, then move to Phase 2.

## Open confirmations

- Admin account: I'll use whichever user signs in first and grant them `admin` via a one-time server fn (or seeded via SQL if you give me your email). OK?
- Terminal path `hq-terminal-x9` — keep as-is or change?
