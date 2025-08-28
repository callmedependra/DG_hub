import { BasePage } from '../utils/basePage';

export class KycStartPage extends BasePage {
  async startRegistration() {
    // await this.page.getByRole('button', { name: 'Continue Registration' }).click();
    await this.page.getByRole('button', { name: 'Start Registration' }).click();
  }


  async fillPersonalDetails({
    firstName,
    lastName,
    firstNameDevanagari,
    lastNameDevanagari,
    dateOfBirthYear,
    dateOfBirthDay,
    gender,
    country,
  }) {
    await this.page.getByRole('textbox', { name: 'First Name' }).fill(firstName);
    await this.page.getByRole('textbox', { name: 'Last Name' }).fill(lastName);

    // Fill transliterated first name and select Devanagari option
  await this.page.getByRole('combobox', { name: 'First Name (Devanagari)' }).fill('Dipendra');
  await this.page.getByRole('option', { name: firstNameDevanagari }).click();

  // Fill transliterated last name and select Devanagari option
  await this.page.getByRole('combobox', { name: 'Last Name (Devanagari)' }).fill('Thapa');
  await this.page.getByRole('option', { name: lastNameDevanagari }).click();

    await this.page.getByRole('button', { name: 'Choose date' }).click();
    await this.page.getByRole('button', { name: 'calendar view is open, switch' }).click();
    await this.page.getByRole('radio', { name: dateOfBirthYear }).click();
    await this.page.getByRole('gridcell', { name: dateOfBirthDay, exact: true }).click();

    await this.page.getByRole('combobox', { name: 'Gender' }).click();
    await this.page.getByRole('option', { name: gender, exact: true }).click();

    await this.page.getByRole('button', { name: 'Open' }).nth(4).click();
    await this.page.getByRole('option', { name: country }).click();

    await this.clickNext();
  }
}