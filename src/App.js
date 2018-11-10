import m from "mithril";

import Models from "./Models.js";

import { createNavigator } from "./services/navigator.js";

import { createPresentationsPage } from "./Presentations/component.js";
import { createSlidesPage } from "./Slides/component.js";
import { createLoginPage } from "./Login/component.js";
import Toolbar from "./Toolbar/component.js";

const createNotFound = nav => update => {
  return {
    view: () => "404 NOT FOUND",
  };
};

const loginPage = (nav, update) => {
  const LoginPage = createLoginPage(nav, update);
  return {
    view: ({ attrs: { model } }) => [
      m(".hero is-large", [m("h2.app-title title is-bold", "Login")]),
      m(Toolbar, { model }),
      m(".section hero", m(LoginPage, { model })),
    ],
  };
};

const presentationsPage = (nav, update) => {
  const PresentationsPage = createPresentationsPage(nav, update);
  return {
    view: ({ attrs: { model } }) => [
      m(".hero is-large", [m("h2.app-title title is-bold", "Presentations")]),
      m(Toolbar, { model }),
      m(PresentationsPage, { model: model }),
    ],
  };
};

const slidesPage = (nav, update) => {
  const slidesPage = createSlidesPage(nav, update);
  return {
    view: ({ attrs: { model } }) => [
      m(".hero is-large", [m("h2.app-title title is-bold", "SLIDES")]),
      m(Toolbar, { model }),
      m(slidesPage, { model: model }),
    ],
  };
};

const routes = update => navigator => [
  {
    pageId: "login",
    component: loginPage(navigator, update),
    route: "/login",
  },
  {
    pageId: "presentations",
    component: presentationsPage(navigator, update),
    route: "/presentations",
  },
  {
    pageId: "slides",
    component: slidesPage(navigator, update),
    route: "/presentation/:id/slides",
  },
  // {
  //   pageId: "editor",
  //   component: editorPage(navigator, update),
  //   route: "/editor/slides/:id",
  // },
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
        m("section.main-stage section", [m(Component, { model: model })])
      );
    },
  };
};

export default createApp;
