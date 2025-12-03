import { expect } from '@playwright/test';
import { DashboardPage } from '../../pages/dashboard';
import { test } from '../../fixtures/auth';

export const QA11006Handler = async ({ page }) => {
  const dashboard = new DashboardPage(page);

  await test.step('Ensure History button is visible and enabled', async () => {
    await expect(dashboard.historyButton).toBeVisible();
    await expect(dashboard.historyButton).toBeEnabled();
  });

  await test.step('Open history and verify empty state', async () => {
    await dashboard.openHistory();
    await dashboard.verifyHistoryEmpty();
  });
};
