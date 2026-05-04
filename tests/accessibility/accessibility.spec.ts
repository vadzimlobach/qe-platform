import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe(
  "@accessibility accessibility smoke checks",
  { tag: ["@ui", "@accessibility", "@smoke"] },
  () => {
    test("login page has no critical or serious accessibility violations", async ({
      page,
    }) => {
      await page.goto("/");

      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa"])
        .analyze();

      const seriousViolations = results.violations.filter((violation) =>
        ["critical", "serious"].includes(violation.impact ?? ""),
      );

      expect(seriousViolations).toEqual([]);
    });
  },
);
