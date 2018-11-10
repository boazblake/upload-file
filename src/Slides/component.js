import m from "mithril";
import O from "patchinko/constant";
import { props, map } from "ramda";
import { saveSlideTask } from "../services/requests.js";
import { getSlidesTask } from "./model.js";
import { log } from "../services/index.js";

const SlidesModal = v => {
  const state = {
    errors: "",
    title: "",
  };

  const onError = errors => {
    log("error")(errors);
    state.errors = errors;
  };

  const onSuccess = dto => {
    console.log("onsuccess", dto);
    v.attrs.slides.push(
      props(
        ["title", "objectId", "contents", "presentationId", "isSelected"],
        dto
      )
    );
    v.attrs.toggleModal();
  };

  const save = userToken => e => {
    const ctx = {
      dto: { title: state.title },
      presentationId: v.attrs.presentationId,
      userToken,
    };
    e.preventDefault();
    return saveSlideTask(ctx).fork(onError, onSuccess);
  };

  return {
    view: () =>
      m(".modal", [
        m(".modal-background"),
        m(".modal-content", [
          m("fieldset.fieldset", [
            m("legend.legend", "Add a Slide"),
            m("label.label", "Slide title"),
            m("input.input", {
              type: "text",
              onchange: m.withAttr("value", v => (state.title = v)),
            }),
            m(
              "button.button",
              { onclick: save(v.attrs.token) },
              "save presentation"
            ),
          ]),
        ]),
        m("button.modal-close is-large", {
          onclick: () => {
            return v.attrs.toggleModal();
          },
          "aria-label": "close",
        }),
      ]),
  };
};

export const createSlidesPage = (navigator, update) => {
  let presentationId = "";
  const onError = error => console.log("error", error);

  const onSuccess = model => dto => {
    update({
      Model: O({
        Presentation: dto,
      }),
    });
  };

  const findSlides = ({ attrs: { model } }) => {
    presentationId = m.route.param("id");
    return getSlidesTask(presentationId).fork(onError, onSuccess(model));
  };

  return {
    oncreate: findSlides,
    view: ({ attrs: { model } }) =>
      m(".container", [
        model.toggleModal
          ? m(SlidesModal, {
              toggleModal: () => (model.toggleModal = !model.toggleModal),
              token: model.User.Token,
              slides: model.Model.Presentation.slides,
              presentationId,
            })
          : "",

        m("section.section columns is-multiline", [
          m(".column is-6", { style: { overflow: "scroll", height: "65vh" } }, [
            model.Model.Presentation.slides.map(({ id, title }) =>
              m(
                "container.is-child box button fadeIn",
                {
                  oncreate: ({ dom }) =>
                    dom.animate(
                      [
                        { transform: "translate3d(0,-100%,0)", opacity: 0 },
                        { transform: "none", opacity: 1 },
                      ],
                      {
                        duration: 1000,
                      }
                    ),
                  onbeforeremove: () => {
                    let anim = [
                      { transform: "none", opacity: 1 },
                      { transform: "translate3d(25%,100%,0)", opacity: 0 },
                    ];
                    let waapi = vnodeChild.dom.animate(anim, {
                      duration: 1000,
                    });

                    return new Promise(resolve => {
                      waapi.onfinish = function(e) {
                        console.log("finished exit()");
                        resolve();
                      };
                    });
                  },
                  onclick: () => console.log("slide cliked", id, title),
                  key: id,
                },
                title
              )
            ),
          ]),
        ]),
        m("span", m.trust(JSON.stringify(model, null, 4))),
      ]),
  };
};
