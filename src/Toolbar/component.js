import m from "mithril";
import { log } from "../services/index.js";

const Toolbar = v => {
  const state = {
    pageId: "",
  };

  return {
    onupdate: v => (state.pageId = v.attrs.model.pageId),
    view: () =>
      m(".level", [
        m(".level-left", [
          state.pageId == "presentations"
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
