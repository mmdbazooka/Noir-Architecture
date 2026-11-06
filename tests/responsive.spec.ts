import { test, expect } from "@playwright/test";
import fs from "node:fs";
import type { AxeResults } from "axe-core";

test("responsive pages load local assets without overflow or browser errors", async ({
  page,
}, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  const failed: string[] = [];
  page.on("response", (response) => {
    if (response.status() >= 400)
      failed.push(`${response.status()} ${response.url()}`);
  });
  for (const [width, height] of [
    [1920, 1080],
    [1440, 900],
    [1024, 768],
    [768, 1024],
    [390, 844],
    [360, 800],
  ]) {
    await page.setViewportSize({ width, height });
    await page.goto("/", { waitUntil: "networkidle" });
    await expect(page.locator("h1")).toBeVisible();
    await page.evaluate(async () => {
      const step = window.innerHeight;
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 70));
      }
      await Promise.all(
        Array.from(document.images).map((img) => img.decode().catch(() => {})),
      );
      window.scrollTo(0, 0);
    });
    await expect
      .poll(() => page.evaluate(() => document.documentElement.scrollWidth))
      .toBeLessThanOrEqual(width);
    expect(
      await page.evaluate(() =>
        Array.from(document.images)
          .filter((i) => !i.complete || i.naturalWidth === 0)
          .map((i) => i.src),
      ),
    ).toEqual([]);
    expect(
      await page
        .locator('a[href^="#"]')
        .evaluateAll((links) =>
          links
            .map((l) => l.getAttribute("href")!)
            .filter(
              (h) =>
                h.length > 1 &&
                !document.getElementById(decodeURIComponent(h.slice(1))),
            ),
        ),
    ).toEqual([]);
    await page.screenshot({
      path: testInfo.outputPath(`${width}-hero.png`),
      animations: "disabled",
    });
    if (width === 1440 || width === 390)
      await page.screenshot({
        path: testInfo.outputPath(`${width}-full.png`),
        fullPage: true,
        animations: "disabled",
      });
  }
  expect(errors).toEqual([]);
  expect(failed).toEqual([]);
});

test("mobile navigation, keyboard dismissal and concept disclosure work", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const menu = page.getByRole("button", { name: "Open navigation" });
  await menu.click();
  await expect(page.getByRole("dialog", { name: "Navigation" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("dialog", { name: "Navigation" }),
  ).not.toBeVisible();
  await expect(menu).toBeFocused();
  await menu.click();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .locator("a")
    .first()
    .click();
  await expect(
    page.getByRole("dialog", { name: "Navigation" }),
  ).not.toBeVisible();
  await page.getByRole("link", { name: "About this concept" }).click();
  await expect(page).toHaveURL(/\/concept$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "design exploration",
  );
});

test("semantic accessibility and contrast meet WCAG AA", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await page.addScriptTag({
    content: fs.readFileSync(require.resolve("axe-core/axe.min.js"), "utf8"),
  });
  const results = await page.evaluate(async () => {
    const axe = (
      window as unknown as {
        axe: { run: (options: object) => Promise<AxeResults> };
      }
    ).axe;
    return axe.run({
      runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa"] },
    });
  });
  expect(
    results.violations.map((v) => ({
      id: v.id,
      impact: v.impact,
      description: v.description,
      nodes: v.nodes.map((n) => ({
        target: n.target,
        summary: n.failureSummary,
      })),
    })),
  ).toEqual([]);
});

test("normal motion initializes cleanly and content survives without JavaScript", async ({
  browser,
}) => {
  const animated = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "no-preference",
  });
  const page = await animated.newPage();
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto(test.info().project.use.baseURL + "/", {
    waitUntil: "networkidle",
  });
  await page.evaluate(() => window.scrollTo(0, 700));
  await expect(page.locator(".site-header")).toHaveClass(
    /(?:^|\s)header-scrolled(?:\s|$)/,
  );
  await page.evaluate(() => window.scrollTo(0, 0));
  await expect(page.locator(".site-header")).not.toHaveClass(
    /(?:^|\s)header-scrolled(?:\s|$)/,
  );
  await expect(page.locator("h1")).toBeVisible();
  expect(errors).toEqual([]);
  await animated.close();
  const noJs = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 1440, height: 900 },
  });
  const staticPage = await noJs.newPage();
  await staticPage.goto(test.info().project.use.baseURL + "/", {
    waitUntil: "networkidle",
  });
  await expect(staticPage.locator("h1")).toBeVisible();
  await expect(staticPage.locator("main")).not.toHaveText("");
  await noJs.close();
});
