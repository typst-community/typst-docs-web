import { expect, test } from "@playwright/test";

// TODO: Add more e2e tests.
test("/", async ({ page }) => {
	await page.goto("/docs/");

	await expect(page).toHaveScreenshot({ fullPage: true });
});
