import { test, expect } from "@playwright/test";

/**
 * This is carried out before every test that is run. It is responsible for
 * loading the page. By doing this in the beforeEach, we reduce redundency.
 */
test.beforeEach(async ({ page }, testInfo) => {
  await page.goto("http://localhost:5173/");
});


test("history appears", async ({ page }) => {
  await expect(page.getByLabel("History")).toBeVisible();
});

test("correct simple connection", async ({page}) => {
    await page.getByLabel("Player 1 input").click();
    await page.getByLabel("Player 1 input").fill("Sue Bird");
    await page.getByLabel("Player 2 input").click();
    await page.getByLabel("Player 2 input").fill("Candace Parker");
    await page.click("[id='submit-button']");
    await expect(page.getByLabel("History")).toContainText("The number of connections between Sue Bird and Candace Parker is 2");
})