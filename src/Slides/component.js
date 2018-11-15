import m from "mithril";
import O from "patchinko/constant";
import { clone } from "ramda";
import { animateEntrance, animateExit } from "../services/animations.js";
import SlidesModal from "./slidesModal.js";
import { loadSlides } from "./model.js";

import { log } from "../services/index.js";

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
    oninit: getSlides,
    view: ({ attrs: { model } }) =>
      m(".container", [
        model.toggleModal
          ? m(SlidesModal, {
              toggleModal: () => (model.toggleModal = !model.toggleModal),
              slides: model.Model.CurrentPresentation.slides,
              slide: clone(model.Model.SlideModel),
              pId: model.Model.CurrentPresentation.id,
            })
          : "",

        m("section.section columns is-multiline", [
          m(".column is-6", { style: { overflow: "scroll", height: "65vh" } }, [
            model.Model.CurrentPresentation.slides.map(s =>
              m(
                "container.is-child box button fadeIn",
                {
                  oncreate: ({ dom }) => animateEntrance(dom),
                  onremove: ({ dom }) => animateExit(dom),
                  onclick: () => console.log("slide cliked", s),
                  key: s.id,
                },
                s.title
              )
            ),
          ]),
        ]),
        m("span", m.trust(JSON.stringify(model, null, 4))),
      ]),
  };
};
