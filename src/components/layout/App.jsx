const m = require('mithril');

import Auth from './../../services/auth.js'

import MainStage from './MainStage.jsx'
import NavBar from './NavBar.jsx';

import StageBanner from './../ui/StageBanner.jsx'
import CardContainer from './../layout/CardContainer.jsx'
import ConferenceCards from './../cards/ConferenceCards.jsx'
import CFPCard from './../cards/CFPCard.jsx'
import EntryForm from './../EntryForm.jsx'
import UIButton from './../ui/UIButton.jsx'

const auth = new Auth()

const WelcomeView = () => [
  <h1 class="app-title">Conference Tracker</h1>,
  <h2 class="app-greeting">Welcome</h2>,
  <span class="app-description">Track Conferences and CFP Dates</span>,
  <div class="login-button">
    <UIButton action={()=>auth.login()} buttonName="Login"/>
  </div>
]

const ConferenceApp = cs => [
    <StageBanner action={_ => auth.logout()} title="Conferences" />,
    <CardContainer>
    {
      cs.map( c => <ConferenceCards conference={c} />)
    }
    </CardContainer>
  ]

const CFPView = cs => [
  <StageBanner action={_ => auth.logout()} title="Call For Papers" />,
    <CardContainer>
      {
        cs
        .filter(c => c.CFP)
        .map(onlyCFP => <CFPCard cfp={true} conference={onlyCFP}/>)
      }
    </CardContainer>
  ]

const FormView = _ => [
    <StageBanner action={_ => auth.logout()} title="Add A Conference" />,
    <CardContainer>
      <EntryForm />
    </CardContainer>
  ]



//MOCK DATA
import {getMockData} from './../../store/data.js'
const CONFERENCES = getMockData()


const routes = {
    '/auth':{
      view: () => WelcomeView()
    },
    '/conferences':{
      view: () => ConferenceApp(CONFERENCES)
    },
    '/cfp' : {
      onmatch: () => auth.isAuthenticated() ?
      ({view: () => CFPView(CONFERENCES)})
        : m.route.set('/auth')
    },
    '/entry' : {
      onmatch: () => auth.isAuthenticated() ?
      ({view: () => FormView(CONFERENCES)})
        : m.route.set('/auth')
    }
  }

const App = {
  oncreate: vnode =>{
    const MainStage = vnode.dom.querySelector('.main-stage')
    // *** ADDING THIS HERE  ***
   auth.handleAuthentication();
   // *** IS VERY IMPORTANT ***

    return m.route(MainStage,'/auth', routes)
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
