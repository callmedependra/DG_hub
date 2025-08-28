import { BasePage } from '../utils/basePage';

export class DocumentPage extends BasePage {
  async uploadDoc(docType, files) {
    await this.page.getByRole('button', { name: '+ Add' }).click();
    await this.page.getByRole('button', { name: 'Open' }).click();
    await this.page.getByRole('option', { name: docType }).click();

    for (let i = 0; i < files.length; i++) {
      await this.page.locator('input[type="file"]:visible').nth(i).setInputFiles(files[i]);
    }

    await this.page.getByRole('button', { name: 'Add Document' }).click();
  }

  async uploadDoubleDoc(docType, file1, file2, extraFieldsFn) {
    await this.page.getByRole('button', { name: '+ Add' }).click();
    await this.page.getByRole('button', { name: 'Open' }).click();
    await this.page.getByRole('option', { name: docType }).click();

    if (extraFieldsFn) await extraFieldsFn();

    const fileInputs = await this.page.locator('input[type="file"]:visible').count();

    if (fileInputs > 1) {
      await this.page.locator('input[type="file"]:visible').nth(0).setInputFiles(file1);
      await this.page.waitForTimeout(3000);
      await this.page.locator('input[type="file"]:visible').nth(0).setInputFiles(file2);
    } else {
      await this.page.locator('input[type="file"]:visible').first().setInputFiles([file1, file2]);
    }

    await this.page.getByRole('button', { name: 'Add Document' }).click();
  }
}