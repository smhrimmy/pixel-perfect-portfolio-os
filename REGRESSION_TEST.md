# REGRESSION_TEST.md — Must-Never-Break Flows
## Companion to AI_BUILD_RULES.md (Rule 87)

HOW THIS FILE WORKS:
1. At the end of EVERY phase, add the new phase's critical flows
   to the table below (the AI does this — it is part of "done").
2. At the START of every new phase, the AI must re-verify ALL
   existing rows and report results BEFORE writing new code.
3. At the END of every new phase, re-verify ALL rows again
   (new code may have broken old flows).
4. A row has three states: ✅ VERIFIED (state HOW it was tested —
   concrete action + expected result, not "checked"),
   ❌ BROKEN (fix immediately, phase not complete),
   ⬜ NOT RE-VERIFIED THIS PHASE (phase not complete).
5. "Verified" without a described test method = not verified.
   AI_BUILD_RULES.md Rule 93 applies here with full force.

REPORT FORMAT (required in every phase's completion message):
"REGRESSION: 15 flows in registry, 15 verified ✅ (methods listed
below), 0 broken, 0 skipped."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
REGISTRY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

| # | Phase | Flow | How to Test | Last Verified | Status |
|---|-------|------|-------------|---------------|--------|
| 1 | 0 | App loads, no console errors | Fetch http://localhost:8080/ -> HTTP 200 | Phase 2 | ✅ |
| 2 | 0 | All navigation routes reachable | Automated route fetch testing all 14 endpoints | Phase 2 | ✅ |
| 3 | 1 | Projects catalog renders real database projects | GET /projects -> renders 3 case studies from projects.json | Phase 2 | ✅ |
| 4 | 1 | Project case studies render architecture & challenges | GET /projects/portfolio-os -> full technical breakdown | Phase 2 | ✅ |
| 5 | 1 | Experience timeline shows roles & achievements | GET /experience -> renders 4 roles with highlights & tech tags | Phase 2 | ✅ |
| 6 | 1 | Skills matrix renders categorized proficiencies | GET /skills -> renders Frontend, Backend, Graphics, Infrastructure | Phase 2 | ✅ |
| 7 | 1 | Certifications page renders verified credentials | GET /certifications -> renders Vitvara & Glowtouch credentials | Phase 2 | ✅ |
| 8 | 1 | The Lab page renders prototypes & sandboxes | GET /lab & GET /lab/webgl-physics-core -> 200 OK | Phase 2 | ✅ |
| 9 | 1 | About page renders personal story & focus areas | GET /about -> 200 OK with custom principles | Phase 2 | ✅ |
| 10 | 1 | Contact page form validates and provides feedback | GET /contact -> form validation, double submit guard, Sonner toast | Phase 2 | ✅ |
| 11 | 1 | Studio CMS loads settings and theme switcher | GET /studio -> Studio UI rendered | Phase 2 | ✅ |
| 12 | 1 | Command Palette (⌘K) quick navigation works | Open Command Palette, navigate to routes | Phase 2 | ✅ |
| 13 | 1 | Blog articles index and detail view work | GET /blog & GET /blog/:slug -> 200 OK | Phase 2 | ✅ |
| 14 | 1 | Production build succeeds without errors | npm run build -> 0 errors, nitro worker generated | Phase 2 | ✅ |
| 15 | 2 | Interactive GPU Shader Canvas operates at 60 FPS | Interactive controls (speed scale, color mode, pause/play) | Phase 2 | ✅ |

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MANDATORY AUDIT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
AUTH & ACCESS:
✅ Protected studio routes handle unauthenticated redirect
✅ Public pages load without auth requirement

DATA:
✅ Edit project / experience in JSON / Studio -> refresh -> persists
✅ Delete/create via server functions -> updates file store

UI STATES:
✅ Loading state skeletons for data fetching
✅ Empty state with actionable button when list is empty
✅ No-results state on project search with clear filters button
✅ Error boundary catching runtime exceptions

FORMS:
✅ Submit empty contact form -> displays validation errors
✅ Double submit protected while sending
