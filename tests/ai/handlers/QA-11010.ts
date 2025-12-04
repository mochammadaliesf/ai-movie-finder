import { DashboardPage } from '../../pages/dashboard';
import { test } from '../../fixtures/auth';
import { API_BASE } from '../../fixtures/dashboard';

export async function QA11010ResponseTime({ page }: { page: any }) {
  const dashboard = new DashboardPage(page);
  const prompt = 'Recommend classic Indonesian films ';
  const API_PATH = '/functions/v1/movie-finder';

  await test.step('Perform AI prompt search and measure response time', async () => {
      // trigger the search
      await dashboard.performSearch(prompt);
      try {
        const resp = await page.waitForResponse(
          (r) => r.url().startsWith(`${API_BASE}${API_PATH}`),
          { timeout: 7000 }
        );
        if (!resp) throw new Error('No response within 7 seconds');
      } catch (err) {
        throw new Error('No response within 7 seconds');
      }
    });
}
