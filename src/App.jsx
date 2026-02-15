import React, { Suspense, useEffect, useLayoutEffect } from "react";
import "./styles/globals.css";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import routes from "./routes";
import GoToTop from "./components/GoToTop";
import QuickNav from "./components/QuickNav/QuickNav";
import Footer from "./components/Footer/Footer";
import ReactModal from "react-modal";

// Below-the-fold: lazy-load About (Projects + SkillsModern) for faster LCP
const About = React.lazy(() => import("./components/About"));
const EngineRoom = React.lazy(() => import("./components/EngineRoom/EngineRoom"));
const ApprocheSystemique = React.lazy(() =>
  import("./components/ApprocheSystemique/ApprocheSystemique")
);
const Recommendations = React.lazy(() =>
  import("./components/Recommendations/Recommendations")
);

// import "react-modal/dist/react-modal.min.css"; // Minified version

// Importez les styles de modal
// import "./node_modules/react-modal/dist/react-modal.css"; // Relative path (if needed)

// Définissez l'élément racine pour react-modal
const appElement = document.getElementById("root");
ReactModal.setAppElement(appElement);

// Modern spinner for Suspense fallback
const Spinner = () => (
  <div
    style={{
      minHeight: "60vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 dark:border-blue-400 border-opacity-50 border-solid"></div>
  </div>
);

// Create a wrapper component to handle conditional rendering
const AppContent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isStandalonePage =
    location.pathname.startsWith("/projects/") ||
    location.pathname === "/labs" ||
    location.pathname.startsWith("/labs/");
  const isHome = location.pathname === "/";

  // Retour page projet (Back / Escape) : positionnement direct sur la section Projets, sans effet smooth (contourne scroll-behavior: smooth du CSS)
  const scrollToProjectsInstant = () => {
    const html = document.documentElement;
    const prev = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";
    const el = document.getElementById("toprojects");
    if (el) el.scrollIntoView({ behavior: "auto", block: "start" });
    html.style.scrollBehavior = prev;
  };
  // Retour page labs / lab detail : positionnement direct sur la section Atelier (toengine), sans transition
  const scrollToEngineInstant = () => {
    const html = document.documentElement;
    const prev = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";
    const el = document.getElementById("toengine");
    if (el) el.scrollIntoView({ behavior: "auto", block: "start" });
    html.style.scrollBehavior = prev;
  };
  useLayoutEffect(() => {
    if (location.pathname !== "/") return;
    if (location.state?.scrollToProjects) scrollToProjectsInstant();
    if (location.state?.scrollToEngine) scrollToEngineInstant();
  }, [location.pathname, location.state]);
  useEffect(() => {
    if (location.pathname !== "/") return;
    const state = location.state || {};
    if (state.scrollToProjects || state.scrollToEngine) {
      const t = setTimeout(() => {
        if (state.scrollToProjects) scrollToProjectsInstant();
        if (state.scrollToEngine) scrollToEngineInstant();
        navigate(".", { replace: true, state: {} });
      }, 150);
      return () => clearTimeout(t);
    }
  }, [location.pathname, location.state, navigate]);

  return (
    <div className="App min-h-screen bg-white dark:bg-slate-900">
      <header aria-hidden="true" />
      {/* Navigation : masquée sur page projet et page Labs */}
      {!isStandalonePage && (
        <nav aria-label="Main navigation">
          <Navbar />
        </nav>
      )}
      {!isStandalonePage && <QuickNav />}
      <main id="main-content">
        <div className={isStandalonePage ? "" : "bg-wendyBlue dark:bg-slate-950"}>
          <Suspense fallback={<Spinner />}>
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
        {/* Bloc Expertise : uniquement sur la page d'accueil (pas sur 404 ni /about après redirect) */}
        {isHome && (
          <section aria-labelledby="about-section" className="bg-white dark:bg-slate-900">
            <Suspense fallback={<div className="min-h-[50vh]" aria-hidden="true" />}>
              <About />
            </Suspense>
          </section>
        )}
        {/* Bloc Méthodologie : uniquement sur la page d'accueil */}
        {isHome && (
          <div className="bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 py-12 sm:py-16">
            <Suspense fallback={<div className="min-h-[30vh]" aria-hidden="true" />}>
              <ApprocheSystemique />
            </Suspense>
            <Suspense fallback={<div className="min-h-[40vh]" aria-hidden="true" />}>
              <EngineRoom />
            </Suspense>
            <Suspense fallback={null}>
              <Recommendations />
            </Suspense>
          </div>
        )}
      </main>
      {!isStandalonePage && <GoToTop />}
      <Footer />
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
