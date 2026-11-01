import { test, expect } from "@playwright/test";
test("project details, native focus trap and inquiry validation work", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("button", { name: "View The Monolith Residence", exact: true })
    .click();
  const project = page.getByRole("dialog", { name: "The Monolith Residence" });
  await expect(project).toBeVisible();
  await expect(project).toContainText("420 m²");
  await page.keyboard.press("Tab");
  expect(
    await page.evaluate(() => document.activeElement?.closest("dialog")?.open),
  ).toBe(true);
  await page.keyboard.press("Escape");
  await expect(project).not.toBeVisible();
  await page
    .getByRole("button", { name: "START A PROJECT", exact: true })
    .first()
    .click();
  const dialog = page.getByRole("dialog", {
    name: "Tell us about your place.",
  });
  await dialog.getByRole("button", { name: "Preview your inquiry" }).click();
  await expect(dialog.getByText("Your preview is complete.")).not.toBeVisible();
  await dialog.getByLabel("Your name").fill("Alex Test");
  await dialog.getByLabel("Email address").fill("alex@example.com");
  await dialog
    .getByLabel("What do you have in mind?")
    .fill("A quiet coastal house with thoughtful materials.");
  await dialog.getByRole("button", { name: "Preview your inquiry" }).click();
  await expect(dialog.getByRole("status")).toContainText(
    "Nothing was sent, reserved, or saved.",
  );
});
