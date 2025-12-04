import { expect } from '@playwright/test';
import { DashboardPage } from '../../pages/dashboard';
import { test } from '../../fixtures/auth';

// Empty prompt
export async function QA11008EmptyPrompt({ page }: { page: any }) {
  const dashboard = new DashboardPage(page);

  await test.step('Ensure search UI is visible', async () => {
    await dashboard.verifySearchVisible();
  });

  await test.step('Leave AI Prompt empty and assert Search remains disabled', async () => {
    await dashboard.searchInput.fill('');
    await expect(dashboard.searchButton).toBeDisabled();
  });
}

// Valid prompt
export async function QA11008ValidPrompt({ page }: { page: any }) {
  const dashboard = new DashboardPage(page);
  const validQuery = 'local history from indonesia';

  await test.step('Ensure search UI is visible', async () => {
    await dashboard.verifySearchVisible();
  });

  await test.step('Fill a valid prompt and assert Search is enabled and clickable', async () => {
    await dashboard.searchInput.fill(validQuery);
    await expect(dashboard.searchButton).toBeEnabled();

    await dashboard.performSearch(validQuery);
    await page.waitForTimeout(1000);
  });
}

// Long prompt
export async function QA11008LongPrompt({ page }: { page: any }) {
  const dashboard = new DashboardPage(page);
  const longInput = 'x'.repeat(210);

  await test.step('Ensure search UI is visible', async () => {
    await dashboard.verifySearchVisible();
  });

  await test.step('Fill a long prompt (200+ chars) and assert Search behavior', async () => {
    await dashboard.searchInput.fill(longInput);
    await expect(dashboard.searchButton).toBeEnabled();

    await dashboard.searchButton.click();
    await page.waitForTimeout(1000);
  });
}
