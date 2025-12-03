import { expect } from '@playwright/test';
import { DashboardPage } from '../../pages/dashboard';
import { test } from '../../fixtures/auth';

export const QA11004Handler = async ({ page }) => {
  const dashboard = new DashboardPage(page);

  await test.step('Verify header/banner is visible', async () => {
    await dashboard.verifyHeaderVisible();
  });

  await test.step('Verify search module is visible and search button disabled', async () => {
    await dashboard.verifySearchVisible();
    await dashboard.verifySearchButtonDisabled();
  });

  await test.step('Verify navbar menus are visible', async () => {
    await dashboard.verifyNavbarButtons();
  });
};
