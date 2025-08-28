import { BasePage } from '../utils/basePage';
//breakpoint banauni afno lagi back and throw .
export class FamilyPage extends BasePage {
  async fillFamilyDetails(family) {
    for (let i = 0; i < family.length; i++) {
      const { fname, lname, fnameNep, lnameNep } = family[i];
      console.log(`Current index: ${i}`)
      await this.page.locator(`input[name="personDetail.${i}.[personDetail].fname"]`).fill(fname);
      await this.page.locator(`input[name="personDetail.${i}.[personDetail].lname"]`).fill(lname);
      await this.page.pause();
      // await this.page.getByRole(`combobox.${i}.[personDetail].fnameNep"]`).fill(fnameNep);
      // await this.page.getByRole('option', { name: fnameNep }).click();
      // await this.page.getByRole(`combobox.${i}.[personDetail].lnameNep"]`).fill(lnameNep);
      // await this.page.getByRole('option', { name: lnameNep }).click();

      // First name Nepali
await this.page
  .locator(`input[name="personDetail.${i}.[personDetail].fnameNep"]`)
  .fill(fname);

await this.page.getByRole('option', { name: fnameNep }).click();

// Last name Nepali
await this.page
  .locator(`input[name="personDetail.${i}.[personDetail].lnameNep"]`)
  .fill(lname);

await this.page.getByRole('option', { name: lnameNep }).click();

    }

    await this.page.getByText('Family DetailsGrand Father *').click({ button: 'right' });
    await this.clickNext();
    await this.waitForURL('family-details');
    await this.clickConfirm();
  }
}

// await page.locator('input[name="personDetail.0.[personDetail].fnameNep"]').fill('dipak');
//   await page.getByRole('option', { name: 'दिपक' }).click();