import { expect } from '@playwright/test';
import { BasePage } from '../utils/basePage';

export class KycStartPage extends BasePage {
  async startRegistration() {
    // await this.page.getByRole('button', { name: 'Continue Registration' }).click();
    await this.page.getByRole('button', { name: 'Start Registration' }).click();
  }


  async personalDetailsExpectFailSequence(testSteps) {
  for (const step of testSteps) {
    const {
      firstName,
      lastName,
      firstNameDevanagari,
      lastNameDevanagari,
      dateOfBirthYear,
      dateOfBirthDay,
      gender,
      country,
      expectedError,
    } = step;

    // Fill First & Last Name
    if (firstName !== undefined) {
      await this.page.getByRole('textbox', { name: 'First Name' }).fill(firstName);
    }
    if (lastName !== undefined) {
      await this.page.getByRole('textbox', { name: 'Last Name' }).fill(lastName);
    }

    // Fill transliterated First Name (Devanagari)
    if (firstNameDevanagari !== undefined) {
      await this.page.getByRole('combobox', { name: 'First Name (Devanagari)' }).fill(firstNameDevanagari);
      await this.page.getByRole('option', { name: firstNameDevanagari }).click();
    }

    // Fill transliterated Last Name (Devanagari)
    if (lastNameDevanagari !== undefined) {
      await this.page.getByRole('combobox', { name: 'Last Name (Devanagari)' }).fill(lastNameDevanagari);
      await this.page.getByRole('option', { name: lastNameDevanagari }).click();
    }

    // Date of Birth
    if (dateOfBirthYear && dateOfBirthDay) {
      await this.page.getByRole('button', { name: 'Choose date' }).click();
      await this.page.getByRole('button', { name: 'calendar view is open, switch' }).click();
      await this.page.getByRole('radio', { name: dateOfBirthYear }).click();
      await this.page.getByRole('gridcell', { name: dateOfBirthDay, exact: true }).click();
    }

    // Gender
    if (gender) {
      await this.page.getByRole('combobox', { name: 'Gender' }).click();
      await this.page.getByRole('option', { name: gender, exact: true }).click();
    }

    // Country
    if (country) {
      await this.page.getByRole('button', { name: 'Open' }).nth(4).click();
      await this.page.getByRole('option', { name: country }).click();
    }

    // Click Next
    await this.clickNext();

    // Validate the expected error
    await expect(
      this.page.getByText(expectedError, { exact: true })
    ).toBeVisible({ timeout: 5000 });

       await this.page.reload();
  }
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

  // async personalDetailsExpectFailSequence(testSteps) {
  //   for (const step of testSteps) {
  //     const { expectedError, ...fields } = step;

  //     await this.fillPersonalDetails(fields);

  //     await expect(
  //       this.page.getByText(expectedError, { exact: true })
  //     ).toBeVisible({ timeout: 5000 });
  //   }
  // }
}