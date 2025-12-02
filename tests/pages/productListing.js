
export class productListing {
  constructor(page) {
    this.page = page;
    this.inventoryList = page.locator('.inventory_list');
    this.inventoryItems = page.locator('.inventory_item');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
  }

  async gotoInventory() {
    await this.page.goto('https://www.saucedemo.com/inventory.html');
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
