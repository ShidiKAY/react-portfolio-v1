import React from "react";
import Home from "./components/Home";
import "./styles/globals.css"; // Importez votre fichier CSS principal (optionnel)

import { BrowserRouter } from "react-router-dom";
import About from "./components/About";
import Navbar from "./components/Navbar";

import ReactModal from "react-modal";

// import "react-modal/dist/react-modal.min.css"; // Minified version

// Importez les styles de modal
// import "./node_modules/react-modal/dist/react-modal.css"; // Relative path (if needed)

// Définissez l'élément racine pour react-modal
const appElement = document.getElementById("root");
ReactModal.setAppElement(appElement);

function App() {
  return (
    <BrowserRouter>
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
            <Navbar />
            <Home />
          </div>

          <About />
          {/* Ajoutez du contenu, des images, des liens, etc. */}
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
