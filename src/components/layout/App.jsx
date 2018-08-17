const m = require('mithril');
import User from '../../services/user.js';

import MainStage from './MainStage.jsx';
import NavBar from './NavBar.jsx';

import StageBanner from './../ui/StageBanner.jsx';
import CardContainer from './../layout/CardContainer.jsx';
import PresentationContainer from '../layout/PresentationContainer.jsx';
import LoginPage from '../cards/LoginPage.jsx';
import ThumbCards from './../cards/ThumbCards.jsx';
import SlideCard from './../cards/SlideCard.jsx';
import SlideForm from './../SlideForm.jsx';

const LoginView = () => [
  <StageBanner action={_ => console.log('logout')} title="Login" />,
  <CardContainer>
    <LoginPage user={User} />
  </CardContainer>
];

const Presentations = () => [
  <StageBanner action={_ => console.log('lalala')} title="Presentations" />,
  <CardContainer>
    <PresentationContainer user={User} />
  </CardContainer>
];

const Organizer = items => [
  <StageBanner action={_ => console.log('lalala')} title="Organizer" />,
  <CardContainer>
    {items.map(slide => (
      <ThumbCards slide={slide} />
    ))}
  </CardContainer>
];

const SlideShow = slides => [
  <StageBanner action={_ => auth.logout()} title="TODO:: GET DB NAME HERE" />,
  <CardContainer>
    {slides.filter(slide => slide.isSelected).map(selected => (
      <SlideCard isSelected={true} slide={selected} />
    ))}
  </CardContainer>
];

const SlideEditor = list => [
  <StageBanner action={_ => auth.logout()} title="Add A Slide" />,
  <CardContainer>
    <SlideForm list={list} />
  </CardContainer>
];

//MOCK DATA
import { getMockData } from './../../store/data.js';
const SLIDES = getMockData();

const routes = {
  '/login': {
    view: () => LoginView(User)
  },
  '/prezentations': {
    view: () => Presentations(User.Ps)
  },
  '/organizer': {
    view: () => Organizer(SLIDES)
  },
  '/slideshow': {
    view: () => SlideShow(SLIDES)
  },
  '/editor': {
    view: () => SlideEditor(SLIDES)
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
