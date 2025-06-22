/* eslint-disable no-undef */
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Navbar from "./Navbar";
import { axe, toHaveNoViolations } from "jest-axe";
import { renderWithProviders } from "../test-utils";

expect.extend(toHaveNoViolations);

describe("Navbar", () => {
  it("renders without crashing", () => {
    renderWithProviders(<Navbar />);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = renderWithProviders(<Navbar />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
