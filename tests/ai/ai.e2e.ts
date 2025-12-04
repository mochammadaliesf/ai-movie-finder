import { test } from '../fixtures/auth';
import { QA11010ResponseTime } from './handlers/QA-11010';
import { QA11011UnsupportedPrompt } from './handlers/QA-11011';
import { QA11012ValidPromptMatches, QA11012InvalidPromptMatches } from './handlers/QA-11012';

const TEST_TAGS = {
  ai: '@ai',
  p1: '@p1',
};

test.describe('AI Tests', () => {
  test.beforeEach(async ({ loginAs }) => {
    await loginAs();
  });

  test(
    '[QA-11010] - AI - Response Time Threshold',
    { tag: [TEST_TAGS.ai, TEST_TAGS.p1] },
    QA11010ResponseTime
  );

  test(
    '[QA-11011] - AI - Unsupported Prompt (Query Handling)',
    { tag: [TEST_TAGS.ai, TEST_TAGS.p1] },
    QA11011UnsupportedPrompt
  );


  test.describe('[QA-11012] - AI - Response Matches Prompt', () => {
    test(
        '[QA-11012] - AI - Valid Prompt Matches',
        { tag: [TEST_TAGS.ai, TEST_TAGS.p1] },
        QA11012ValidPromptMatches
    );

    test(
        '[QA-11012] - AI - Invalid Prompt Matches',
        { tag: [TEST_TAGS.ai, TEST_TAGS.p1] },
        QA11012InvalidPromptMatches
    );
    });

});
