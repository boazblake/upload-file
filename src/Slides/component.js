import m from "mithril";
import O from "patchinko/constant";
import { clone } from "ramda";
import { animateEntrance, animateExit } from "../services/animations.js";
import SlidesModal from "./slidesModal.js";
import Slide from "./Slide/component.js";
import { loadSlides } from "./model.js";

export const createSlidesPage = (navigator, update) => {
  let presentationId = "";
  const onError = error => console.log("error", error);

  const onSuccess = dto => {
    update({
      Model: O({
        CurrentPresentation: dto,
      }),
    });
  };

  const getSlides = ({ attrs: { model } }) => {
    presentationId = m.route.param("id");
    return loadSlides(presentationId)(model).fork(onError, onSuccess);
  };

  return {
    oncreate: getSlides,
    view: ({ attrs: { model } }) =>
      m(".article", [
        model.toggleModal
          ? m(SlidesModal, {
              toggleModal: () => (model.toggleModal = !model.toggleModal),
              slides: model.Model.CurrentPresentation.slides,
              slide: clone(model.Model.SlideModel),
              pId: model.Model.CurrentPresentation.id,
            })
          : "",

        m("section.section columns is-multiline", [
          m(
            ".column is-6 is-multiline",
            { style: { overflow: "scroll", height: "65vh" } },
            [
              model.Model.CurrentPresentation.slides.map(s =>
                m(Slide, {
                  oncreate: ({ dom }) => animateEntrance(dom),
                  key: s.id,
                  model,
                  getSlides,
                  s,
                })
              ),
            ]
          ),
        ]),
      ]),
    onremove: ({ dom }) => animateExit(dom),
  };
};
