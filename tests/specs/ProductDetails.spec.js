// import { test, expect } from '@playwright/test';

// test('Validate first product details', async ({ page }) => {
//   // 1. Login
//   await page.goto('https://www.saucedemo.com/');
//   await page.fill('#user-name', 'standard_user');
//   await page.fill('#password', 'secret_sauce');
//   await page.click('#login-button');
//   await page.waitForTimeout(1000);
// });
// test('open detail' , async({page}) => {
// await page.waitForSelector('.inventory_item');
// // 3. Get first product name and click it
//   const firstProduct = page.locator('[data-test="item-4-title-link"]');
//   await firstProduct.click();
//   await expect(page).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=4');
//   const productName = await page.locator('[data-test="inventory-item-name"]').textContent();
//   expect(productName).toContain('Sauce Labs Backpack');
//   console.log('First Product:', productName);
//   await page.waitForTimeout(1000);
// })
// test('validate description' , async({page}) => {
// const description = await page.locator('[data-test="inventory-item-desc"]').textContent();
//   expect(description).toContain('carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection');
//   await page.waitForTimeout(1000);
// })

//   test('validate price' , async({page}) => {
//  const price = page.locator('.inventory_details_price');
//   await expect(price).toBeVisible();
//   await page.waitForTimeout(1000);
//   console.log('Price:', await price.textContent());
//   })
 
// test('validate add to cart' , async({page}) => {
// const addToCartBtn = page.locator('button:has-text("Add to cart")');
//   await expect(addToCartBtn).toBeVisible();
//   await addToCartBtn.click();
//   await page.waitForTimeout(1000);
// })

// test('Navigate to Inventory page' , async ({page}) => {
//   await page.click('button:has-text("Back to products")');
//   await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
//   await page.waitForTimeout(1000);
// })



import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductDetailsPage } from '../pages/productDetailsPage';

test.describe('Product Details Tests', () => {
  test('Validate first product details', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productDetailsPage = new ProductDetailsPage(page);

    // Login
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    // Open first product
    await productDetailsPage.openFirstProduct();

    // Validate product name
    const productName = await productDetailsPage.getProductName();
    expect(productName).toContain('Sauce Labs Backpack');
    console.log('First Product:', productName);

    // Validate description
    await productDetailsPage.validateDescription(
      'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection'
    );

    // Validate price
    const price = await productDetailsPage.validatePrice();
    console.log('Price:', price);

    // Validate Add to Cart
    await productDetailsPage.clickAddToCart();

    // Navigate back
    await productDetailsPage.navigateBack();
  });
});

