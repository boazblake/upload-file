const m = require('mithril');
import User from '../../services/user.js';

import MainStage from './MainStage.jsx';
import NavBar from './NavBar.jsx';

import StageBanner from './../ui/StageBanner.jsx';
import CardContainer from './CardContainer.jsx';
import PresentationSelectContainer from './PresentationSelectContainer.jsx';
import LoginPage from './../cards/LoginPage.jsx';
import SlideSelectCard from './../cards/SlideSelectCard.jsx';
import SlideCard from './../cards/SlideCard.jsx';
import SlideEditor from './../SlideEditor.jsx';

const LoginView = user => [
  <StageBanner action={_ => m.route.set('/login')} title="Login" />,
  <CardContainer>
    <LoginPage user={user} />
  </CardContainer>
];

const Presentations = presentations => [
  <StageBanner action={_ => m.route.set('/login')} title="Presentations" />,
  <CardContainer>
    <PresentationSelectContainer presentations={presentations} />
  </CardContainer>
];

const Slides = items => [
  <StageBanner action={_ => m.route.set('/login')} title="Slides" />,
  <CardContainer>
    {items.map(slide => (
      <SlideSelectCard slide={slide} />
    ))}
  </CardContainer>
];

const SlideShow = slides => [
  <StageBanner
    action={_ => m.route.set('/login')}
    title="TODO:: GET DB NAME HERE"
  />,
  <CardContainer>
    {slides.filter(slide => slide.isSelected).map(selected => (
      <SlideCard isSelected={true} slide={selected} />
    ))}
  </CardContainer>
];

const SLIDE_EDITOR = list => [
  <StageBanner action={_ => m.route.set('/login')} title="Add A Slide" />,
  <CardContainer>
    <SlideEditor list={list} />
  </CardContainer>
];

const routes = {
  '/login': {
    view: () => LoginView(User)
  },
  '/prezentations': {
    view: () => Presentations(User.prezentations)
  },
  '/slides/:PresentationId"': {
    view: () => Slides(User.prezentations)
  },
  '/slideshow': {
    view: () => SlideShow(User.prezentations)
  },
  '/editor/:slideId': {
    view: () => SLIDE_EDITOR(User.slides)
  }
};

const App = {
  oncreate: vnode => {
    const MainStage = vnode.dom.querySelector('.main-stage');

    return m.route(MainStage, '/login', routes);
  },

  view: ({ children }) => (
    <div class="App">
      <NavBar routes={routes} />
      <MainStage>{children}</MainStage>
    </div>
  )
};

export default App;
