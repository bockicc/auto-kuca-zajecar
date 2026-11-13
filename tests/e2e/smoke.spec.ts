import { expect, test } from "@playwright/test";

const vehicleSlug = "volkswagen-golf-2-0-tdi-2019";

test("home page loads", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/Auto kuća Zaječar/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Glavna navigacija" })).toBeVisible();
});

test("inventory lists vehicles and supports filtering", async ({ page }) => {
  await page.goto("/vozila");

  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByText("Volkswagen Golf", { exact: false }).first()).toBeVisible();

  await page.goto("/vozila?brand=Volkswagen");

  await expect(page.getByText("Volkswagen Golf", { exact: false }).first()).toBeVisible();
});

test("vehicle detail page renders", async ({ page }) => {
  await page.goto(`/vozila/${vehicleSlug}`);

  await expect(page.getByRole("heading", { level: 1 })).toContainText("Volkswagen Golf");
  await expect(page.getByText("2019", { exact: false }).first()).toBeVisible();
});

test("contact page renders the inquiry form", async ({ page }) => {
  await page.goto("/kontakt");

  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByRole("button", { name: /pošalj/i }).first()).toBeVisible();
});

test("legal pages render", async ({ page }) => {
  for (const path of ["/politika-privatnosti", "/uslovi-koriscenja", "/politika-kolacica"]) {
    await page.goto(path);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  }
});

test("unknown route shows the not found page", async ({ page }) => {
  const response = await page.goto("/nepostojeca-stranica");

  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});
