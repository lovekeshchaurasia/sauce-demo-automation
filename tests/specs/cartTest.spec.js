
// import { test, expect } from '@playwright/test';

// test('Cart: add multiple products, remove, update quantity, badge & subtotal', async ({ page }) => {
//   // 1. Login
//   await page.goto('https://www.saucedemo.com/');
//   await page.fill('#user-name', 'standard_user');
//   await page.fill('#password', 'secret_sauce');
//   await page.click('#login-button');

//   // 2. Wait for inventory page
//   await page.waitForSelector('.inventory_item');

//   // 3. Add two distinct products
//   const product1 = page.locator('button[data-test="add-to-cart-sauce-labs-backpack"]');
//   const product2 = page.locator('button[data-test="add-to-cart-sauce-labs-bike-light"]');

//   await product1.click();
//   await product2.click();

//   //  Check cart badge shows "2"
//   const cartBadge = page.locator('.shopping_cart_badge');
//   await expect(cartBadge).toHaveText('2');

//   // 4. Go to cart page
//   await page.click('.shopping_cart_link');
//   await page.waitForSelector('.cart_item');

//   //  Validate two items in cart
//   const cartItems = page.locator('.cart_item');
//   await expect(cartItems).toHaveCount(2);

//   // 5. Remove one product
//   const removeBtn = page.locator('button[data-test="remove-sauce-labs-backpack"]');
//   await removeBtn.click();

//   //  Cart badge updates to "1"
//   await expect(cartBadge).toHaveText('1');

//   //  Validate only one item remains
//   await expect(cartItems).toHaveCount(1);

//   // 6. Simulate quantity update (add again)
//   await page.click('#continue-shopping');
//   await product1.click(); // Add backpack again
//   await expect(cartBadge).toHaveText('2');

//   // 7. Validate subtotal calculation
//   await page.click('.shopping_cart_link');
//   const prices = await page.locator('.inventory_item_price').allTextContents();
//   const numericPrices = prices.map(p => parseFloat(p.replace('$', '')));
//   const subtotal = numericPrices.reduce((sum, price) => sum + price, 0);

//   console.log('Expected Subtotal:', subtotal);

//   //  Check subtotal on checkout page
//   await page.click('#checkout');
//   await page.fill('#first-name', 'Test');
//   await page.fill('#last-name', 'User');
//   await page.fill('#postal-code', '12345');
//   await page.click('#continue');

//   const displayedSubtotal = await page.locator('.summary_subtotal_label').textContent();
// //   console.log("=======================================================" ,displayedSubtotal);
//   const displayedValue = parseFloat(displayedSubtotal.replace('Item total: $', ''));

//   expect(displayedValue).toBeCloseTo(subtotal, 2);
//   await page.click('#finish');
//   await page.waitForTimeout(5000);
// });


import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { productListing } from '../pages/productListing';
import { CartPage } from '../pages/cartPage';
import { CheckoutPage } from '../pages/checkoutPage';

test.describe('Cart Tests', () => {
  let loginPage;
  let productPage;
  let cartPage;
  let checkoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productPage = new productListing(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    // Login before each test
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  // ✅ Test 1: Add multiple distinct products
  test('Add multiple distinct products', async ({ page }) => {
    await productPage.addBackpack();
    await productPage.addBikeLight();
    await productPage.expectCartBadge(2);
  });

  // ✅ Test 2: Remove a product from cart
  test('Remove a product from cart', async ({ page }) => {
    await productPage.addBackpack();
    await productPage.addBikeLight();
    await productPage.goToCart();
    await cartPage.expectItemCount(2);
    await cartPage.removeBackpack();
    await productPage.expectCartBadge(1);
    await cartPage.expectItemCount(1);
  });

  // ✅ Test 3: Update quantity (simulate by add/remove)
  test('Update quantity by adding again after removal', async ({ page }) => {
    await productPage.addBackpack();
    await productPage.addBikeLight();
    await productPage.goToCart();
    await cartPage.removeBackpack();
    await cartPage.continueShopping();
    await productPage.addBackpack();
    await productPage.expectCartBadge(2);
  });

  // ✅ Test 4: Validate cart badge updates correctly
  test('Validate cart badge updates', async ({ page }) => {
    await productPage.addBackpack();
    await productPage.expectCartBadge(1);
    await productPage.addBikeLight();
    await productPage.expectCartBadge(2);
  });

  // ✅ Test 5: Subtotal calculation check
  test('Validate subtotal calculation on checkout page', async ({ page }) => {
    await productPage.addBackpack();
    await productPage.addBikeLight();
    await productPage.goToCart();

    const prices = await page.locator('.inventory_item_price').allTextContents();
    const numericPrices = prices.map(p => parseFloat(p.replace('$', '')));
    const subtotal = numericPrices.reduce((sum, price) => sum + price, 0);

    await checkoutPage.startCheckout();
    await checkoutPage.fillDetails('Test', 'User', '12345');
    const displayedSubtotal = await checkoutPage.getDisplayedSubtotal();
    expect(displayedSubtotal).toBeCloseTo(subtotal, 2);
  });
});
