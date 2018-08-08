const m = require('mithril');


import MainStage from './MainStage.jsx'
import NavBar from './NavBar.jsx';

import StageBanner from './../ui/StageBanner.jsx'
import CardContainer from './../layout/CardContainer.jsx'
import ThumbCards from './../cards/ThumbCards.jsx'
import SlideCard from './../cards/SlideCard.jsx'
import SlideForm from './../SlideForm.jsx'
import UIButton from './../ui/UIButton.jsx'


const Organizer = slides => [
    <StageBanner action={_ => console.log(`logging out! ...`)} title="Organizer" />,
    <CardContainer>
    {
      slides.map( slide => <ThumbCards slide={slide} />)
    }
    </CardContainer>
  ]

const SlideShow = slides => [
  <StageBanner action={_ => console.log(`logging out! ...`)} title="TODO:: GET DB NAME HERE" />,
    <CardContainer>
      {
        slides
        .filter(slide => slide.isSelected)
        .map(selected => <SlideCard isSelected={true} slide={selected}/>)
      }
    </CardContainer>
  ]

const SlideEditor = _ => [
    <StageBanner action={_ => console.log(`logging out! ...`)} title="Add A Slide" />,
    <CardContainer>
      <SlideForm />
    </CardContainer>
  ]



//MOCK DATA
import {getMockData} from './../../store/data.js'
const SLIDES = getMockData()


const routes = {
    '/organizer':{
      view: () => Organizer(SLIDES)
    },
    '/slideshow' : {
      view: () => SlideShow(SLIDES)
    },
    '/editor' : {
      view: () => SlideEditor(SLIDES)
    }
  }

const App = {
  oncreate: vnode =>{
    const MainStage = vnode.dom.querySelector('.main-stage')
    return m.route(MainStage,'/organizer', routes)
  },

  view: ({children}) =>
  <div class="App">
  <NavBar />
    <MainStage>
      {children}
    </MainStage>
  </div>
}


export default App;
