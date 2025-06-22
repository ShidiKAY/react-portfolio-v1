/* eslint-disable no-undef */
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SkillsModern from "./SkillsModern";
import { axe, toHaveNoViolations } from "jest-axe";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: { changeLanguage: () => new Promise(() => {}) },
  }),
}));

expect.extend(toHaveNoViolations);

describe("SkillsModern", () => {
  it("renders category filter buttons", () => {
    render(<SkillsModern />);
    // Check for at least one category button
    expect(
      screen.getByRole("button", { name: /all|tous/i })
    ).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<SkillsModern />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
