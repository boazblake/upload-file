import m from "mithril";
import O from "patchinko/constant";
import { props, map } from "ramda";
import { savePresentationTask } from "../services/requests.js";
import { getPresentationsTask } from "./model.js";
import { log } from "../services/index.js";

const PresentationModal = v => {
  const state = {
    errors: "",
    title: "",
  };
  const onError = errors => {
    log("error")(errors);
    state.errors = errors;
  };
  const onSuccess = dto => {
    v.attrs.presentations.push(props(["title", "objectId"], dto));
    v.attrs.toggleModal();
  };

  const save = userToken => e => {
    e.preventDefault();
    return toPresentationDtoTask(state.title)(userToken)
      .chain(savePresentationTask)
      .fork(onError, onSuccess);
  };

  return {
    view: () =>
      m(".modal", [
        m(".modal-background"),
        m(".modal-content", [
          m("fieldset.fieldset", [
            m("legend.legend", "Add a Presentation"),
            m("label.label", "Presentation Name"),
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

export const createPresentationsPage = (navigator, update) => {
  const state = {
    errors: "",
  };

  const onError = error => {
    console.log("error", error);
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
      m(".container", [
        model.toggleModal
          ? m(PresentationModal, {
              toggleModal: () => (model.toggleModal = !model.toggleModal),
              token: model.User.Token,
              presentations: model.Model.presentations,
            })
          : "",
        m("section.section columns is-multiline", [
          m(".column is-6", { style: { overflow: "scroll", height: "65vh" } }, [
            model.Model.Presentations.map(({ id, title }) =>
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
                  onclick: () => m.route.set(`/presentation/${id}/slides`),
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
