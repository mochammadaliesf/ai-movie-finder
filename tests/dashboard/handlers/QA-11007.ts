import { expect } from '@playwright/test';
import { DashboardPage } from '../../pages/dashboard';
import { test } from '../../fixtures/auth';
import { API_BASE } from '../../fixtures/dashboard';

export const QA11007Handler = async ({ page }) => {
  const dashboard = new DashboardPage(page);
  const keyword = 'Horror movie';
  const API_PATH = '/functions/v1/movie-finder';

  await test.step('Verify the history is initially empty', async () => {
    await dashboard.openHistory();
    await dashboard.verifyHistoryEmpty();
    await dashboard.closeHistory();
  });

  await test.step('Perform a search', async () => {
    await dashboard.performSearch(keyword);
    const resp = await page.waitForResponse(
      (r) => r.url().startsWith(`${API_BASE}${API_PATH}`) && r.status() === 200,
      { timeout: 50000 }
    );
    // basic truthy check plus explicit status assert
    expect(resp).toBeTruthy();
    expect(resp.status()).toBe(200);
  });

  await test.step('Verify the history now contains the searched keyword', async () => {
    await dashboard.openHistory();
    await expect(dashboard.historyEmptyState).not.toBeVisible();
    await expect(dashboard.historyButton).toBeVisible();
    await dashboard.verifyHistoryContains(keyword);
    await dashboard.closeHistory();
  });
};
