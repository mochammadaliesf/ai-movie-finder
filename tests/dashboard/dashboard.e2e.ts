import { test } from '../fixtures/auth';
import { DashboardPage } from '../pages/dashboard';
import { QA11004Handler } from './handlers/QA-11004';
import { QA11005Handler } from './handlers/QA-11005';
import { QA11006Handler } from './handlers/QA-11006';
import { QA11007Handler } from './handlers/QA-11007';

const TEST_TAGS = {
  dashboard: '@dashboard',
  p0: '@p0',
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
    { tag: [TEST_TAGS.dashboard, TEST_TAGS.p0] },
    QA11005Handler
  );

  test(
    '[QA-11006] Verify new Login Session Won\'t Have the History',
    { tag: [TEST_TAGS.dashboard, TEST_TAGS.p0] },
    QA11006Handler
  );

  test(
    '[QA-11007] - Dashboard - Verify User Searches are saved in History',
    { tag: [TEST_TAGS.dashboard, TEST_TAGS.p0] },
    QA11007Handler
  );
});
