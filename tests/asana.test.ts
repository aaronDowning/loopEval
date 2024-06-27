import { test, expect } from '@playwright/test';
import testCases from './testData.json';

// const testCases = [
//   {
//     "id": 1,
//     "name": "Test Case 1",
//     "leftNav": "Cross-functional project plan, Project",
//     "column": "To do",
//     "card_title": "Draft project brief"
//   },
//   {
//     "id": 2,
//     "name": "Test Case 2",
//     "leftNav": "Cross-functional project plan, Project",
//     "column": "To do",
//     "card_title": "Schedule kickoff meeting"
//   },
//   {
//     "id": 3,
//     "name": "Test Case 3",
//     "leftNav": "Cross-functional project plan, Project",
//     "column": "To do",
//     "card_title": "Share timeline with teammates"
//   },
//   {
//     "id": 4,
//     "name": "Test Case 4",
//     "leftNav": "Work Requests",
//     "column": "New Requests",
//     "card_title": "[Example] Laptop setup for new hire"
//   },
//   {
//     "id": 5,
//     "name": "Test Case 5",
//     "leftNav": "Work Requests",
//     "column": "In Progress",
//     "card_title": "[Example] Password not working"
//   },
//   {
//     "id": 6,
//     "name": "Test Case 6",
//     "leftNav": "Work Requests",
//     "column": "Completed",
//     "card_title": "[Example] New keycard for Daniela V"
//   }
// ];

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
