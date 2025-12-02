// import { test, expect } from '@playwright/test';

// //verify product count > 0
// test('Product count' , async({page}) => {
    
//   await page.goto('https://www.saucedemo.com');

// // Login
//   await page.fill('#user-name', 'standard_user');
//   await page.fill('#password', 'secret_sauce');
//   await page.click('#login-button');
//   await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

// // Wait for inventory page
//   await page.waitForSelector('.inventory_list');
//     const products = await page.locator('.inventory_item');
//     const count = await products.count();
//     expect(count).toBeGreaterThan(0);
//     await page.waitForTimeout(5000);

// // filter/sort if available
//     await page.locator('.select_container').click();
//     const sortDropdown = await page.locator('[data-test="product-sort-container"]');
//     await expect(sortDropdown).toBeVisible();

// // product tile elements (image, name, price, add button)
// //validating each product tile elements
// for(let i=0; i<count; i++) {
//     const product = products.nth(i);
//     // checking the image
//     await expect(product.locator('img.inventory_item_img')).toBeVisible();   
//     // Name
//     await expect(product.locator('.inventory_item_name')).not.toBeEmpty();
//     // Price
//     await expect(product.locator('.inventory_item_price')).not.toBeEmpty();
//     // Add to Cart button
//     await expect(product.locator('button')).toBeVisible();

// }

//     await page.waitForTimeout(3000);
// })


import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { productListing } from '../pages/productListing';

test('Validate Product List', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new productListing(page);

  // Login
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

  // Validate product count > 0
  await expect(inventoryPage.inventoryList).toBeVisible();
  const count = await inventoryPage.getProductCount();
  expect(count).toBeGreaterThan(0);

  // Validate sort dropdown
  expect(await inventoryPage.isSortDropdownVisible()).toBeTruthy();

  // Validate each product tile elements
  await inventoryPage.validateProductTiles();
});
