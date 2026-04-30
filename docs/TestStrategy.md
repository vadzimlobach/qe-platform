# Test Strategy

## 1. Purpose

This document defines the test strategy for a production-style Playwright + TypeScript quality engineering framework.

The goal is to demonstrate a scalable, maintainable, and realistic approach to automated testing across UI, API, accessibility, and performance layers.

## 2. Quality Objectives

- Validate critical user journeys through UI automation
- Verify business logic and service behaviour through API automation
- Detect accessibility issues early using automated checks
- Provide lightweight performance coverage for key API flows
- Support fast feedback through CI execution
- Maintain clean, typed, readable, and reusable test code

## 3. System Under Test

### Primary UI SUT

The primary UI system under test is SauceDemo, a demo e-commerce web application used to validate realistic customer journeys such as login, product browsing, cart management, checkout, and order confirmation.

### Accessibility SUT

Accessibility testing targets the same SauceDemo pages used by the critical UI journeys. Automated checks are performed using axe-core with additional keyboard and semantic validation where appropriate.

### API SUT

SauceDemo does not expose a dedicated public business API for the shop workflow. To demonstrate API automation patterns cleanly, this project uses a local mock API that models typical e-commerce services: authentication, products, cart, and orders.
API layer is introduced to demonstrate scalable test architecture, typed clients, and contract validation independent of UI limitations.

### Performance SUT

Performance testing is intentionally lightweight. The project validates basic page responsiveness for SauceDemo and basic API performance thresholds against the local mock API. Large-scale load testing is out of scope.

## 4. Scope

### In Scope

- UI end-to-end tests
- API functional tests
- API schema validation
- Accessibility smoke tests
- Basic API performance checks
- Test reporting
- CI execution
- Docker-based execution

### Out of Scope

- Full cross-browser certification
- Full WCAG manual audit
- Large-scale load testing
- Security penetration testing
- Production monitoring

## 5. Test Levels

### UI Tests

Focus on critical user journeys:

- Login
- Inventory/products
- Product details
- Cart
- Checkout information
- Checkout overview
- Order confirmation
- Menu/logout

### API Tests

Focus on service behaviour:

- Authentication
- Products
- Cart
- Orders
- Negative responses
- Schema validation

### Accessibility Tests

Focus on key pages:

- Login page
- Inventory page
- Product details page
- Cart page
- Checkout information page
- Checkout overview page
- Order confirmation page

Accessibility checks:

- axe critical/serious violations
- Accessible names for buttons/links
- Form labels
- Keyboard navigation
- Focus visibility
- Error message accessibility
- Heading structure

### Performance Tests

Focus on lightweight API performance checks:

Page load performance
Critical journey timing
Basic response availability

Performance checks

- Login page loads within threshold
- Inventory page loads within threshold
- Cart page loads within threshold
- Checkout flow completes within threshold

## 6. Test Types

| Test Type      | Tool                         | Purpose                                                           |
| -------------- | ---------------------------- | ----------------------------------------------------------------- |
| UI functional  | Playwright                   | Validate user journeys                                            |
| API functional | Playwright APIRequestContext | Validate backend behaviour                                        |
| Accessibility  | axe-core/playwright          | Detect accessibility violations                                   |
| Performance    | Playwright timings / k6      | Validate page responsiveness and basic API performance thresholds |
| Reporting      | Allure / HTML / JSON         | Provide execution visibility                                      |

## 7. Test Data Strategy

- Use deterministic test users where possible
- Generate dynamic data for isolated scenarios
- Avoid shared mutable state between tests
- Prefer API setup for fast and reliable preconditions
- Keep test data builders typed and reusable

## 8. Test Selection Strategy

Tests are grouped using tags to support targeted execution:

- `@smoke` for critical PR checks
- `@regression` for broader functional coverage
- `@api` for API-level tests
- `@accessibility` for accessibility checks
- `@performance` for performance checks

## 9. Risks and Mitigations

| Risk                            | Mitigation                                                                    |
| ------------------------------- | ----------------------------------------------------------------------------- |
| SauceDemo availability issues   | Keep tests focused, add clear failure diagnostics, avoid excessive execution  |
| UI locator changes              | Prefer semantic locators and centralised page objects                         |
| Flaky tests                     | Avoid hardcoded waits, use Playwright auto-waiting, isolate test data         |
| Mock API divergence from UI app | Document API as architecture demonstration, not SauceDemo backend replacement |
| Overengineering                 | Keep framework features driven by test needs                                  |

## 10. Coding Standards

- TypeScript strict mode enabled
- No `any` type
- No hardcoded waits
- No duplicated selectors
- No business logic inside test files
- Tests must be readable as business scenarios
- Page objects expose user actions, not implementation details
- API clients use typed request and response models

## 11. Reliability Strategy

- Prefer role-based and semantic locators
- Avoid brittle CSS/XPath selectors where possible
- Use API setup instead of long UI setup flows
- Capture screenshots, videos, traces, and logs on failure
- Keep tests independent and parallel-safe
- Use retries only as a safety net, not to hide flaky design

## 12. Reporting Strategy

Reports should support both technical debugging and stakeholder visibility.

Planned reports:

- Playwright HTML report
- Allure report
- JSON report for future metrics processing

Key metrics:

- Pass/fail rate
- Execution duration
- Failed test categories
- Flaky tests
- Slowest tests

## 13. CI Strategy

Automated tests should run in GitHub Actions.

Suggested pipeline split:

- Pull request: smoke UI + smoke API + accessibility smoke
- Main branch: regression suite
- Manual/nightly: performance checks

## 14. Definition of Done

A test or framework feature is complete when:

- Code is typed and lint-clean
- No `any` type is used
- Tests are independent
- Tests can run locally and in CI
- Failure output is debuggable
- Documentation is updated where relevant
- Commit message follows the agreed convention: `feat`, `fix`, `refactor`, `test`, `docs`, `ci`, or `build`
