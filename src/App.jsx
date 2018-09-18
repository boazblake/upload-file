import m from 'mithril'

import Model from './models/index.js';

import { createNavigator } from './services/navigator.js'

import createLoginPage from './Login/component.jsx'
import createPresentationsPage from './Presentations/component.jsx'
import createSlidesSelectionPage from './SlidesSelection/component.jsx'
import createSlideShowPage from './SlideShow/component.jsx'
import createEditorPage from './Editor/component.jsx'
import StageBanner from './components/ui/StageBanner.jsx';
import CardContainer from './components/layout/CardContainer.jsx';
import Thumbnail from './components/Thumbnail/component.jsx'
// import MainStage from './components/layout/MainStage.js';
// import SlideShowContainer from './components/layout/SlideShowContainer.js';
// import LoginPage from './components/cards/LoginPage.js';
// import SelectSlideContainer from './components/layout/SelectSlideContainer.js';
// import PresentationSelectContainer from './components/layout/PresentationSelectContainer.js';
// import SlideEditor from './components/SlideEditor.js';


const createNotFound = nav => update => {
  return {
    view: () => '404 NOT FOUND'
  }
}

//LOGIN 
const createLoginView = (navigator, update) => {
  const LoginPage = createLoginPage(navigator, update)
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

const createPresentationsView = (navigator, update) => {
  const PresentationsPage = createPresentationsPage(navigator, update)
  return {
    view: ({ attrs: { model } }) =>
      [
        <StageBanner action={_ => m.route.set('/login')} title="Presentations" />,
        <CardContainer>
          <div class="columns">
            <div class="column is-half">
              <PresentationsPage model={model} />
            </div>
            <div class="column is-half">
              <Thumbnail contents={model.contents} />
            </div>
          </div>
        </CardContainer>
      ]
  }
}

const createSlidesView = (navigator, update) => {
  const SlidesPage = createSlidesSelectionPage(navigator, update)
  return {
    view: ({ attrs: { model } }) =>
      [
        <StageBanner action={_ => m.route.set('/login')} title="Slides" />,
        <CardContainer>
          <div class="columns">
            <div class="column is-half">
              <SlidesPage model={model} />
            </div>
            <div class="column is-half">
              <Thumbnail contents={model.contents} />
            </div>
          </div>

        </CardContainer>
      ]
  }
}

const createSlideShowView = (navigator, update) => {
  const SlideShow = createSlideShowPage(navigator, update)
  return {
    view: ({ attrs: { model } }) =>
      [
        <StageBanner
          action={_ => m.route.set('/login')} />,
        <CardContainer>
          <SlideShow model={model} />
        </CardContainer>
      ]
  }
}

const createEditorView = (navigator, update) => {
  const Editor = createEditorPage(navigator, update)
  return {
    view: ({ attrs: { model } }) => [
      <StageBanner
        action={_ => m.route.set('/login')} />,
      <CardContainer>
        <Editor model={model} />
      </CardContainer>
    ]
  }
}


const routes = update => navigator => [
  { pageId: "LoginView", component: createLoginView(navigator, update), route: "/login" },
  { pageId: "presentations", component: createPresentationsView(navigator, update), route: "/presentations/:name" },
  { pageId: "slidesSelection", component: createSlidesView(navigator, update), route: "/presentations/:name/:presentationId" },
  { pageId: 'Editor', component: createEditorView(navigator, update), route: "/editor/:name/:presentationId/:slideId" },
  { pageId: "SlideShow", component: createSlideShowView(navigator, update), route: "/slideshow/:name/:presentationId" },
]

const createApp = update => {
  const navigator = createNavigator(update)
  navigator.register(routes(update)(navigator), createNotFound(navigator)(update))
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
