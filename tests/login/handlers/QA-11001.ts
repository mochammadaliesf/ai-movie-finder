import { expect } from '@playwright/test';
import { LoginPage } from '../../pages/login';
import { DEFAULT_CREDENTIALS } from '../../fixtures/auth';
import { test } from '../../fixtures/auth';

export const QA11001Handler = async ({ page }) => {
  const loginPage = new LoginPage(page);

  await test.step('Navigate to Login page', async () => {
    await loginPage.navigateToLogin();
  });

  await test.step('Verify input fields and Sign In button', async () => {
    await loginPage.verifyEmailFieldVisible();
    await loginPage.verifyPasswordFieldVisible();
    await loginPage.verifySignInButtonVisible();
    await loginPage.verifySignInButtonEnabled();
  });

  await test.step('Fill credentials and sign in', async () => {
    await loginPage.fillEmail(DEFAULT_CREDENTIALS.email);
    await loginPage.fillPassword(DEFAULT_CREDENTIALS.password);
    await loginPage.verifyPasswordIsMasked();
    await loginPage.clickSignIn();
  });

  await test.step('Verify successful login redirect', async () => {
    await page.waitForTimeout(5000);
    await expect(page.url()).not.toContain('/login');
    await expect(page.getByText('Search for a movie to get started!')).toBeVisible();
  });
};
