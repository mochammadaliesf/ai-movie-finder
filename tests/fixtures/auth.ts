import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login';

type AuthCredentials = {
  email: string;
  password: string;
};

type AuthFixtures = {
  loginAs: (credentials?: AuthCredentials) => Promise<void>;
};

export const DEFAULT_CREDENTIALS: AuthCredentials = {
  email: 'test@mail.com',
  password: 'MMd4vEwEvDTi8ZZ',
};

export const INVALID_EMAIL_CREDENTIALS: AuthCredentials = {
  email: 'invalid@mail.com',
  password: 'MMd4vEwEvDTi8ZZ',
};

export const INVALID_PASSWORD_CREDENTIALS: AuthCredentials = {
  email: 'test@mail.com',
  password: 'invalid',
};

export const test = base.extend<AuthFixtures>({
  loginAs: async ({ page }, use) => {
    const loginAs = async (credentials?: AuthCredentials) => {
      const { email, password } = credentials || DEFAULT_CREDENTIALS;
      const loginPage = new LoginPage(page);
      await loginPage.navigateToLogin();
      await loginPage.login(email, password);
      // Wait for successful login redirect
      await page.waitForURL(/\/(dashboard|home|$)/, { timeout: 10000 });
    };

    await use(loginAs);
  },
});

export { expect } from '@playwright/test';


