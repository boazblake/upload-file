import m from 'mithril'

import NavBar from './components/NavBar.jsx';

import Model from './models/index.js';

import { createNavigator } from './services/navigator.js'

import createLoginPage from './Login/component.jsx'

// import MainStage from './components/layout/MainStage.js';
import StageBanner from './components/ui/StageBanner.jsx';
import CardContainer from './components/layout/CardContainer.jsx';
// import SlideShowContainer from './components/layout/SlideShowContainer.js';
// import LoginPage from './components/cards/LoginPage.js';
// import SelectSlideContainer from './components/layout/SelectSlideContainer.js';
// import PresentationSelectContainer from './components/layout/PresentationSelectContainer.js';
// import SlideEditor from './components/SlideEditor.js';


const createLoginView = (navigator, update) => {
  const LoginPage = createLoginPage(update)
  return {
    view: ({ attrs: { model } }) =>
      [
        <StageBanner action={_ => m.route.set('/login')} title="Login" />,
        <CardContainer>
          <LoginPage model={model} />
        </CardContainer>
      ]
  }
}

const LoginView = model => [
  <StageBanner action={_ => m.route.set('/login')} title="Login" />,
  <CardContainer>
    <LoginPage model={model} />
  </CardContainer>
];

const Presentations = model => [
  <StageBanner action={_ => m.route.set('/login')} title="Presentations" />,
  <CardContainer>
    <PresentationSelectContainer model={model} />
  </CardContainer>
];

const Slides = model => [
  <StageBanner action={_ => m.route.set('/login')} title="Slides" />,
  <CardContainer>
    <SelectSlideContainer model={model} />
  </CardContainer>
];

const SlideShow = model => [
  <StageBanner
    action={_ => m.route.set('/login')} />,
  <CardContainer>
    <SlideShowContainer model={model} />
  </CardContainer>
];

const SLIDE_EDITOR = model => [
  <StageBanner action={_ => m.route.set('/login')} title="Edit A Slide" />,
  <CardContainer>
    <SlideEditor model={model} />
  </CardContainer>
];

const SLIDE_ADDER = model => [
  <StageBanner action={_ => m.route.set('/login')} title="Add A Slide" />,
  <CardContainer>
    <SlideEditor model={model} />
  </CardContainer>
];

const OLDroutes = {
  '/login': {
    view: () => LoginView(Model)
  },
  '/presentations': {
    view: () => Presentations(Model)
  },
  '/newSlide': {
    view: () => SLIDE_ADDER(Model)
  },
  '/slides/:PresentationId"': {
    view: () => Slides(Model)
  },
  '/slideshow': {
    view: () => SlideShow(Model)
  },
  '/editor/:slideId': {
    view: () => SLIDE_EDITOR(Model)
  }
};

const routes = update => [
  { pageId: "LoginView", component: createLoginView(navigator, update), route: "/login" }
]

const createApp = update => {
  const navigator = createNavigator(update)
  navigator.register(routes(update))
  return {
    model: () => Model,
    navigator,
    view: ({ attrs: { model } }) => {
      const Component = navigator.getComponent(model.pageId)
      return (
        <div class="App">
          <div class="main-stage section">
            <Component model={model} />
          </div>
        </div>
      )
    }
  }
};

export default createApp;
