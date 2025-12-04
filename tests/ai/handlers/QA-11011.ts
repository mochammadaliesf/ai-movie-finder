import { expect } from '@playwright/test';
import { DashboardPage } from '../../pages/dashboard';
import { test } from '../../fixtures/auth';
import { API_BASE } from '../../fixtures/dashboard';


export async function QA11011UnsupportedPrompt({ page }: { page: any }) {
  const dashboard = new DashboardPage(page);
  const API_PATH = '/functions/v1/movie-finder';
  const inputs = '@@{}[]~~~~~';

  await test.step('Verify unsupported prompts show no-results message', async () => {
    await dashboard.performSearch(inputs);
      // expect a no-results message in the UI
    const resp = await page.waitForResponse(
          (r) => r.url().startsWith(`${API_BASE}${API_PATH}`) && r.status() === 200,
          { timeout: 50000 }
        );
    
    await expect(page.getByText('No movie found matching')).toBeVisible();
  });
}
