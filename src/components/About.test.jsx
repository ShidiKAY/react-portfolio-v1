/* eslint-disable no-undef */
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import About from "./About";
import { axe, toHaveNoViolations } from "jest-axe";
import { renderWithProviders } from "../test-utils";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: { changeLanguage: () => new Promise(() => {}) },
  }),
}));

expect.extend(toHaveNoViolations);

describe("About", () => {
  it("renders About section", () => {
    renderWithProviders(<About />);
    // Check for a heading or some expected text
    expect(
      screen.getByText(/experience|expérience|web development/i)
    ).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = renderWithProviders(<About />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
