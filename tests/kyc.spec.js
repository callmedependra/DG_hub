import { test, expect } from '@playwright/test';
import filePaths from '../utils/filePaths.js';
import testData from '../utils/testData.js';
import { LoginPage } from '../pages/login.page.js';
import { KycStartPage } from '../pages/kycStart.page.js';
import { DocumentPage } from '../pages/document.page.js';
import { AddressPage } from '../pages/address.page.js';
import { FamilyPage } from '../pages/family.page.js';
import { BankPage } from '../pages/bank.page.js';
import { OccupationPage } from '../pages/occupation.page.js';
import { NomineePage } from '../pages/nominee.page.js';

test.describe('@smoke @critical KYC Login & Registration Flow', () => {
  test('Login and complete KYC registration', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const kycStartPage = new KycStartPage(page);
    const documentPage = new DocumentPage(page);
    const addressPage = new AddressPage(page);
    const familyPage = new FamilyPage(page);
    const bankPage = new BankPage(page);
    const occupationPage = new OccupationPage(page);
    const nomineePage = new NomineePage(page);

    try {
      // Login
      await loginPage.goto();
      await loginPage.login(testData.login);
      
      // await page.context().storageState({ path: 'state.json' });

      // KYC Registration
      await kycStartPage.startRegistration();
      // await kycStartPage.ContinueRegistration();
      await kycStartPage.fillPersonalDetails(testData.personalDetails);

      // Document Uploads
      await documentPage.uploadDoc('Signature', [filePaths.filePath]);
      await documentPage.uploadDoubleDoc('Thumb Print', filePaths.leftThumbPath, filePaths.rightThumbPath);
      await documentPage.uploadDoc('Passport Size Photo', [filePaths.filePath]);
      await documentPage.uploadDoubleDoc(
        'Citizenship',
        filePaths.filePath,
        filePaths.filePath,
        async () => {
          await page.getByRole('textbox', { name: 'Citizenship No.' }).fill(testData.citizenship.number);
          await page.getByRole('combobox', { name: 'Citizenship Issued District' }).click();
          await page.getByRole('option', { name: testData.citizenship.issuedDistrict }).click();
          await page.getByRole('button', { name: 'Choose date' }).click();
          await page.getByRole('gridcell', { name: testData.citizenship.issuedDate }).click();
        }
      );
      await documentPage.uploadDoc('Selfie With Document', [filePaths.filePath]);
      await documentPage.clickNext();

      // Address Details
      await addressPage.fillAddress(testData.address, filePaths.filePath);

      // Family Details
      await familyPage.fillFamilyDetails(testData.family);

      // Bank Details
      await bankPage.fillBankDetails(testData.bank);

      // Occupation Details
      await occupationPage.fillOccupation(testData.occupation);

      // Nominee and Final Steps
      await nomineePage.completeNomineeFlow();

      // Verify completion (replace pause with assertion)
      await expect(page).toHaveURL(/detail-verification/);
    } catch (error) {
      console.error('Test failed:', error);
      throw error;
    }
  });
});