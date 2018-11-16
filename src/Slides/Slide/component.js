import m from "mithril";
import { log } from "../../services/index.js";
import { deleteSlideTask, updateSlideTask } from "../../services/requests.js";

const Slide = ({ attrs: { getSlides, model, s } }) => {
  const onError = task => error => log(`error with ${task}`)(error);
  const onSuccess = _ => getSlides({ attrs: { model } });

  const removeSlideTask = id =>
    deleteSlideTask(id).fork(onError("deleting"), onSuccess);

  const selectSlide = id => {
    s.isSelected = !s.isSelected;
    updateSlideTask(id)(s).fork(onError("updating"), onSuccess);
  };

  return {
    view: () =>
      m("section.level box", [
        m("div.level-left", [
          m(
            "button.button",
            {
              onclick: () => m.route.set(`/edit/slide/${s.id}`),
            },
            s.title
          ),
        ]),
        m("div.level-right", [
          m(
            `a.button`,
            {
              style: {
                "background-color": s.isSelected ? "#2ecc71" : "#e74c3c",
              },
              onclick: () => selectSlide(s.id),
            },
            [m("span.icon is-small", [m("i.fas fa-check")])]
          ),

          m("button.delete", {
            style: { "background-color": "#e74c3c" },
            onclick: () => removeSlideTask(s.id),
          }),
        ]),
      ]),
  };
};

export default Slide;
