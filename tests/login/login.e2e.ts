import { test } from '@playwright/test';
import { QA11001Handler } from './handlers/QA-11001';

const TEST_TAGS = {
  login: '@login',
  p0: '@p0',
  smoke: '@smoke',
};

test.describe('Login Tests', () => {
  test(
    '[QA-11001] - Login - Verify the user is able to log in with valid credentials',
    { tag: [TEST_TAGS.login, TEST_TAGS.p0, TEST_TAGS.smoke] },
    QA11001Handler
  );
});
