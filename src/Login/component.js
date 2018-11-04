import m from "mithril";
import { updatePassword, updateUserName, loginTask } from "./model.js";

export const createLoginPage = (navigator, update) => {
  return {
    view: ({ attrs: { model } }) => {
      console.log("new view", model);

      const loginToPasteBin = e => {
        e.preventDefault();
        loginTask(model.User).fork(onSuccess, onError);
      };

      return m(
        ".container",
        m(
          "section.section",
          m("form.form", { onsubmit: loginToPasteBin }, [
            m("fieldset.fieldset", [
              m("legend.legend", "Login to PasteBin"),
              m("input.input", {
                type: "text",
                oninput: m.withAttr("value", updateUserName(model)),
                value: model.User.name,
              }),
              m("label.label", "user name"),
              m("input.input", {
                type: "text",
                oninput: m.withAttr("value", updatePassword(model)),
                value: model.User.password,
              }),
              m("label.label", "password"),
            ]),
            m("button.button", { onclick: "submit" }, "LOGIN"),
          ]),
          m("span", m.trust(JSON.stringify(model, null, 4)))
        )
      );
    },
  };
};
