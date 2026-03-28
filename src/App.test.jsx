import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "./context/ThemeContext";
import App from "./App";
import { axe, toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

const AllProviders = ({ children }) => (
  <HelmetProvider>
    <ThemeProvider>{children}</ThemeProvider>
  </HelmetProvider>
);

describe("App", () => {
  it("renders semantic landmarks", async () => {
    render(<App />, { wrapper: AllProviders });
    expect(await screen.findByRole("main")).toBeInTheDocument();
    expect(screen.getAllByRole("navigation").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("has no accessibility violations on initial render", async () => {
    const { container } = render(<App />, { wrapper: AllProviders });
    await screen.findByRole("main");
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
