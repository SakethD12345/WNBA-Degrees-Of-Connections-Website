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
  await expect(page.getByLabel("History")).toContainText("The number of connections " +
      "between Sue Bird and Candace Parker is 2");
})

test("check player input box", async ({page}) => {
  await page.getByLabel("Player 1 input").click();
  await page.getByLabel("Player 1 input").fill("Sue Bird");
  await page.getByLabel("Player 2 input").click();
  await page.getByLabel("Player 2 input").fill("Candace Parker");
  await page.click("[id='submit-button']");
  await expect(page.getByLabel("player-input")).toContainText("Sue Bird");
  await expect(page.getByLabel("player-input")).toContainText("Candace Parker");
})

test("check player outbut box", async ({page}) => {
  await page.getByLabel("Player 1 input").click();
  await page.getByLabel("Player 1 input").fill("Sue Bird");
  await page.getByLabel("Player 2 input").click();
  await page.getByLabel("Player 2 input").fill("Lisa Leslie");
  await page.click("[id='submit-button']");
  await expect(page.getByLabel("player-output")).toContainText("Sue Bird played with " +
      "Betty Lennox on the Seattle Storm in 2007");
  await expect(page.getByLabel("player-output")).toContainText("Betty Lennox played " +
      "with Lisa Leslie on the Los Angeles Sparks in 2009");
})

test("check for right ticketing teams", async ({page}) => {
  await page.getByLabel("Player 1 input").click();
  await page.getByLabel("Player 1 input").fill("Sue Bird");
  await page.getByLabel("Player 2 input").click();
  await page.getByLabel("Player 2 input").fill("Candace Parker");
  await page.click("[id='submit-button']");
  await expect(page.getByLabel("player-output")).toContainText("Tickets for the " +
      "Seattle Storm here!");
  await expect(page.getByLabel("player-output")).toContainText("Tickets for the" +
      " Los Angeles Sparks here!");
})

test("check if it detects old team name", async ({page}) => {
  await page.getByLabel("Player 1 input").click();
  await page.getByLabel("Player 1 input").fill("Astou Ndour-Fall");
  await page.getByLabel("Player 2 input").click();
  await page.getByLabel("Player 2 input").fill("Aiysha Smith");
  await page.click("[id='submit-button']");
  await expect(page.getByLabel("player-output")).toContainText("The San Antonio " +
      "Stars no longer exists!");
})

test("correct longer connection", async ({page}) => {
  await page.getByLabel("Player 1 input").click();
  await page.getByLabel("Player 1 input").fill("Susie Hopson-Shelton");
  await page.getByLabel("Player 2 input").click();
  await page.getByLabel("Player 2 input").fill("Jade Melbourne");
  await page.click("[id='submit-button']");
  await expect(page.getByLabel("History")).toContainText("The number of " +
      "connections between Susie Hopson-Shelton and Jade Melbourne is 5");
})

test("check if search history stays", async ({page}) => {
  await page.getByLabel("Player 1 input").click();
  await page.getByLabel("Player 1 input").fill("Sue Bird");
  await page.getByLabel("Player 2 input").click();
  await page.getByLabel("Player 2 input").fill("Candace Parker");
  await page.click("[id='submit-button']");
  await page.getByLabel("Player 1 input").click();
  await page.getByLabel("Player 1 input").fill("Susie Hopson-Shelton");
  await page.getByLabel("Player 2 input").click();
  await page.getByLabel("Player 2 input").fill("Jade Melbourne");
  await page.click("[id='submit-button']");
  await expect(page.getByLabel("History")).toContainText("The number of " +
      "connections between Susie Hopson-Shelton and Jade Melbourne is 5");
  await expect(page.getByLabel("History")).toContainText("The number of connections " +
      "between Sue Bird and Candace Parker is 2");
})

test("check 1 level connection", async ({page}) => {
  await page.getByLabel("Player 1 input").click();
  await page.getByLabel("Player 1 input").fill("Sue Bird");
  await page.getByLabel("Player 2 input").click();
  await page.getByLabel("Player 2 input").fill("Breanna Stewart");
  await page.click("[id='submit-button']");
  await page.getByLabel("Player 1 input").click();
  await page.getByLabel("Player 1 input").fill("Susie Hopson-Shelton");
  await page.getByLabel("Player 2 input").click();
  await page.getByLabel("Player 2 input").fill("Jade Melbourne");
  await page.click("[id='submit-button']");
  await expect(page.getByLabel("History")).toContainText("The number of " +
      "connections between Sue Bird and Breanna Stewart is 1");
  await expect(page.getByLabel("player-output")).toContainText("Sue Bird played with " +
      "Breanna Stewart on the Seattle Storm in 2022");
})

test("check no input", async ({page}) => {
  await page.getByLabel("Player 1 input").click();
  await page.getByLabel("Player 1 input").fill("");
  await page.getByLabel("Player 2 input").click();
  await page.getByLabel("Player 2 input").fill("");
  await page.click("[id='submit-button']");
  await expect(page.getByLabel("History")).toContainText("Only one player " +
      "submitted.");
})

test("check one input", async ({page}) => {
  await page.getByLabel("Player 1 input").click();
  await page.getByLabel("Player 1 input").fill("Sue Bird");
  await page.getByLabel("Player 2 input").click();
  await page.getByLabel("Player 2 input").fill("");
  await page.click("[id='submit-button']");
  await expect(page.getByLabel("History")).toContainText("Invalid second player.");
})

test("check one input for second box", async ({page}) => {
  await page.getByLabel("Player 1 input").click();
  await page.getByLabel("Player 1 input").fill("");
  await page.getByLabel("Player 2 input").click();
  await page.getByLabel("Player 2 input").fill("Sue Bird");
  await page.click("[id='submit-button']");
  await expect(page.getByLabel("History")).toContainText("Invalid first player.");
})

test("check invalid input or typo", async ({page}) => {
  await page.getByLabel("Player 1 input").click();
  await page.getByLabel("Player 1 input").fill("Sue Baird");
  await page.getByLabel("Player 2 input").click();
  await page.getByLabel("Player 2 input").fill("Brittneyyy Grinerrrrrr");
  await page.click("[id='submit-button']");
  await expect(page.getByLabel("History")).toContainText("");
})

test("check same player twice", async ({page}) => {
  await page.getByLabel("Player 1 input").click();
  await page.getByLabel("Player 1 input").fill("Sue Bird");
  await page.getByLabel("Player 2 input").click();
  await page.getByLabel("Player 2 input").fill("Sue Bird");
  await page.click("[id='submit-button']");
  await expect(page.getByLabel("History")).toContainText("Only one player " +
      "submitted.");
})