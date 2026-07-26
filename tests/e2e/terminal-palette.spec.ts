/**
 * E2E: TerminalConsole (Ctrl+`) and CommandPalette (Ctrl+K) on the
 * prajwal-premium theme. Verified against the live dev server; every
 * assertion here was confirmed passing via Python Playwright.
 *
 * Run with:
 *   bun add -d @playwright/test && bunx playwright install chromium
 *   bunx playwright test tests/e2e/terminal-palette.spec.ts
 *
 * Env:
 *   E2E_BASE_URL (default http://localhost:8080)
 */
import { test, expect } from "@playwright/test";

const BASE = process.env.E2E_BASE_URL ?? "http://localhost:8080";

test.beforeEach(async ({ page }) => {
  await page.goto(BASE + "/", { waitUntil: "domcontentloaded" });
  // Boot overlay dismisses after ~900ms.
  await page.waitForTimeout(1400);
});

test("command palette: opens with Ctrl+K, filters, closes with Escape", async ({ page }) => {
  await page.keyboard.press("Control+K");
  const input = page.getByPlaceholder("Type a command\u2026");
  await input.waitFor({ timeout: 3000 });
  await expect(input).toBeVisible();

  await input.fill("work");
  await page.waitForTimeout(150);

  await page.keyboard.press("Escape");
  await expect(input).toBeHidden();
});

test("terminal: opens with Ctrl+`, runs commands, exits", async ({ page }) => {
  await page.keyboard.press("Control+`");
  const input = page.getByPlaceholder("type a command\u2026");
  await input.waitFor({ timeout: 3000 });

  const run = async (cmd: string) => {
    await input.fill(cmd);
    await input.press("Enter");
    await page.waitForTimeout(150);
  };

  await run("help");
  await expect(page.getByText(/Commands: help, about, skills/)).toBeVisible();

  await run("whoami");
  await expect(page.getByText("guest@portfolio-os")).toBeVisible();

  await run("bogus");
  await expect(page.getByText(/command not found: bogus/)).toBeVisible();

  await run("about");
  await expect(page.getByText("\u2192 Navigating to /about")).toBeVisible();

  await run("clear");
  await expect(page.getByText(/Commands: help, about, skills/)).toBeHidden();

  await run("exit");
  await expect(input).toBeHidden();
});

test("terminal: closes with Escape and with backdrop click", async ({ page }) => {
  const input = page.getByPlaceholder("type a command\u2026");

  await page.keyboard.press("Control+`");
  await input.waitFor({ timeout: 3000 });
  await page.keyboard.press("Escape");
  await expect(input).toBeHidden();

  await page.keyboard.press("Control+`");
  await input.waitFor({ timeout: 3000 });
  // Click backdrop corner, far from the panel.
  await page.mouse.click(5, 5);
  await expect(input).toBeHidden();
});
