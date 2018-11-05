import m from "mithril";
import O from "patchinko/constant";
import { props, map } from "ramda";
import {
  savePresentationTask,
  findPresentationsTask,
} from "../services/requests.js";
import { log } from "../services/index.js";

const PresentationModal = v => {
  const state = {
    errors: "",
    name: "",
  };
  const onError = errors => {
    log("error")(errors);
    state.errors = errors;
  };
  const onSuccess = dto => {
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
    update({
      Model: O({ presentations: map(props(["Title", "objectId"]), dto) }),
    });
  };

  const findPresentations = ({ attrs: { model } }) => {
    return findPresentationsTask(model.User.Token).fork(
      onError,
      onSuccess(model)
    );
  };

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
            model.Model.presentations.map(
              p => m("container.is-child box", p[0])
              // presentation => m(Presentation, )
            ),
          ]),
        ]),
        m("span", m.trust(JSON.stringify(model, null, 4))),
      ]),
  };
};
