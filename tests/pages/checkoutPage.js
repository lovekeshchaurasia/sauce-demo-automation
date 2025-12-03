
import { expect } from '@playwright/test';

export class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.checkoutBtn = page.locator('#checkout');
    this.firstNameInput = page.locator('#first-name');
    this.lastNameInput = page.locator('#last-name');
    this.postalCodeInput = page.locator('#postal-code');
    this.continueBtn = page.locator('#continue');
    this.errorMsg = page.locator('[data-test="error"]');
        this.subtotalLabel = page.locator('.summary_subtotal_label');
    this.summaryInfo = page.locator('.summary_info');
    this.finishBtn = page.locator('#finish');
    this.confirmationHeader = page.locator('.complete-header');
    this.confirmationText = page.locator('.complete-text');
  }

  async startCheckout() {
    await this.checkoutBtn.click();
  }

  async clickContinue() {
    await this.continueBtn.click();
  }

  async expectError(message) {
    await expect(this.errorMsg).toHaveText(message);
  }

  async fillDetails(firstName, lastName, postalCode) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueBtn.click();
  }

  async expectSummaryVisible() {
    await expect(this.summaryInfo).toBeVisible();
  }

  async finishOrder() {
    await this.finishBtn.click();
  }

  async expectOrderConfirmation() {
    await expect(this.confirmationHeader).toHaveText('Thank you for your order!');
    await expect(this.confirmationText).toContainText('Your order has been dispatched');
  }
  
 async getDisplayedSubtotal() {
    const text = await this.subtotalLabel.textContent();
    return parseFloat(text.replace('Item total: $', ''));
  }

}
