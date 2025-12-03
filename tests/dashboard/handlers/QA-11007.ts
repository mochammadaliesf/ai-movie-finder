import { expect } from '@playwright/test';
import { DashboardPage } from '../../pages/dashboard';
import { test } from '../../fixtures/auth';

export const QA11007Handler = async ({ page }) => {
  const dashboard = new DashboardPage(page);
  const keyword = 'Horror movie';

  await test.step('Verify the history is initially empty', async () => {
    await dashboard.openHistory();
    await dashboard.verifyHistoryEmpty();
    await dashboard.closeHistory();
  });

  await test.step('Perform a search', async () => {
    await dashboard.performSearch(keyword);
    await page.waitForTimeout(1000); // brief wait for history to be updated
  });

  await test.step('Verify the history now contains the searched keyword', async () => {
    await dashboard.openHistory();
    await expect(dashboard.historyEmptyState).not.toBeVisible();
    await expect(dashboard.historyButton).toBeVisible();
    await dashboard.verifyHistoryContains(keyword);
    await dashboard.closeHistory();
  });
};
