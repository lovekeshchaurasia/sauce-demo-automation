import { expect } from '@playwright/test';
export class productListing {
  constructor(page) {
    this.page = page;
    this.inventoryList = page.locator('.inventory_list');
    this.inventoryItems = page.locator('.inventory_item');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    
    this.productBackpack = page.locator('button[data-test="add-to-cart-sauce-labs-backpack"]');
    this.productBikeLight = page.locator('button[data-test="add-to-cart-sauce-labs-bike-light"]');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');

  }

  async gotoInventory() {
    await this.page.goto('https://www.saucedemo.com/inventory.html');
  }

async addBackpack() {
    await this.productBackpack.click();
  }

async goToCart() {
    await this.cartLink.click();
  }

  async addBikeLight() {
    await this.productBikeLight.click();
  }

  async expectCartBadge(count) {
    await expect(this.cartBadge).toHaveText(String(count));
  }

  async getProductCount() {
    return await this.inventoryItems.count();
  }

  async isSortDropdownVisible() {
    return await this.sortDropdown.isVisible();
  }

  async validateProductTiles() {
    const count = await this.getProductCount();
    for (let i = 0; i < count; i++) {
      const product = this.inventoryItems.nth(i);
      await expect(product.locator('img.inventory_item_img')).toBeVisible();
      await expect(product.locator('.inventory_item_name')).not.toBeEmpty();
      await expect(product.locator('.inventory_item_price')).not.toBeEmpty();
      await expect(product.locator('button')).toBeVisible();
    }
  }
}
