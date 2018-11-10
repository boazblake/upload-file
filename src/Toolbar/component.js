import m from "mithril";
import { contains } from "ramda";
import { log } from "../services/index.js";

const Toolbar = v => {
  console.log("toolbar pageid:", v.attrs.model.pageId);
  return {
    view: v =>
      m(".level", [
        m(".level-left", [
          contains(v.attrs.model.pageId, ["slides"])
            ? m(
                "button.button",
                {
                  onclick: () => m.route.set("/presentations"),
                },
                "Presentations"
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
