import React from "react";

function MainContent() {
  return (
    <main className="main-content container py-5">
      <section className="about-me">
        <h2>A propos de moi</h2>
        <p>Votre texte à propos de vous, vos compétences et vos expériences.</p>
      </section>
      <section className="skills">
        <h2>Mes compétences</h2>
        <ul className="list-group">
          <li className="list-group-item">Développement Web</li>
          <li className="list-group-item">Design UI/UX</li>
          <li className="list-group-item">Intégration de logiciels</li>
        </ul>
      </section>
      <section className="portfolio">
        <h2>Portfolio</h2>
        <p>Lien vers votre portfolio ou exemples de réalisations.</p>
      </section>
      <section className="contact">
        <h2>Contact</h2>
        <p>
          Email: votre.email@example.com
          <br />
          Téléphone: 01 23 45 67 89
        </p>
      </section>
    </main>
  );
}

export default MainContent;
