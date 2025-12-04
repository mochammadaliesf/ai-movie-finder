import { test } from '../fixtures/auth';
import { DashboardPage } from '../pages/dashboard';
import { QA11004Handler } from './handlers/QA-11004';
import { QA11005Handler } from './handlers/QA-11005';
import { QA11006Handler } from './handlers/QA-11006';
import { QA11007Handler } from './handlers/QA-11007';
import { QA11008EmptyPrompt, QA11008ValidPrompt, QA11008LongPrompt } from './handlers/QA-11008';

const TEST_TAGS = {
  dashboard: '@dashboard',
  p0: '@p0',
  p1: '@p1',
};

test.describe('Dashboard Tests', () => {
  test.beforeEach(async ({ loginAs }) => {
    // Log in using the shared fixture helper
    await loginAs();
  });

  test('[QA-11004] Verify The Dashboard Loads Successfully',
    { tag: [TEST_TAGS.dashboard, TEST_TAGS.p0] },
    QA11004Handler
  );

  test(
    '[QA-11005] Verify the Log Out Button Functionality',
    { tag: [TEST_TAGS.dashboard, TEST_TAGS.p1] },
    QA11005Handler
  );

  test(
    '[QA-11006] Verify new Login Session Won\'t Have the History',
    { tag: [TEST_TAGS.dashboard, TEST_TAGS.p1] },
    QA11006Handler
  );

  test(
    '[QA-11007] - Dashboard - Verify User Searches are saved in History',
    { tag: [TEST_TAGS.dashboard, TEST_TAGS.p1] },
    QA11007Handler
  );

  test.describe('[QA-11008] Search Prompt Input Validation', () => {
    test(
    'Empty Prompt',
    { tag: [TEST_TAGS.dashboard, TEST_TAGS.p1] },
    QA11008EmptyPrompt
    );

    test(
    'Valid Prompt',
    { tag: [TEST_TAGS.dashboard, TEST_TAGS.p1] },
    QA11008ValidPrompt
    );

    test(
    'Long Input Prompt',
    { tag: [TEST_TAGS.dashboard, TEST_TAGS.p1] },        QA11008LongPrompt
    );
  });
});
