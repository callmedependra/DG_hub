export class BasePage {
  constructor(page) {
    this.page = page;
  }

  async clickNext() {
    await this.page.getByRole('button', { name: 'Next' }).click();
  }

  async clickConfirm() {
    await this.page.getByRole('button', { name: 'Confirm' }).click();
  }

  async waitForURL(pattern) {
    await this.page.waitForURL(new RegExp(pattern));
  }
}