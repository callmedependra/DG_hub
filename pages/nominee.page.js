import { BasePage } from '../utils/basePage';

export class NomineePage extends BasePage {
  async completeNomineeFlow() {
    await this.waitForURL('nominee-details');
    await this.clickNext();

    await this.waitForURL('bo-details');
    await this.clickNext();

    await this.waitForURL('detail-verification');
    await this.clickNext();
  }
}