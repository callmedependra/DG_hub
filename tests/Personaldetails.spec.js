import { test, expect } from "@playwright/test";
import testData from "../utils/testData";
import { LoginPage } from "../pages/login.page";
import { KycStartPage } from "../pages/kycStart.page";

test.describe("@critical KYC Personal Details", () => {
  test("Negative personal details Scenarios", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const kycStartPage = new KycStartPage(page);

    try {
      // Step 1: Login
      await loginPage.goto();
      await loginPage.login(testData.login);

      // Step 2: Go to personal details form
      // await kycStartPage.goto();
      await kycStartPage.startRegistration();

      // Step 3: Negative scenarios
      const invalidScenarios = [
        { ...testData.invalidPersonalDetails.missingFirstName, expectedError: "First Name is required" },
        { ...testData.invalidPersonalDetails.missingLastName, expectedError: "Last Name is required" },
        { ...testData.invalidPersonalDetails.missingDOB, expectedError: "Date of Birth is required" },
        { ...testData.invalidPersonalDetails.missingGender, expectedError: "Gender is required" },
        { ...testData.invalidPersonalDetails.missingCountry, expectedError: "Country is required" },
      ];

      await kycStartPage.personalDetailsExpectFailSequence(invalidScenarios);
    } catch (error) {
      console.error(" Negative personal details test failed:", error);
      throw error;
    }
  });
});
