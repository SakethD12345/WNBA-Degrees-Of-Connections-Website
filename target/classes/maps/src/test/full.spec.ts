import { test, expect } from "@playwright/test";

/**
 * This is carried out before every test that is run. It is responsible for
 * loading the page. By doing this in the beforeEach, we reduce redundency.
 */
test.beforeEach(async ({ page }, testInfo) => {
  await page.goto("http://localhost:5173/");
});

/**
 * This tests that the command input bar is visible on the page.
 */
test("input bar appears", async ({ page }) => {
  await expect(page.getByLabel("Command input")).toBeVisible();
});

/**
 * This tests that the submit is visible on the page.
 */
test("submit button appears", async ({ page }) => {
  await expect(page.getByRole("button")).toBeVisible();
});

// test("clicking returns correct state and name", async ({ page }) => {
//   await page.getByLabel("Map interface").click({ position: {x: 500, y: 500}});
//   await expect(page.getByLabel("response text").nth(0)).toContainText("state");
// })

/**
 * This tests simple broadband functionality.
 */
test("simple broadband request returns output", async ({ page }) => {
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("broadband Washtenaw Michigan");
  await page.getByRole("button").click();

  await expect(page.getByLabel("response text")).toContainText("internet");
});

/**
 * This tests simple search functionality.
 */
test("simple search request returns output", async ({ page }) => {
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search xy");
  await page.getByRole("button").click();

  await expect(page.getByLabel("response text")).toContainText("Searched");
});

/**
 * This tests error messages when an invalid state or county is requested for the
 * broadband command.
 */
test("error broadband request returns output", async ({ page }) => {
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("broadband Ontario Canada");
  await page.getByRole("button").click();

  await expect(page.getByLabel("response text")).toContainText("Invalid state.");

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("broadband Kings Michigan");
  await page.getByRole("button").click();

  await expect(page.getByLabel("response text")).toContainText(
    "Invalid county."
  );
});

/**
 * This tests the interactions between broadband and search commands.
 */
test("broadband and search commands work consecutively", async ({ page }) => {
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("broadband Kings California");
  await page.getByRole("button").click();

  await expect(page.getByLabel("response text")).toContainText("83.5");

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search music");
  await page.getByRole("button").click();

  await expect(page.getByLabel("response text")).toContainText(
    "music"
  );
});


