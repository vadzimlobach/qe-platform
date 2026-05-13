import { test, expect } from "../../framework/fixtures/test.fixture";

test.describe(
  "@accessibility accessibility smoke checks",
  { tag: ["@ui", "@accessibility"] },
  () => {
    test("login page has no critical or serious accessibility violations", async ({
      loginPage,
      axeBuilder,
    }) => {
      await loginPage.open();

      const results = await axeBuilder.analyze();

      const violations = results.violations.filter((violation) =>
        ["critical", "serious"].includes(violation.impact ?? ""),
      );

      expect(violations).toEqual([]);
    });

    test.skip("inventory page has no critical or serious accessibility violations", async ({
      loginPage,
      inventoryPage,
      axeBuilder,
      uiUserFactory,
    }) => {
      await loginPage.open();
      await loginPage.login(await uiUserFactory.createUser("standard"));

      await inventoryPage.expectLoaded();

      const results = await axeBuilder.analyze();

      const violations = results.violations.filter((violation) =>
        ["critical", "serious"].includes(violation.impact ?? ""),
      );

      expect(violations).toEqual([]);
    });
  },
);
