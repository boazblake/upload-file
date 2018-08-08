const m = require('mithril');
import MainStage from './MainStage.jsx'
import NavBar from './NavBar.jsx';

import StageBanner from './../ui/StageBanner.jsx'
import CardContainer from './../layout/CardContainer.jsx'
import ConferenceCards from './../cards/ConferenceCards.jsx'
import CFPCard from './../cards/CFPCard.jsx'
import EntryForm from './../EntryForm.jsx'

const ConferenceApp = cs => [
    <StageBanner action={_ => console.log(`logging out!`)} title="Conferences" />,
    <CardContainer>
    {
      cs.map( c => <ConferenceCards conference={c} />)
    }
    </CardContainer>
  ]

const CFPView = cs => [
    <StageBanner action={_ => console.log(`logging out!`)} title="Call For Papers" />,
    <CardContainer>
      {
        cs
        .filter(c => c.CFP)
        .map(onlyCFP => <CFPCard cfp={true} conference={onlyCFP}/>)
      }
    </CardContainer>
  ]

const FormView = _ => [
    <StageBanner action={_ => console.log(`logging out!`)} title="Add A Conference" />,
    <CardContainer>
      <EntryForm />
    </CardContainer>
  ]



//MOCK DATA
import {getMockData} from './../../store/data.js'
const CONFERENCES = getMockData()


const routes = {
    '/conferences':{
      view: () => ConferenceApp(CONFERENCES)
    },
    '/cfp' : {
      view: () => CFPView(CONFERENCES)
    },
    '/entry' : {
      view: () => FormView(CONFERENCES)
    }
  }

const App = {
  oncreate: vnode =>{
    const MainStage = vnode.dom.querySelector('.main-stage')
    return m.route(MainStage,'/conferences', routes)
  },

  view: ({children}) =>
  <div class="App">
    <MainStage>
      {children}
    </MainStage>
    <NavBar />
  </div>
}


export default App;
