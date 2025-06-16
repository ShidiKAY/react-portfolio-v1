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
      <div>
        {/* Métadonnées */}
        <meta
          name="google-site-verification"
          content="VJs2G3ynvYQ1KG06ciOhdPdklC1gIUEkJ2KcplrnfWU"
        />
        <meta
          name="description"
          content="Portfolio de Kamal AIT YOUS. Je suis développeur web, analyste de données et passionné de machine learning. PrasadChavan, Prasadchavan, Kamal AIT YOUS"
        />
        <title>Kamal AIT YOUS</title>

        {/* Contenu de la page d'accueil */}
        <div className="bg-wendyBlue">
          {!isProjectDetailPage && <Navbar />}
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

        {!isProjectDetailPage && <About />}
        {/* Ajoutez du contenu, des images, des liens, etc. */}

        {/* Go to Top button */}
        <GoToTop />
      </div>
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
