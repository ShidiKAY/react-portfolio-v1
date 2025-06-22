/* eslint-disable no-undef */
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";
import { axe, toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

describe("App", () => {
  it("renders semantic landmarks", () => {
    render(<App />);
    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getByRole("navigation")).toBeInTheDocument();
    // Header and footer may not have roles by default, so check by tag
    expect(document.querySelector("header")).toBeInTheDocument();
    expect(document.querySelector("footer")).toBeInTheDocument();
  });

  it("has no accessibility violations on initial render", async () => {
    const { container } = render(<App />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
