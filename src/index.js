import m from "mithril";
import stream from "mithril-stream";
import O from "patchinko/constant";
import { isEmpty } from "ramda";
import createApp from "./App.js";
//styles
import "bulma/css/bulma.css";
import "./index.css";

//MEIOSIS PATTERN SETUP

const update = stream();
const App = createApp(update);
const models = stream.scan(O, App.model(), update);

const Routes = Object.keys(App.navigator.routes).reduce((result, route) => {
  result[route] = {
    onmatch: (params, url) => {
      console.log("onmatch", url, models(), isEmpty(models().User.Token));
      if (url !== "/login" && isEmpty(models().User.Token)) {
        return m.route.set("/login");
      }
      return App.navigator.onnavigate(App.navigator.routes[route], params, url);
    },
    render: () => m(App, { model: models() }),
  };
  return result;
}, {});

const root = document.getElementById("app");
m.route(root, "/", Routes);

import meiosisTracer from "meiosis-tracer";
meiosisTracer({ streams: [models] });

models.map(model => {
  const url = model.url;
  if (url && document.location.has !== url) {
    window.history.pushState({}, "", url);
  }
});

models.map(() => m.redraw());
