import { expect } from '@playwright/test';
import { DashboardPage } from '../../pages/dashboard';
import { test } from '../../fixtures/auth';

export const QA11005Handler = async ({ page }) => {
  const dashboard = new DashboardPage(page);

  await test.step('Click logout', async () => {
    await dashboard.logoutButton.click();
  });

  await test.step('Assert redirect to login page', async () => {
    await page.waitForURL(/\/login/, { timeout: 10000 });
    await expect(page.getByText('Sign in to your account')).toBeVisible();
  });
};
