import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login Tests', () => {
  
  test('Valid Login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });

  test('Invalid Login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('wrong_user', 'wrong_pass');
    const errorText = await loginPage.getErrorMessage();
    expect(errorText).toContain('Epic sadface: Username and password do not match any user in this service');
  });

  test('Locked Out User', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('locked_out_user', 'secret_sauce');
    const errorText = await loginPage.getErrorMessage();
    expect(errorText).toContain('Epic sadface: Sorry, this user has been locked out');
  });

  test('Empty Fields Validation', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await page.click('#login-button'); // No username/password entered
    const errorText = await loginPage.getErrorMessage();
    expect(errorText).toContain('Epic sadface: Username is required');
  });

});
