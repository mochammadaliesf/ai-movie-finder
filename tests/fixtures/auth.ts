import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

type AuthCredentials = {
  email: string;
  password: string;
};

type AuthFixtures = {
  loginAs: (credentials?: AuthCredentials) => Promise<void>;
};

const DEFAULT_CREDENTIALS: AuthCredentials = {
  email: 'test@mail.com',
  password: 'MMd4vEwEvDTi8ZZ',
};

const INVALID_EMAIL_CREDENTIALS: AuthCredentials = {
  email: 'invalid@mail.com',
  password: 'MMd4vEwEvDTi8ZZ',
};

const INVALID_PASSWORD_CREDENTIALS: AuthCredentials = {
  email: 'test@mail.com',
  password: 'invalid',
};

/**
 * Extended test with authentication fixtures.
 * Use this in tests that require login in beforeEach.
 * 
 * Example usage:
 * ```
 * import { test, expect } from '../fixtures/auth';
 * 
 * test.describe('Dashboard Tests', () => {
 *   test.beforeEach(async ({ loginAs }) => {
 *     await loginAs(); // Uses default credentials
 *     // Or with custom credentials:
 *     // await loginAs({ email: 'custom@mail.com', password: 'pass123' });
 *   });
 * 
 *   test('should display dashboard', async ({ page }) => {
 *     // User is already logged in
 *   });
 * });
 * ```
 */
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

