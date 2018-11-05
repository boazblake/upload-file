import m from "mithril";
import { log } from "../services/index.js";

const Toolbar = v => {
  return {
    view: v =>
      m(".level", [
        m(".level-left", [
          v.attrs.model.pageId == "presentations"
            ? m(
                "button.button",
                {
                  onclick: () =>
                    (v.attrs.model.toggleModal = !v.attrs.model.toggleModal),
                },
                "Add Presentation"
              )
            : "",
        ]),
        m(".level-right"),
      ]),
  };
};

export default Toolbar;
