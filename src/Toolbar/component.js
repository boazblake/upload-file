import m from "mithril";
import { contains, filter, propEq } from "ramda";
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
              ]
            : "",

          contains(v.attrs.model.pageId, ["slides", "editor"])
            ? m(
                "button.button",
                {
                  disabled:
                    filter(
                      propEq("isSelected", true),
                      v.attrs.model.Model.CurrentPresentation.slides
                    ).length == 0
                      ? true
                      : false,
                  onclick: () =>
                    m.route.set(
                      `/slideshow/${v.attrs.model.Model.CurrentPresentation.id}`
                    ),
                },
                "Slide Show"
              )
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
