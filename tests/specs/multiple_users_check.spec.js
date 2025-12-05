
import { test, expect } from '@playwright/test';
import users from '../data/users.json';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login Tests with Multiple Users', () => {
  let loginPage;
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  // Test for all valid users
  for (const user of users.validUsers) {
    test(`Login with valid user: ${user.username}`, async ({ page }) => {
      await loginPage.login(user.username, user.password);
      await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });
  }

  // Test for invalid users
  for (const user of users.invalidUsers) {
    test(`Login with invalid user: ${user.username}`, async ({ page }) => {
      await loginPage.login(user.username, user.password);
      const errorMsg = page.locator('[data-test="error"]');
      await expect(errorMsg).toContainText('Epic sadface');
    });
  }
});
