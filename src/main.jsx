import React from "react";
import ReactDOM from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "./context/ThemeContext";
import App from "./App.jsx";
import i18n from "./i18n";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </ThemeProvider>
    </HelmetProvider>
  </React.StrictMode>
);
