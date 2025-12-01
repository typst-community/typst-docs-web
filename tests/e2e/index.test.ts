import { readFileSync } from "node:fs";
import { expect, test } from "@playwright/test";
import type { Page } from "../../src/types/model";
import { flattenDocs } from "../../src/utils/flattenDocs";

const docsJson = readFileSync("./public/docs.json", "utf-8");
const docs = JSON.parse(docsJson) as unknown as Page[];
const [flattenedPages, _] = flattenDocs(docs);

flattenedPages.forEach((page, _) => {
	const route = page.route;
	test(`page ${route} should match screenshot`, async ({ page }) => {
		await page.addInitScript(() => {
			localStorage.setItem("typst-docs-web-docs-banner-hidden", "true");
		});
		await page.setViewportSize({ width: 1280, height: 720 });
		await page.goto(route);
		await expect(page).toHaveScreenshot({ fullPage: true });
	});
});
