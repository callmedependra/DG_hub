// tests/login.spec.js
import { test, expect } from '@playwright/test';
import filePaths from '../utils/filePaths.js';
import testData from '../utils/testData.js';
import { LoginPage } from '../pages/login.page.js';

test.describe('@smoke @critical KYC Login', () => {
  test(' Negative Login Scenarios', async ({ page }) => {
    const loginPage = new LoginPage(page);

    try {
      await loginPage.goto();

      const invalidScenarios = [
        {
          ...testData.invalidLogin.missingEmail,
          expectedError: "Email is required",
        },
        {
          ...testData.invalidLogin.missingPassword,
          expectedError: "Password is required",
        },
        {
          ...testData.invalidLogin.missingCaptcha,
          expectedError: "Captcha is required",
        },
        {
          ...testData.invalidLogin.invalidEmailFormat,
          expectedError: "Enter valid email",
        },
      ];

      await loginPage.loginExpectFailSequence(invalidScenarios);
    } catch (error) {
      console.error(' Negative login tests failed:', error);
      throw error;
    }
  });

   test(' Successful Login', async ({ page }) => {
    const loginPage = new LoginPage(page);

    try {
      await loginPage.goto();
      await loginPage.login(testData.login); // from testData.js

      // Verify URL or some dashboard element
      await expect(page).toHaveURL(/.*kyc\/home/);
    } catch (error) {
      console.error(' Login test failed:', error);
      throw error;
    }
  });
});
