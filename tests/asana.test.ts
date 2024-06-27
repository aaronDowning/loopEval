import { test, expect } from '@playwright/test';
import testCases from './testData.json';

test.describe('Asana Data-Driven Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/-/login');
    await page.fill('input[name="e"]', 'ben+pose@workwithloop.com');
    await page.click('div.LoginEmailForm-continueButton');
    await page.fill('input[type="password"]', 'Password123');
    await page.click('div.ThemeableRectangularButtonPresentation--isEnabled[role="button"]');
    await page.waitForNavigation();
  });

  testCases.forEach((data) => {
    test(`${data.name}`, async ({ page }) => {
      await test.step('Navigate to the project page', async () => {
        const navItems = data.leftNav.split(', ');
        const workspace = navItems[0];
        const project = navItems.length > 1 ? navItems[1] : null;

        console.log(`Navigating to workspace: ${workspace}, project: ${project}`);

        await page.click(`text=${workspace}`, { timeout: 60000 });
        if (project) {
          await page.click(`text=${project}`, { timeout: 60000 });
        }
      });

      await test.step('Verify the card is within the right column', async () => {
        await expect(page.locator(`text=${data.column}`)).toBeVisible({ timeout: 30000 });
        await expect(page.locator(`text=${data.card_title}`)).toBeVisible({ timeout: 30000 });
      });
    });
  });
});
