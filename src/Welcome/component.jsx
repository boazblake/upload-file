import { log } from "../utils/index";
import m from "mithril";

const createWelcomePage = (navigator, update) => {
  return {
    view: ({ attrs: { model } }) =>
      m("div", { class: "container" }, [
        m("section", { class: "section" }, [
          m("div", { class: "hero is-large" }, [
            m("h2", { class: "app-title title is-bold" }, "UPLOAD DATA FILE"),
          ]),
          m("div", { class: "hero" }, [
            m("input[type=file]", { class: "input", onchange: model.upload }),
          ]),
        ]),
      ]),
  };
};

export default createWelcomePage;
