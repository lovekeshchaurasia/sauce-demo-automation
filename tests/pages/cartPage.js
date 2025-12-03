
import { expect } from '@playwright/test';

export class CartPage {
  constructor(page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
    this.removeBackpackBtn = page.locator('button[data-test="remove-sauce-labs-backpack"]');
    this.continueShoppingBtn = page.locator('#continue-shopping');
  }

  async expectItemCount(count) {
    await expect(this.cartItems).toHaveCount(count);
  }

  async removeBackpack() {
    await this.removeBackpackBtn.click();
  }
async expectEmptyCart() {
    await expect(this.cartItems).toHaveCount(0);
  }
  async continueShopping() {
    await this.continueShoppingBtn.click();
  }
}
