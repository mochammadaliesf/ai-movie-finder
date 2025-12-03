import { expect } from '@playwright/test';
import { LoginPage } from '../../pages/login';
import { test } from '../../fixtures/auth';
import {
  INVALID_EMAIL_CREDENTIALS,
  INVALID_PASSWORD_CREDENTIALS,
} from '../../fixtures/auth';

// Individual scenario functions are exported below and registered as separate tests.

export async function QA11002InvalidEmail({ page }: { page: any }) {
  const loginPage = new LoginPage(page);
  await test.step('Navigate to Login page', async () => {
    await loginPage.navigateToLogin();
  });
  await test.step('Enter invalid email and valid password', async () => {
    await loginPage.fillEmail(INVALID_EMAIL_CREDENTIALS.email);
    await loginPage.fillPassword(INVALID_EMAIL_CREDENTIALS.password);
    await loginPage.clickSignIn();
  });
  await test.step('Assert authentication error', async () => {
    await expect(
      page.getByText(/The email or password is invalid\.?|Invalid login credentials/i)
    ).toBeVisible();
  });
}

export async function QA11002InvalidPassword({ page }: { page: any }) {
  const loginPage = new LoginPage(page);
  await test.step('Navigate to Login page', async () => {
    await loginPage.navigateToLogin();
  });
  await test.step('Enter valid email and invalid password', async () => {
    await loginPage.fillEmail(INVALID_PASSWORD_CREDENTIALS.email);
    await loginPage.fillPassword(INVALID_PASSWORD_CREDENTIALS.password + 'ZZZZ');
    await loginPage.clickSignIn();
  });
  await test.step('Assert authentication error', async () => {
    await expect(
      page.getByText(/The email or password is invalid\.?|Invalid login credentials/i)
    ).toBeVisible();
  });
}

export async function QA11002EmptyCredentials({ page }: { page: any }) {
  const loginPage = new LoginPage(page);
  await test.step('Navigate to Login page', async () => {
    await loginPage.navigateToLogin();
  });
  await test.step('Leave credentials empty and submit', async () => {
    await loginPage.fillEmail('');
    await loginPage.fillPassword('');
    await loginPage.clickSignIn();
  });
  await test.step('Assert field-level validation messages', async () => {
    await expect(page.getByText(/This field is required\.?/i).first()).toBeVisible();
  });
}
