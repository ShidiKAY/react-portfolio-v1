import * as Dialog from "@radix-ui/react-dialog";
import React from "react";

// const projects = [
//   {
//     title: "BUBO CYBERSEC",
//     description:
//       "Développer un outil pour surveiller le système d'information (SI) des entreprises et améliorer sa qualité et la protection des données.",
//     image: "/src/public/images/project-images/bubo/logo.png",
//     technologies: ["Django", "Python", "JavaScript", "HTML", "CSS"],
//     link: "https://github.com/prasad-chavan1/Animesthetic-Social-Media",
//   },
//   {
//     title: "Animesthetic 2 Social Media",
//     description:
//       "Web application for connecting with friends and social networking.",
//     image: "/src/public/images/project-images/bubo/logo.png",
//     technologies: ["Django", "Python", "JavaScript", "HTML", "CSS"],
//     link: "https://github.com/prasad-chavan1/Animesthetic-Social-Media",
//   },
//   {
//     title: "Animesthetic 3 Social Media",
//     description:
//       "Web application for connecting with friends and social networking.",
//     image: "/src/public/images/project-images/bubo/logo.png",
//     technologies: ["Django", "Python", "JavaScript", "HTML", "CSS"],
//     link: "https://github.com/prasad-chavan1/Animesthetic-Social-Media",
//   },
//   // {
//   //   title: "Animesthetic 4 Social Media",
//   //   description:
//   //     "Web application for connecting with friends and social networking.",
//   //   image: "/src/public/images/project-images/bubo/logo.png",
//   //   technologies: ["Django", "Python", "JavaScript", "HTML", "CSS"],
//   //   link: "https://github.com/prasad-chavan1/Animesthetic-Social-Media",
//   // },
//   // ... Add more project objects here
// ];

const Bubo = () => {
  return (
    <div>
      <Dialog.Root className="">
        <Dialog.Trigger asChild>
          <button className="Button violet">See more</button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="DialogOverlay" />
          <Dialog.Content className="DialogContent">
            <Dialog.Title className="DialogTitle">Bubo Cybersec</Dialog.Title>
            <hr className="star-primary"></hr>
            <Dialog.Description className="DialogDescription">
              <div className="DialogScrollableContent">
                <p>
                  Le projet principal est la réalisation d’un outil de
                  supervision pour les entreprises désirant renforcer la qualité
                  de leur système d’information et la protection de leurs
                  données. Il s’agit de proposer des indicateurs permettant de
                  surveiller le S.I. comme, par exemple, des tableaux de bord
                  dynamiques et efficaces donnant une vision globale sur le
                  système d’information.
                </p>
                <hr></hr>
                <h4>L'enreprise Objectif Cloud</h4>
                <span>
                  Objectif Cloud is a cybersecurity company that provides
                  services aimed at enhancing data and information protection,
                  as well as preventing security incidents. As a developer on
                  the team, I collaborate with my colleagues to create the "BUBO
                  Sentry" monitoring tool, which empowers businesses to gain a
                  comprehensive overview of their information system health. Key
                  Contributions: - Design and develop dashboards featuring Key
                  Performance Indicators (KPIs) - Implement dynamically loaded
                  filters and tables - Facilitate interaction with other tools
                  through APIs and shell scripts - Technical Expertise : Symfony
                  4/5, UIkit, GIT, SQL, DQL, Yarn, and ApexCharts
                </span>

                <div class="my-card">
                  <h2>REFONTE GRAPHIQUE</h2>
                  <hr></hr>

                  <div class="my-card-body">
                    Il s'agit de moderniser le site en le refactorisant d'une
                    structure PHP native vers le framework Symfony 4.
                  </div>

                  <div class="my-card-inside">
                    Le choix du plugin graphique - Analyse de l'existant :
                    plugin Bootstrap. - Aventages : Implémentation simple,
                    standards du wab, rapidement fonctionnel, responsive. -
                    Inconvénients : thème difficile à personnaliser. Possède
                    déjà un design avancé. Besoin d'une identité propre à
                    l'application. - Comparaison avec UIkit, Sementic UI,
                    Bootstrap. - Choix d'UIkit car se concentre sur la structure
                    plutot que le design. Thème Material. Simple à faire évoluer
                    avec le temps.
                  </div>
                </div>
              </div>
            </Dialog.Description>

            <div className="action-buttons">
              <fieldset className="Fieldset">
                <Dialog.Close asChild>
                  <button className="IconButton" aria-label="Close">
                    X
                  </button>
                </Dialog.Close>
              </fieldset>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};

export default Bubo;
