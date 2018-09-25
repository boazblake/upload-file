import m from "mithril";

import Model from "./Models/index.js";

import { createNavigator } from "./services/navigator.js";

import createWelcomePage from "./Welcome/component.jsx";
import StageBanner from "./components/ui/StageBanner.jsx";
import CardContainer from "./components/layout/CardContainer.jsx";

const createNotFound = nav => update => {
  return {
    view: () => "404 NOT FOUND",
  };
};


const createWelcome = (nav, update) => {
  const WelcomePage = createWelcomePage(nav, update);
  return {
    view: ({ attrs: { model } }) => [
      <StageBanner title="VROOM" />,
      <CardContainer>
        <WelcomePage model={model} />
      </CardContainer>,
    ],
  };
};

const routes = update => navigator => [
  {
    pageId: "welcome",
    component: createWelcome(navigator, update),
    route: "/",
  },
];

const createApp = update => {
  const navigator = createNavigator(update);
  navigator.register(
    routes(update)(navigator),
    createNotFound(navigator)(update)
  );
  return {
    model: () => Model,
    navigator,
    view: ({ attrs: { model } }) => {
      const Component = navigator.getComponent(model.pageId);
      return (
        <section class="App">
          <section class="main-stage section">
            <Component model={model} />
          </section>
        </section>
      );
    },
  };
};

export default createApp;
