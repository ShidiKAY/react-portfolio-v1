import { Navigate } from "react-router-dom";

/** Redirige /about vers la section Expertise sur la page d'accueil. */
const AboutRedirect = () => {
  return <Navigate to={{ pathname: "/", hash: "toabout" }} replace />;
};

export default AboutRedirect;
