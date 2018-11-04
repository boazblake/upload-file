import m from "mithril";
import { compose, dropLast, map, split, trim, unnest } from "ramda";
import { addPresentation } from "./model.js";
import { findPresentationsTask } from "../services/requests.js";

export const createPresentationsPage = (navigator, update) => {
  const onError = error => console.log("error", error);

  const onSuccess = model => dto => console.log("dto", dto);

  return {
    // oninit: ({ attrs: { model } }) =>
    // findPresentationsTask(model).fork(onError, onSuccess(model)),
    // onupdate: () => console.log("onupdate in prese"),
    view: ({ attrs: { model } }) => {
      console.log(model);

      return m(".container", [
        m("section.section", [
          m(".hero", [m("p.p", "PRESENTATIONS")]),
          m("span", m.trust(JSON.stringify(model, null, 4))),
        ]),
      ]);
    },
  };
};

// add presentation modal[
//   m("fieldset.fieldset", [
//     m("legend.legend", "Add a Presentation"),
//     m("input.input", {
//       type: "text",
//       onchange: m.withAttr("value", updatePresentationName()),
//     }),
//     m("label.label", "Presentation Name"),
//   ]),
// ];
