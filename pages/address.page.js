import { BasePage } from '../utils/basePage';

export class AddressPage extends BasePage {
  async fillAddress({ country, province, district, municipality, wardNo, tole, telephone }, filePath) {
    await this.waitForURL('document-details');

    await this.page.getByRole('combobox', { name: 'Country' }).click();
    await this.page.getByRole('option', { name: country }).click();

    await this.page.getByRole('combobox', { name: 'Province' }).click();
    await this.page.getByRole('option', { name: province }).click();

    await this.page.getByRole('combobox', { name: 'District' }).click();
    await this.page.getByRole('option', { name: district }).click();

    await this.page.getByRole('combobox', { name: 'Rural Municipality/' }).click();
    await this.page.getByRole('option', { name: municipality }).click();

    await this.page.getByRole('textbox', { name: 'Ward No.' }).fill(wardNo);
    await this.page.getByRole('textbox', { name: 'Tole' }).fill(tole);
    await this.page.getByRole('textbox', { name: 'Telephone No.' }).fill(telephone);

    await this.page.locator('input[type="file"]:visible').first().setInputFiles(filePath);

    await this.clickNext();
    await this.waitForURL('address-details');
    await this.clickConfirm();
  }
}