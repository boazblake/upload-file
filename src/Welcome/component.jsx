import m from "mithril";
import { compose, dropLast, map, split, trim, unnest } from "ramda";
import {toStruct} from './model.js'

const createWelcomePage = (navigator, update) => {
  const clean = compose(map(dropLast(1)));

  const upload = model => e =>
    model.upload(e).then(({ data }) => {
      model.data = clean(data);
      console.log(model);
      toStruct(model);
      m.redraw()
    });

  return {
    view: ({ attrs: { model } }) =>
      m("div", { class: "container" }, [
        m("section", { class: "section" }, [
          m("div", { class: "hero is-large" }, [
            m("h2", { class: "app-title title is-bold" }, "UPLOAD DATA FILE"),
          ]),
          m("div", { class: "hero" }, [
            m("input[type=file]", { class: "input", onchange: upload(model) }),
          ]),
          m("span", m.trust(JSON.stringify(model.table,null,4))),
        ]),
      ]),
  };
};

export default createWelcomePage;
