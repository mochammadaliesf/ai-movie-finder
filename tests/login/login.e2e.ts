import { test } from '@playwright/test';
import { QA11001Handler } from './handlers/QA-11001';
import {
  QA11002InvalidEmail,
  QA11002InvalidPassword,
  QA11002EmptyCredentials,
} from './handlers/QA-11002';

const TEST_TAGS = {
  login: '@login',
  p0: '@p0',
  p1: '@p1',
  smoke: '@smoke',
};


test(
    '[QA-11001] - Log in with Valid Credentials',
    { tag: [TEST_TAGS.login, TEST_TAGS.p0, TEST_TAGS.smoke] },
    QA11001Handler
  );

test.describe('[QA-11002] - Log in with an Invalid Credentials', () => {

  test('Invalid Email', 
    { tag: [TEST_TAGS.login, TEST_TAGS.p1] }, 
    QA11002InvalidEmail
  );
  test('Invalid Password',
    { tag: [TEST_TAGS.login, TEST_TAGS.p1] },
    QA11002InvalidPassword
  );
  test(
    'Empty Credentials',
    { tag: [TEST_TAGS.login, TEST_TAGS.p1] },
    QA11002EmptyCredentials
  );
});
