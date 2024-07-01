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
                <hr></hr>
                <h4>L'enreprise Objectif Cloud</h4>
                <span>
                  Objectif Cloud est une entreprise de Cyber Sécurité réalisant
                  des prestations ayant pour vocation d’offrir une meilleure
                  protection de la donnée et de l’information, et de prévenir
                  les incidents de sécurité. En qualité de développeur, je
                  réalise avec l'équipe, l'outil de supervision "BUBO Sentry"
                  permettant aux entreprises d’avoir une vision globale de
                  l’état de leur système d’information.
                </span>
                <hr></hr>
                <h4>L'enreprise Objectif Cloud</h4>
                <span>
                  Objectif Cloud est une entreprise de Cyber Sécurité réalisant
                  des prestations ayant pour vocation d’offrir une meilleure
                  protection de la donnée et de l’information, et de prévenir
                  les incidents de sécurité. En qualité de développeur, je
                  réalise avec l'équipe, l'outil de supervision "BUBO Sentry"
                  permettant aux entreprises d’avoir une vision globale de
                  l’état de leur système d’information.
                </span>
                <hr></hr>
                <h4>L'enreprise Objectif Cloud</h4>
                <span>
                  Objectif Cloud est une entreprise de Cyber Sécurité réalisant
                  des prestations ayant pour vocation d’offrir une meilleure
                  protection de la donnée et de l’information, et de prévenir
                  les incidents de sécurité. En qualité de développeur, je
                  réalise avec l'équipe, l'outil de supervision "BUBO Sentry"
                  permettant aux entreprises d’avoir une vision globale de
                  l’état de leur système d’information.
                </span>
                <hr></hr>
                <h4>L'enreprise Objectif Cloud</h4>
                <span>
                  Objectif Cloud est une entreprise de Cyber Sécurité réalisant
                  des prestations ayant pour vocation d’offrir une meilleure
                  protection de la donnée et de l’information, et de prévenir
                  les incidents de sécurité. En qualité de développeur, je
                  réalise avec l'équipe, l'outil de supervision "BUBO Sentry"
                  permettant aux entreprises d’avoir une vision globale de
                  l’état de leur système d’information.
                </span>
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
