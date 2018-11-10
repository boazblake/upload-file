import m from "mithril";
import O from "patchinko/constant";
import { loginTask } from "../services/requests.js";

export const createLoginPage = (navigator, update) => {
  const updatePassword = model => password => (model.User.password = password);
  const updateUserEmail = model => email => (model.User.email = email);

  const onSuccess = data => {
    update({ User: O({ Token: data["user-token"] }) });
    navigator.navigateTo("presentations");
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
            m("fieldset.fieldset is-grouped", [
              m("legend.legend"),
              m("label.label", "user email"),
              m("input.input", {
                type: "text",
                oninput: m.withAttr("value", updateUserEmail(model)),
                value: model.User.email,
              }),
              m("label.label", "password"),
              m("input.input", {
                type: "text",
                oninput: m.withAttr("value", updatePassword(model)),
                value: model.User.password,
              }),
            ]),
            m("button.button is-fullwidth", { onclick: "submit" }, "LOGIN"),
          ]),
          m("span", m.trust(JSON.stringify(model, null, 4)))
        )
      );
    },
  };
};
