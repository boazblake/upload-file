import m from "mithril";
import O from "patchinko/constant";
import { loginTask } from "../services/requests.js";
import { updatePassword, updateUserName } from "./model.js";

export const createLoginPage = (navigator, update) => {
  const onSuccess = data => {
    update({ User: O({ Token: data["user-token"] }) });
    m.route.set("/presentations");
  };

  const onError = data => {
    console.log("error", data);
  };

  return {
    view: ({ attrs: { model } }) => {
      const loginToPasteBin = e => {
        e.preventDefault();
        loginTask(model.User).fork(onError, onSuccess);
      };

      return m(
        ".container",
        m(
          "section.section",
          m("form.form", { onsubmit: loginToPasteBin }, [
            m("fieldset.fieldset", [
              m("legend.legend", "Login to PasteBin"),
              m("label.label", "user name"),
              m("input.input", {
                type: "text",
                oninput: m.withAttr("value", updateUserName(model)),
                value: model.User.name,
              }),
              m("label.label", "password"),
              m("input.input", {
                type: "text",
                oninput: m.withAttr("value", updatePassword(model)),
                value: model.User.password,
              }),
            ]),
            m("button.button", { onclick: "submit" }, "LOGIN"),
          ]),
          m("span", m.trust(JSON.stringify(model, null, 4)))
        )
      );
    },
  };
};
