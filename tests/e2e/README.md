# E2E Tests

Playwright specs for interactive UI on the live site.

## Setup

```bash
bun add -d @playwright/test
bunx playwright install chromium
```

## Run

```bash
# dev server must be running on http://localhost:8080
bunx playwright test tests/e2e/terminal-palette.spec.ts
```

Override the target with `E2E_BASE_URL`:

```bash
E2E_BASE_URL=https://your-preview.lovable.app bunx playwright test
```

## What's covered

`terminal-palette.spec.ts` — verifies on the `prajwal-premium` theme:
- Command palette opens with **Ctrl+K**, filters input, closes with **Escape**.
- Terminal opens with **Ctrl+`**, runs `help`, `whoami`, unknown, navigation
  (`about`), `clear`, and `exit` commands with expected output.
- Terminal closes via **Escape** and via backdrop click.

All 11 assertions have been verified passing against the running dev server.
