import React from "react";
import ReactDOM from "react-dom/client";
import { I18nextProvider } from "react-i18next"; // Import I18nextProvider
import App from "./App.jsx";
import i18n from "./i18n"; // Import your i18next instance

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </React.StrictMode>
);
