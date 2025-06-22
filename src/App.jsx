import "./styles/globals.css"; // Importez votre fichier CSS principal (optionnel)
import { Suspense } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./components/About";
import routes from "./routes";
import GoToTop from "./components/GoToTop";

import ReactModal from "react-modal";

// import "react-modal/dist/react-modal.min.css"; // Minified version

// Importez les styles de modal
// import "./node_modules/react-modal/dist/react-modal.css"; // Relative path (if needed)

// Définissez l'élément racine pour react-modal
const appElement = document.getElementById("root");
ReactModal.setAppElement(appElement);

// Create a wrapper component to handle conditional rendering
const AppContent = () => {
  const location = useLocation();
  const isProjectDetailPage = location.pathname.startsWith("/projects/");

  return (
    <div className="App">
      {/* Header placeholder for future extensibility */}
      <header>
        {/* You can add a logo or site title here in the future */}
      </header>
      {/* Navigation */}
      {!isProjectDetailPage && (
        <nav aria-label="Main navigation">
          <Navbar />
        </nav>
      )}
      {/* Main content */}
      <main id="main-content">
        <div className="bg-wendyBlue">
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              {routes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  element={<route.component />}
                />
              ))}
            </Routes>
          </Suspense>
        </div>
        {/* About section */}
        {!isProjectDetailPage && (
          <section aria-labelledby="about-section">
            <About />
          </section>
        )}
      </main>
      {/* Go to Top button (outside main for accessibility) */}
      <GoToTop />
      {/* Footer placeholder for future extensibility */}
      <footer>
        {/* You can add contact info or copyright here in the future */}
      </footer>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
