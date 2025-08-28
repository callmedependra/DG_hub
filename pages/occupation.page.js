import { BasePage } from '../utils/basePage';

export class OccupationPage extends BasePage {
  async fillOccupation({
    sector,
    organization,
    address,
    employeeId,
    designation,
    effectiveDate,
    financialDetails,
    incomeSource,
  }) {
    await this.waitForURL('occupation-details');

    await this.page.getByRole('button', { name: 'Open' }).first().click();
    await this.page.getByRole('option', { name: sector }).click();

    await this.page.getByRole('textbox', { name: 'Organization Name' }).fill(organization);
    await this.page.getByRole('textbox', { name: 'Address' }).fill(address);
    await this.page.getByRole('textbox', { name: 'Employee ID' }).fill(employeeId);
    await this.page.getByRole('textbox', { name: 'Designation' }).fill(designation);

    await this.page.getByRole('button', { name: 'Choose date' }).click();
    await this.page.getByRole('button', { name: 'Previous month' }).click();
    await this.page.getByRole('gridcell', { name: effectiveDate, exact: true }).click();

    await this.page.getByRole('combobox', { name: 'Financial Details' }).click();
    await this.page.getByRole('option', { name: financialDetails }).click();

    await this.page.getByText(incomeSource).click();
    await this.clickNext();
  }
}