import m from "mithril";
import { compose, dropLast, map, split, trim, unnest } from "ramda";
import { addPresentation } from "./model.js";

export const createPresentationsPage = (navigator, update) => {
  return {
    view: ({ attrs: { model } }) => {
      console.log(model);
      const updatePresentationName = update => name =>
        addPresentation(model)(name);

      return m(".container", [
        m("section.section", [
          m(".hero", [
            m("fieldset.fieldset", [
              m("legend.legend", "Add a Presentation"),
              m("input.input", {
                type: "text",
                onchange: m.withAttr("value", updatePresentationName()),
              }),
              m("label.label", "Presentation Name"),
            ]),
          ]),
          m("span", m.trust(JSON.stringify(model, null, 4))),
        ]),
      ]);
    },
  };
};
