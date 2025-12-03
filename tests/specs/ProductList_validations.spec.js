import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { productListing } from '../pages/productListing';

test.describe('Product Listing Tests', () => {
  let loginPage;
  let inventoryPage;
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new productListing(page);
    // Login before each test
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });

  //Test 1-> Verify product count > 0
  test('Verify product count is greater than 0', async ({ page }) => {
    await expect(inventoryPage.inventoryList).toBeVisible();
    const count = await inventoryPage.getProductCount();
    expect(count).toBeGreaterThan(0);
  });

  //Test 2: Verify filter/sort dropdown is visible
  test('Verify filter/sort dropdown is visible', async ({ page }) => {
    const isVisible = await inventoryPage.isSortDropdownVisible();
    expect(isVisible).toBeTruthy();
  });

  //Test 3: Validate each product tile elements (image, name, price, add button)
  test('Validate product tile elements for all products', async ({ page }) => {
    await inventoryPage.validateProductTiles();
  });
});
