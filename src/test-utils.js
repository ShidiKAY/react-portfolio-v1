import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

const ROUTER_FUTURE = {
  v7_startTransition: true,
  v7_relativeSplatPath: true,
};

// Utilitaire pour rendre un composant avec tous les providers nécessaires
export function renderWithProviders(ui, { route = "/" } = {}) {
  return render(
    <MemoryRouter future={ROUTER_FUTURE} initialEntries={[route]}>
      {ui}
    </MemoryRouter>
  );
}
