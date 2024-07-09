import * as Dialog from "@radix-ui/react-dialog";
import React from "react";
import { useTranslation } from "react-i18next";

const Bubo = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  const projectId = "bubo"; // Use quotes to match JSON key

  // console.log(t(`projects`));
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
              {t(`projects.bubo.introduction.name`)}
            </Dialog.Title>
            <hr className="star-primary"></hr>
            <Dialog.Description className="DialogDescription px-18">
              <div className="DialogScrollableContent">
                <p>{t(`projects.bubo.introduction.introduction`)}</p>
                <hr></hr>
                <h2>{t(`projects.bubo.introduction.title`)}</h2>
                <span>{t(`projects.bubo.introduction.description`)}</span>

                <h2>TÂCHES RÉALISÉES</h2>

                <div className="my-card px-10">
                  <h3>REFONTE GRAPHIQUE</h3>
                  <hr></hr>

                  <div className="my-card-body">
                    Il s'agit de moderniser le site en le refactorisant d'une
                    structure PHP native vers le framework Symfony 4.
                  </div>
                  {/* <div className="my-card-inside">
                    {t(`projects.bubo.tasks.1.description`, {
                      returnObjects: true,
                    }).map((social) => (
                      <div>{social}</div>
                    ))}
                  </div> */}
                  <div>
                    {t(`projects.bubo`, { returnObjects: true })?.tasks?.map(
                      (task) =>
                        Object.keys(task).map((id_task) => (
                          // <div>{task[id_task].title}</div>
                          <div key={id_task} className="my-card-inside">
                            <div>{task[id_task].title}</div>
                            {task[id_task].description?.map(
                              (description, index) => (
                                <div key={index}>{description}</div>
                              )
                            )}
                            {task[id_task].img && (
                              <div>
                                <hr></hr>
                                <img src={task[id_task].img} alt="Task Image" />
                              </div>
                            )}
                          </div>
                        ))
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

export default Bubo;
