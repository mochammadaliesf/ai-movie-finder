import { expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

export const QA11001Handler = async ({ page }) => {
  const loginPage = new LoginPage(page);

  // Navigate to login page
  await loginPage.navigateToLogin();

  // Test Step 1: Verify Email and Password input fields are displayed correctly
  await loginPage.verifyEmailFieldVisible();
  await loginPage.verifyPasswordFieldVisible();

  // Test Step 2: Verify the Sign In button is visible and enabled
  await loginPage.verifySignInButtonVisible();
  await loginPage.verifySignInButtonEnabled();

  // Test Step 3: Enter valid credentials and verify password is masked
  await loginPage.fillEmail('test@mail.com');
  await loginPage.fillPassword('MMd4vEwEvDTi8ZZ');
  await loginPage.verifyPasswordIsMasked();

  // Test Step 4: Click Sign In and verify successful authentication
  await loginPage.clickSignIn();

  // Wait for navigation and verify user is redirected to dashboard or landing page
  await page.waitForURL(/\/(dashboard|home|$)/, { timeout: 10000 });

  // Verify user is no longer on login page
  expect(page.url()).not.toContain('/login');
};
