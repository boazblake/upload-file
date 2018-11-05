import m from "mithril";
import O from "patchinko/constant";
import { props, map } from "ramda";
import {
  savePresentationTask,
  findPresentationsTask,
} from "../services/requests.js";
import { log } from "../services/index.js";

const PresentationModal = v => {
  console.log("modal", v);
  const state = {
    errors: "",
    name: "",
  };
  const onError = errors => {
    log("error")(errors);
    state.errors = errors;
  };
  const onSuccess = dto => {
    console.log("modal success", v.attrs.presentations, dto);
    v.attrs.presentations.push(props(["Title", "objectId"], dto));
    v.attrs.toggleModal();
  };

  const save = userToken => e => {
    e.preventDefault();
    return savePresentationTask({ dto: { Title: state.name }, userToken }).fork(
      onError,
      onSuccess
    );
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
              onchange: m.withAttr("value", v => (state.name = v)),
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
            console.log("close modal", v.attrs);
            return v.attrs.toggleModal();
          },
          "aria-label": "close",
        }),
      ]),
  };
};

export const createPresentationsPage = (navigator, update) => {
  const onError = error => console.log("error", error);

  const onSuccess = model => dto => {
    console.log("success", map(props(["Title", "objectId"]), dto));
    update({
      Model: O({ presentations: map(props(["Title", "objectId"]), dto) }),
    });
    console.log(model);
  };

  const findPresentations = ({ attrs: { model } }) => {
    console.log("findPresentations us running", model);
    return findPresentationsTask(model.User.Token).fork(
      onError,
      onSuccess(model)
    );
  };

  return {
    oncreate: findPresentations,
    view: ({ attrs: { model } }) => {
      console.log("findPresentations", model);
      return m(".container", [
        m("section.section", [
          model.toggleModal
            ? m(PresentationModal, {
                toggleModal: () => (model.toggleModal = !model.toggleModal),
                token: model.User.Token,
                presentations: model.Model.presentations,
              })
            : "",
          m("section.section", []),
          m("span", m.trust(JSON.stringify(model, null, 4))),
        ]),
      ]);
    },
  };
};
