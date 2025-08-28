import { BasePage } from '../utils/basePage';

export class BankPage extends BasePage {
  async fillBankDetails({ bankName, accountNumber, accountType, branch }) {
    await this.waitForURL('bank-details');

    await this.page.getByRole('button', { name: 'Open' }).first().click();
    await this.page.getByRole('option', { name: bankName }).click();

    await this.page.getByRole('textbox', { name: 'Account Number' }).fill(accountNumber);

    await this.page.getByRole('button', { name: 'Open' }).nth(1).click();
    await this.page.getByRole('option', { name: accountType }).click();

    await this.page.getByRole('button', { name: 'Open' }).nth(2).click();
    await this.page.getByRole('option', { name: branch }).click();

    await this.page.getByRole('button', { name: '+ Add' }).click();
    await this.clickNext();
  }
}