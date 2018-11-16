import m from "mithril";
import marked from "marked";
import { filter, propEq, prop } from "ramda";

export const createSlideShowPage = (nav, update) => {
  const state = {
    cursor: 0,
    isFullscreen: "vh",
    clicks: 0,
  };

  const doubleClick = e => {
    state.clicks++;
    e.preventDefault();
    console.log("clicked", state);
    setTimeout(() => {
      state.clicks == 2 ? (state.isFullscreen = "%") : (state.clicks = 0);
    }, 1000);
  };

  const loadSlideShow = ({ attrs: { model } }) => {
    console.log("loadslideshow", model);
    model.Model.CurrentPresentation.slideShow = filter(
      propEq("isSelected", true),
      model.Model.CurrentPresentation.slides
    ).map(prop("contents"));

    console.log("oninit slide createSlideShowPage", model);
    return model;
  };

  return {
    oninit: loadSlideShow,
    view: v => {
      console.log("view vnode?", v);
      return m(". container", [
        state.isFullscreen == "vh"
          ? m(".level", [
              m(".level-left", [
                m(
                  "button.button is-outlined is-link",
                  {
                    onclick: () => m.route.set("/presentations"),
                  },
                  "Presentations"
                ),
                m(
                  "button.button is-outlined is-link",
                  {
                    onclick: () =>
                      m.route.set(
                        `/presentation/${
                          v.attrs.model.Model.CurrentPresentation.id
                        }/slides`
                      ),
                  },
                  "Slides"
                ),
              ]),
              m(
                ".level-right",
                m(
                  "button.button is-outlined is-link",
                  {
                    onclick: doubleClick,
                  },
                  "FullScreen"
                )
              ),
            ])
          : "",
        m(".hero", [
          m(".hero-body", [
            m(
              ".box",
              {
                style: {
                  height: "80vh",
                  width: `100${state.isFullscreen}`,
                  overflow: "scroll",
                },
              },
              m.trust(
                marked(
                  v.attrs.model.Model.CurrentPresentation.slideShow[
                    state.cursor
                  ] || "No Slides Added"
                )
              )
            ),
          ]),
        ]),
      ]);
    },
  };
};
