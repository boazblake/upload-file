import { log } from "../services/index.js";
import m from "mithril";
import O from "patchinko/constant";
import { clone } from "ramda";
import { animateEntrance, animateExit } from "../services/animations.js";
import { getPresentationsTask } from "./model.js";
import PresentationModal from "./presentationModal.js";
import Presentation from "./Presentation/component.js";

export const createPresentationsPage = (navigator, update) => {
  const state = {
    errors: "",
  };

  const onError = error => {
    log("error")(error);
    state.error = error;
  };

  const onSuccess = dto => {
    update({
      Model: O({ Presentations: dto }),
    });
  };

  const findPresentations = ({ attrs: { model } }) =>
    getPresentationsTask().fork(onError, onSuccess);

  return {
    oncreate: findPresentations,
    view: ({ attrs: { model } }) =>
      m(".article", [
        model.toggleModal
          ? m(PresentationModal, {
              toggleModal: () => (model.toggleModal = !model.toggleModal),
              presentations: model.Model.Presentations,
              presentationModel: clone(model.Model.PresentationModel),
            })
          : "",
        m("section.section columns is-multiline", [
          m(".column is-6", { style: { overflow: "scroll", height: "65vh" } }, [
            model.Model.Presentations.map(({ title, id }) =>
              m(Presentation, {
                key: id,
                id,
                title,
                model,
                findPresentations,
                oncreate: ({ dom }) => animateEntrance(dom),
                onBeforeRemove: ({ dom }) => animateExit(dom),
              })
            ),
          ]),
        ]),
      ]),
  };
};
