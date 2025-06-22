import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

// Utilitaire pour rendre un composant avec tous les providers nécessaires
export function renderWithProviders(ui, { route = "/" } = {}) {
  return render(<MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>);
}
