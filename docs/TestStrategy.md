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

## 3. Scope

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

## 4. Test Levels

### UI Tests

Focus on critical user journeys:

- Login
- Product browsing
- Basket/cart management
- Checkout
- Order confirmation

### API Tests

Focus on service behaviour:

- Authentication
- Products
- Basket/cart
- Orders
- Negative responses
- Schema validation

### Accessibility Tests

Focus on key pages:

- Login page
- Product listing page
- Basket page
- Checkout page
- Order confirmation page

### Performance Tests

Focus on lightweight API performance checks:

- Product list endpoint
- Login endpoint
- Checkout/order endpoint

## 5. Test Types

| Test Type      | Tool                         | Purpose                                   |
| -------------- | ---------------------------- | ----------------------------------------- |
| UI functional  | Playwright                   | Validate user journeys                    |
| API functional | Playwright APIRequestContext | Validate backend behaviour                |
| Accessibility  | axe-core/playwright          | Detect accessibility violations           |
| Performance    | k6                           | Validate basic API performance thresholds |
| Reporting      | Allure / HTML / JSON         | Provide execution visibility              |

## 6. Test Data Strategy

- Use deterministic test users where possible
- Generate dynamic data for isolated scenarios
- Avoid shared mutable state between tests
- Prefer API setup for fast and reliable preconditions
- Keep test data builders typed and reusable

## 7. Coding Standards

- TypeScript strict mode enabled
- No `any` type
- No hardcoded waits
- No duplicated selectors
- No business logic inside test files
- Tests must be readable as business scenarios
- Page objects expose user actions, not implementation details
- API clients use typed request and response models

## 8. Reliability Strategy

- Prefer role-based and semantic locators
- Avoid brittle CSS/XPath selectors where possible
- Use API setup instead of long UI setup flows
- Capture screenshots, videos, traces, and logs on failure
- Keep tests independent and parallel-safe
- Use retries only as a safety net, not to hide flaky design

## 9. Reporting Strategy

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

## 10. CI Strategy

Automated tests should run in GitHub Actions.

Suggested pipeline split:

- Pull request: smoke UI + smoke API + accessibility smoke
- Main branch: regression suite
- Manual/nightly: performance checks

## 11. Definition of Done

A test or framework feature is complete when:

- Code is typed and lint-clean
- No `any` type is used
- Tests are independent
- Tests can run locally and in CI
- Failure output is debuggable
- Documentation is updated where relevant
- Commit message follows the agreed convention
