import { test, expect } from "@playwright/test";

/**
 * This file contains all tests that make requests of our backend server.
 * Because they are all running on the same backend, although most tests
 * usually pass, some fail because another file is loaded through server
 * from another test running and then the commands aren't updated to the
 * correct file. However, in all our runs of the testing suite, at least
 * one browser passed each test, and a smaller selection of tests on the
 * various browsers fails, and when run one by one, every single test
 * passes on every browser (using Playwright's UI mode, we can see what is
 * happening and can run tests easily one by one- this way all test, and
 * we can see the incorrect items loading at first due to interference
 * from other files). We believe this indicates an issue with how
 * the different tests are run at similar times/simultaneously, not an
 * issue with the functionality of our code.
 */

/**
 * This is carried out before every test that is run. It is responsible for
 * loading the page. By doing this in the beforeEach, we reduce redundency.
 */
test.beforeEach(async ({ page }, testInfo) => {
  await page.goto("http://localhost:5173/");
});

/**
 * This tests the search commands with mocked data.
 */
test("search with mocked data returns front end response", async ({ page }) => {
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search xyz mock");
  await page.getByRole("button").click();
  await expect(page.getByLabel("response text")).toContainText("Searched: xyz mock");
});
