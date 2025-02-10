import React from "react";
import ReactDOM from "react-dom/client";
import { I18nextProvider } from "react-i18next"; // Import I18nextProvider
import App from "./App.jsx";
import i18n from "./i18n"; // Import your i18next instance

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </React.StrictMode>
);

// Lazy load images
const lazyLoadImages = () => {
  const images = document.querySelectorAll("img[data-src]");
  const config = {
    rootMargin: "0px 0px 50px 0px",
    threshold: 0.01,
  };

  let observer = new IntersectionObserver((entries, self) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        self.unobserve(img);
      }
    });
  }, config);

  images.forEach((image) => {
    observer.observe(image);
  });
};

window.addEventListener("load", lazyLoadImages);
