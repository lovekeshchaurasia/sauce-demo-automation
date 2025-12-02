
// import { test, expect } from '@playwright/test';

// test('Checkout: empty cart, error handling, invalid data, successful finish', async ({ page }) => {
//   // 1. Login
//   await page.goto('https://www.saucedemo.com/');
//   await page.fill('#user-name', 'standard_user');
//   await page.fill('#password', 'secret_sauce');
//   await page.click('#login-button');

//   // 2. Go to cart without adding any product
//   await page.click('.shopping_cart_link');

//   // Check empty cart scenario
//   const cartItems = page.locator('.cart_item');
//   await expect(cartItems).toHaveCount(0);

//   // Try checkout with empty cart
//   await page.click('#checkout');

//   // 3. Validate error handling for empty fields
//   await page.click('#continue');
//   const errorMsg = page.locator('[data-test="error"]');
//   await expect(errorMsg).toHaveText('Error: First Name is required');

//   // Fill only first name
//   await page.fill('#first-name', 'Test');
//   await page.click('#continue');
//   await expect(errorMsg).toHaveText('Error: Last Name is required');

//   // Fill first and last name, leave postal empty
//   await page.fill('#last-name', 'User');
//   await page.click('#continue');
//   await expect(errorMsg).toHaveText('Error: Postal Code is required');

//   // 4. Fill valid shipping info
//   await page.fill('#postal-code', '12345');
//   await page.click('#continue');

//   //  Validate summary page loads
//   await expect(page.locator('.summary_info')).toBeVisible();

//   // 5. Finish checkout
//   await page.click('#finish');

//   //  Validate order confirmation
//   const confirmationHeader = page.locator('.complete-header');
//   await expect(confirmationHeader).toHaveText('Thank you for your order!');

//   const confirmationText = page.locator('.complete-text');
//   await expect(confirmationText).toContainText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');

//   await page.waitForTimeout(3000);
// });



import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { CartPage } from '../pages/cartPage';
import { CheckoutPage } from '../pages/checkoutPage';

test('Checkout: empty cart, error handling, invalid data, successful finish', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  // 1. Login
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  // 2. Go to cart without adding any product
  await page.click('.shopping_cart_link');
  await cartPage.expectEmptyCart();

  // Try checkout with empty cart
  await checkoutPage.startCheckout();

  // 3. Validate error handling for empty fields
  await checkoutPage.clickContinue();
  await checkoutPage.expectError('Error: First Name is required');

  await page.fill('#first-name', 'Test');
  await checkoutPage.clickContinue();
  await checkoutPage.expectError('Error: Last Name is required');

  await page.fill('#last-name', 'User');
  await checkoutPage.clickContinue();
  await checkoutPage.expectError('Error: Postal Code is required');

  // 4. Fill valid shipping info
  await checkoutPage.fillDetails('Test', 'User', '12345');
  await checkoutPage.expectSummaryVisible();

  // 5. Finish checkout
  await checkoutPage.finishOrder();
  await checkoutPage.expectOrderConfirmation();

  await page.waitForTimeout(3000);
});
