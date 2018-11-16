import m from "mithril";
import marked from "marked";

export const createSlideShowPage = (nav, update) => {
  return {
    view: ({ attrs: { model } }) => {
      return m("section.container hero", [
        m("hi.title", "PRESENTING"),
        m(
          ".box",
          m.trust(
            marked(model.Model.CurrentPresentation.slides[0].contents || "")
          )
        ),
      ]);
    },
  };
};
