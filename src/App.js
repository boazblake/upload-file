import m from "mithril";

import Models from "./Models.js";

import { createNavigator } from "./services/navigator.js";

import { createPresentationsPage } from "./Presentations/component.js";
import { createLoginPage } from "./Login/component.js";
import Toolbar from "./Toolbar/component.js";

const createNotFound = nav => update => {
  return {
    view: () => "404 NOT FOUND",
  };
};

const login_page = (nav, update) => {
  const LoginPage = createLoginPage(nav, update);
  return {
    view: ({ attrs: { model } }) => [
      m(".hero is-large", [m("h2.app-title title is-bold", "Login")]),
      m(".section hero", m(LoginPage, { model })),
    ],
  };
};

const presentations_page = (nav, update) => {
  const PresentationsPage = createPresentationsPage(nav, update);
  return {
    view: ({ attrs: { model } }) => [
      m(".hero is-large", [m("h2.app-title title is-bold", "Presentations")]),
      m(".section hero", m(PresentationsPage, { model: model })),
    ],
  };
};

const routes = update => navigator => [
  {
    pageId: "login",
    component: login_page(navigator, update),
    route: "/login",
  },
  {
    pageId: "presentations",
    component: presentations_page(navigator, update),
    route: "/presentations",
  },
];

const createApp = update => {
  const navigator = createNavigator(update);
  navigator.register(
    routes(update)(navigator),
    createNotFound(navigator)(update)
  );
  return {
    model: () => Models,
    navigator,
    view: ({ attrs: { model } }) => {
      const Component = navigator.getComponent(model.pageId);
      return m(
        "section.app",
        m("section.main-stage section", [
          m(Toolbar, { model }),
          m(Component, { model: model }),
        ])
      );
    },
  };
};

export default createApp;
