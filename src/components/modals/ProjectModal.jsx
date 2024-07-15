import * as Dialog from "@radix-ui/react-dialog";
import React from "react";
import { useTranslation } from "react-i18next";

const ProjectModal = ({ projectId }) => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  return (
    <div>
      <Dialog.Root className="">
        <Dialog.Trigger asChild>
          <button className="Button violet">See more</button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="DialogOverlay" />
          <Dialog.Content className="DialogContent">
            <Dialog.Title className="DialogTitle">
              {t(`projects.${projectId}.introduction.name`)}
            </Dialog.Title>
            <hr className="star-primary"></hr>
            <Dialog.Description className="DialogDescription px-24">
              <div className="DialogScrollableContent">
                <p>{t(`projects.${projectId}.introduction.introduction`)}</p>
                <hr></hr>
                <h2>{t(`projects.${projectId}.introduction.title`)}</h2>
                <span>
                  {t(`projects.${projectId}.introduction.description`)}
                </span>

                <h2>TÂCHES RÉALISÉES</h2>

                <div className="my-card px-10">
                  {/* <div className="my-card-inside">
                    {t(`projects.${projectId}.tasks.1.description`, {
                      returnObjects: true,
                    }).map((social) => (
                      <div>{social}</div>
                    ))}
                  </div> */}
                  <div>
                    {t(`projects.${projectId}`, {
                      returnObjects: true,
                    })?.tasks?.map(
                      (task, dedex) => (
                        <div key={dedex}>
                          <h3>{task["group"].titre}</h3>
                          <hr></hr>
                          <div className="my-card-body">
                            {task["group"].intro}
                          </div>

                          {Object.keys(task["data"]).map((id_task, index) => (
                            <div key={index} className="my-card-inside">
                              <div>
                                {
                                  t(`projects.${projectId}`, {
                                    returnObjects: true,
                                  }).tasks[dedex]["data"][id_task].title
                                }
                              </div>
                              {t(`projects.${projectId}`, {
                                returnObjects: true,
                              }).tasks[dedex]["data"][id_task].description?.map(
                                (description, index) => (
                                  <div key={index}>{description}</div>
                                )
                              )}
                              {t(`projects.${projectId}`, {
                                returnObjects: true,
                              }).tasks[dedex]["data"][id_task].img && (
                                <div>
                                  <hr></hr>
                                  <img
                                    src={
                                      t(`projects.${projectId}`, {
                                        returnObjects: true,
                                      }).tasks[dedex]["data"][id_task].img
                                    }
                                    alt="Task Image"
                                  />
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )

                      // <div key={id_task} className="my-card-inside">
                      //   <div>{task[id_task].title}</div>
                      //   {task[id_task].description?.map(
                      //     (description, index) => (
                      //       <div key={index}>{description}</div>
                      //     )
                      //   )}
                      //   {task[id_task].img && (
                      //     <div>
                      //       <hr></hr>
                      //       <img src={task[id_task].img} alt="Task Image" />
                      //     </div>
                      //   )}
                      // </div>
                    )}
                  </div>

                  {/* <div class="my-card-inside">
                    Le choix du plugin graphique - Analyse de l'existant :
                    plugin Bootstrap. - Aventages : Implémentation simple,
                    standards du wab, rapidement fonctionnel, responsive. -
                    Inconvénients : thème difficile à personnaliser. Possède
                    déjà un design avancé. Besoin d'une identité propre à
                    l'application. - Comparaison avec UIkit, Sementic UI,
                    Bootstrap. - Choix d'UIkit car se concentre sur la structure
                    plutot que le design. Thème Material. Simple à faire évoluer
                    avec le temps.
                  </div> */}
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

export default ProjectModal;
