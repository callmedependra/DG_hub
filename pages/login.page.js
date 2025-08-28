import { expect } from '@playwright/test';
import { BasePage } from '../utils/basePage';

export class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.emailInput = page.getByRole('textbox', { name: 'Email' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.captchaInput = page.getByRole('textbox', { name: 'Captcha' });
    this.loginBtn = page.getByRole('button', { name: 'Login', exact: true });
  }

  async goto() {
    await this.page.goto('https://newkyc.dghub.io/kyc/login');
  }

  async login({ email, password, captcha }) {
    await expect(this.emailInput).toBeVisible();
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.captchaInput.fill(captcha);
    await this.loginBtn.click();
    await this.waitForURL('kyc/home');
  }
}