import { expect } from '@playwright/test';
export class ProductDetailsPage {
  constructor(page) {
    this.page = page;
    this.productLink = page.locator('[data-test="item-4-title-link"]');
    this.productName = page.locator('[data-test="inventory-item-name"]');
    this.description = page.locator('[data-test="inventory-item-desc"]');
    this.price = page.locator('.inventory_details_price');
    this.addToCartBtn = page.locator('button:has-text("Add to cart")');
    this.backBtn = page.locator('button:has-text("Back to products")');
  }

  async openFirstProduct() {
    await this.productLink.click();
    await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=4');
  }

  async getProductName() {
    return await this.productName.textContent();
  }

  async validateDescription(expectedText) {
    const desc = await this.description.textContent();
    expect(desc).toContain(expectedText);
  }

  async validatePrice() {
    await expect(this.price).toBeVisible();
    return await this.price.textContent();
  }

  async clickAddToCart() {
    await expect(this.addToCartBtn).toBeVisible();
    await this.addToCartBtn.click();
  }

  async navigateBack() {
    await this.backBtn.click();
    await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html');
  }
}
