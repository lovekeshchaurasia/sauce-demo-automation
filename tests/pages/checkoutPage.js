
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
    this.summaryInfo = page.locator('.summary_info');
    this.finishBtn = page.locator('#finish');
    this.confirmationHeader = page.locator('.complete-header');
    this.confirmationText = page.locator('.complete-text');
  }

  /** Start checkout process */
  async startCheckout() {
    await this.checkoutBtn.click();
  }

  /** Click continue without filling details */
  async clickContinue() {
    await this.continueBtn.click();
  }

  /** Validate error message */
  async expectError(message) {
    await expect(this.errorMsg).toHaveText(message);
  }

  /** Fill shipping details */
  async fillDetails(firstName, lastName, postalCode) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueBtn.click();
  }

  /** Validate summary page is visible */
  async expectSummaryVisible() {
    await expect(this.summaryInfo).toBeVisible();
  }

  /** Finish checkout */
  async finishOrder() {
    await this.finishBtn.click();
  }

  /** Validate order confirmation */
  async expectOrderConfirmation() {
    await expect(this.confirmationHeader).toHaveText('Thank you for your order!');
    await expect(this.confirmationText).toContainText('Your order has been dispatched');
  }
}
