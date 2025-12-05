
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { CartPage } from '../pages/cartPage';
import { CheckoutPage } from '../pages/checkoutPage';

test.describe('Checkout Tests', () => {
  let loginPage;
  let cartPage;
  let checkoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    // Login before each test
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    // Navigate to cart page
    await page.click('.shopping_cart_link');
  });

  //Test 1: Start checkout with empty cart
  test('Start checkout with empty cart', async ({ page }) => {
    await cartPage.expectEmptyCart();
    await checkoutPage.startCheckout();
    await expect(page.locator('#continue')).toBeVisible();
  });

  //Test 2: Error handling for empty fields
  test('Validate error handling for empty fields', async ({ page }) => {
    await checkoutPage.startCheckout();
    await checkoutPage.clickContinue();
    await checkoutPage.expectError('Error: First Name is required');
  });

  //Test 3: Error handling for partial data
  test('Validate error handling for partial data', async ({ page }) => {
    await checkoutPage.startCheckout();

    // Fill only first name
    await page.fill('#first-name', 'Test');
    await checkoutPage.clickContinue();
    await checkoutPage.expectError('Error: Last Name is required');

    // Fill first and last name, leave postal empty
    await page.fill('#last-name', 'User');
    await checkoutPage.clickContinue();
    await checkoutPage.expectError('Error: Postal Code is required');
  });

  // Test 4: Successful finish after valid data
  test('Complete checkout successfully', async ({ page }) => {
    await checkoutPage.startCheckout();
    await checkoutPage.fillDetails('Test', 'User', '12345');
    await checkoutPage.expectSummaryVisible();
    await checkoutPage.finishOrder();
    await checkoutPage.expectOrderConfirmation();
  });

  // Test 5: Validate order confirmation content
  test('Validate order confirmation content', async ({ page }) => {
    await checkoutPage.startCheckout();
    await checkoutPage.fillDetails('Test', 'User', '12345');
    await checkoutPage.finishOrder();
    await checkoutPage.expectOrderConfirmation();

    const confirmationText = await page.locator('.complete-text').textContent();
    expect(confirmationText).toContain('Your order has been dispatched');
    console.log('Order Confirmation:', confirmationText);
  });
});
