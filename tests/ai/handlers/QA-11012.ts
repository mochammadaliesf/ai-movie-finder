import { expect } from '@playwright/test';
import { DashboardPage } from '../../pages/dashboard';
import { test } from '../../fixtures/auth';
import { API_BASE } from '../../fixtures/dashboard';
import {
  validateAllResults,
  generateValidationSummary,
  VALIDATION_CONFIG,
  type ValidationReport,
} from '../../utils/ai-validation';

async function getResultsWithRetry(
  prompt: string,
  page: any,
  dashboard: any,
  apiPath: string,
  attempts = 1
): Promise<any[]> {
  let lastResults: any[] = [];
  for (let attempt = 1; attempt <= attempts; attempt++) {
    await dashboard.performSearch(prompt);
    try {
      const resp = await page.waitForResponse(
        (r: any) => r.url().startsWith(`${API_BASE}${apiPath}`),
        { timeout: 70000 }
      );
      const body = await resp.json();
      lastResults = body?.result || [];
      if (lastResults.length > 0) return lastResults;
    } catch {
      // Retry on timeout
    }
  }
  return lastResults;
}

function validateSchema(item: any): string | null {
  if (!item) return 'item-missing';
  if (!item.title || typeof item.title !== 'string') return 'title-missing-or-invalid';
  if (!item.description || typeof item.description !== 'string') return 'description-missing-or-invalid';
  if (!item.genre || !Array.isArray(item.genre)) return 'genre-missing-or-invalid';
  if (!item.poster || typeof item.poster !== 'string' || !/^https?:\/\//.test(item.poster)) return 'poster-missing-or-invalid';
  const date = item.release_date || item.year || item.releaseYear;
  if (!date || (typeof date !== 'string' && typeof date !== 'number')) return 'year-missing-or-invalid';
  return null;
}

function assertValidationReport(report: ValidationReport): void {
  console.log('\n' + generateValidationSummary(report));

  expect(report.totalResults, 'Should return at least 1 result').toBeGreaterThan(0);

  const failedItems = report.validations.filter(v => !v.passed);
  const failedSummary = failedItems.map(f => {
    const factors = f.scores.factors;
    return `"${f.title}" (${factors.matchedFactors}/${factors.totalFactors})`;
  }).join(', ');

  expect(
    report.passRate,
    `Pass rate: ${(report.passRate * 100).toFixed(1)}% (required: ${(VALIDATION_CONFIG.PASS_RATE_THRESHOLD * 100).toFixed(0)}%). Failed: ${failedSummary || 'none'}`
  ).toBeGreaterThanOrEqual(VALIDATION_CONFIG.PASS_RATE_THRESHOLD);
}

export async function QA11012ValidPromptMatches({ page }: { page: any }) {
  const dashboard = new DashboardPage(page);
  const prompt = 'romantic film from middle-east with 60 that have a sense of humor';
  const API_PATH = '/functions/v1/movie-finder';
  let results: any[] = [];

  await test.step('Ensure search UI is visible', async () => {
    await dashboard.verifySearchVisible();
  });

  await test.step('Perform search and retrieve results', async () => {
    results = await getResultsWithRetry(prompt, page, dashboard, API_PATH, 2);
    expect(Array.isArray(results), 'Results must be an array').toBeTruthy();
    expect(results.length, 'Expected at least 1 result').toBeGreaterThan(0);
  });

  await test.step('Validate response schema', async () => {
    const schemaErrors = results
      .map((r: any, i: number) => ({ i, err: validateSchema(r) }))
      .filter((x: any) => x.err);
    expect(schemaErrors.length, schemaErrors.length > 0 ? `Schema errors: ${JSON.stringify(schemaErrors)}` : undefined).toBe(0);

    const titles = results.map((r: any) => (r.title || '').toString().trim());
    expect(new Set(titles).size, 'Duplicate titles found').toBe(titles.length);
  });

  await test.step('Validate AI response relevance', async () => {
    const report = validateAllResults(results, prompt);
    assertValidationReport(report);
  });
}

export async function QA11012InvalidPromptMatches({ page }: { page: any }) {
  const dashboard = new DashboardPage(page);
  const prompt = 'best pasta recipe with tomato sauce and garlic';
  const API_PATH = '/functions/v1/movie-finder';

  await test.step('Ensure search UI is visible', async () => {
    await dashboard.verifySearchVisible();
  });

  await test.step('Validate no false matches for invalid prompt', async () => {
    const results = await getResultsWithRetry(prompt, page, dashboard, API_PATH, 2);

    if (!Array.isArray(results) || results.length === 0) {
      return;
    }

    const report = validateAllResults(results, prompt);
    console.log('\n' + generateValidationSummary(report));

    expect(
      report.passRate,
      `Unexpected matches for invalid prompt: ${report.validations.filter(v => v.passed).map(f => `"${f.title}"`).join(', ')}`
    ).toBeLessThan(0.3);
  });
}
