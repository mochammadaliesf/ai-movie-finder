# AI Movie Finder - E2E Test Suite

End-to-end test automation for the AI Movie Finder application using Playwright.

**Application URL:** https://movie-finder-d128b.web.app/

## Tech Stack

- **Playwright** v1.57.0
- **TypeScript**
- **Node.js**

## Architecture & Patterns

### Page Object Model (POM)
All page interactions are encapsulated in page classes under `tests/pages/`. This provides:
- Single source of truth for element locators
- Reusable page methods
- Easy maintenance when UI changes

### Handler Pattern
Each test case (QA-ID) has its own handler file under `tests/<module>/handlers/`. Benefits:
- One file per test case for traceability
- Easy to link with test management systems (Jira, TestRail)
- Clean separation of test logic

### Fixtures
Shared setup utilities under `tests/fixtures/`:
- `auth.ts` - Authentication fixture with `loginAs()` helper
- `dashboard.ts` - Dashboard-related constants and utilities

### AI Validation Utilities
Custom validation framework under `tests/utils/ai-validation.ts` for detecting AI hallucination:
- **2-out-of-3 Factor Rule**: Genre, Year, Region validation
- Extracts intent from prompts (genres, year range, regions)
- Validates AI responses against user intent

## Project Structure

```
tests/
├── fixtures/
│   ├── auth.ts                 # Authentication fixture
│   └── dashboard.ts            # Dashboard utilities
│
├── pages/
│   ├── login.ts                # Login page object
│   └── dashboard.ts            # Dashboard page object
│
├── utils/
│   └── ai-validation.ts        # AI hallucination detection
│
├── login/
│   ├── handlers/
│   │   ├── QA-11001.ts         # Valid login
│   │   └── QA-11002.ts         # Invalid login scenarios
│   └── login.e2e.ts            # Login test specs
│
├── dashboard/
│   ├── handlers/
│   │   ├── QA-11004.ts         # Dashboard loads
│   │   ├── QA-11005.ts         # Logout functionality
│   │   ├── QA-11006.ts         # Session history
│   │   ├── QA-11007.ts         # Search history
│   │   └── QA-11008.ts         # Input validation
│   └── dashboard.e2e.ts        # Dashboard test specs
│
└── ai/
    ├── handlers/
    │   ├── QA-11010.ts         # Response time
    │   ├── QA-11011.ts         # Unsupported prompts
    │   └── QA-11012.ts         # AI hallucination detection
    └── ai.e2e.ts               # AI test specs
```

## Test Cases

### Login Module
| ID | Test Case | Priority |
|----|-----------|----------|
| QA-11001 | Log in with Valid Credentials | P0 |
| QA-11002 | Log in with Invalid Email | P1 |
| QA-11002 | Log in with Invalid Password | P1 |
| QA-11002 | Log in with Empty Credentials | P1 |

### Dashboard Module
| ID | Test Case | Priority |
|----|-----------|----------|
| QA-11004 | Verify Dashboard Loads Successfully | P0 |
| QA-11005 | Verify Log Out Button Functionality | P1 |
| QA-11006 | Verify New Session Has No History | P1 |
| QA-11007 | Verify Searches Saved in History | P1 |
| QA-11008 | Search Input Validation (Empty/Valid/Long) | P1 |

### AI Module
| ID | Test Case | Priority |
|----|-----------|----------|
| QA-11010 | AI Response Time Threshold | P1 |
| QA-11011 | Unsupported Prompt Handling | P1 |
| QA-11012 | AI Response Matches Prompt (Valid) | P1 |
| QA-11012 | AI Response Matches Prompt (Invalid) | P1 |

## Test Tags

| Tag | Description |
|-----|-------------|
| `@login` | Login module tests |
| `@dashboard` | Dashboard module tests |
| `@ai` | AI module tests |
| `@p0` | Critical priority (smoke tests) |
| `@p1` | High priority |
| `@smoke` | Smoke test suite |

## Installation

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

## Running Tests

```bash
# Run all tests
npx playwright test

# Run with UI mode
npx playwright test --ui


## AI Hallucination Detection

The `QA-11012` test validates AI responses using a **2-out-of-3 factor rule**:

1. **Genre Factor** - At least one genre matches (direct or related)
2. **Year Factor** - Release year within expected range
3. **Region Factor** - Country/region matches prompt intent

An item passes if **2+ factors match**. The test passes if **70%+ of items pass**.

Example:
```
Prompt: "romantic film from middle-east with 60s"
Expected: Genres=[Romance, Comedy] Year=1960-1969 Regions=[middle-east]

✓ "A Separation" [2/3] Drama (→Romance related) | 2011 | Iran ✓
✗ "Space Cowboys" [1/3] Comedy | 2000 | USA
```
