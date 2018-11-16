import m from "mithril";
import { contains } from "ramda";
import { log } from "../services/index.js";

const Toolbar = v => {
  console.log("toolbar pageid:", v.attrs);
  return {
    view: v =>
      m(".level", [
        m(".level-left", [
          contains(v.attrs.model.pageId, ["slides", "editor"])
            ? [
                m(
                  "button.button",
                  {
                    onclick: () => m.route.set("/presentations"),
                  },
                  "Presentations"
                ),
                m(
                  "button.button",
                  {
                    onclick: () =>
                      m.route.set(
                        `/slideshow/${
                          v.attrs.model.Model.CurrentPresentation.id
                        }`
                      ),
                  },
                  "Slide Show"
                ),
              ]
            : "",
          contains(v.attrs.model.pageId, ["editor"])
            ? m(
                "button.button",
                {
                  onclick: () =>
                    m.route.set(
                      `/presentation/${
                        v.attrs.model.Model.CurrentPresentation.id
                      }/slides`
                    ),
                },
                "slides"
              )
            : "",
        ]),
        m(".level-right", [
          contains(v.attrs.model.pageId, ["presentations", "slides"])
            ? m(
                "button.button",
                {
                  onclick: () =>
                    (v.attrs.model.toggleModal = !v.attrs.model.toggleModal),
                },
                "Add New"
              )
            : "",
        ]),
      ]),
  };
};

export default Toolbar;
