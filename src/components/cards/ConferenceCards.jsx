const m = require('mithril')

import ConferenceField from './ConferenceField.jsx'
import CountDownField from './CountDownField.jsx'

 let time =  new Date()

const ConferenceCards = {
  init: ()=>  new Date(),
  view: ({state, attrs}) =>
    <div class="conference-card">
    <div class="conference-fields">
      <ConferenceField fieldValue={`${attrs.conference.name} @ ${attrs.conference.location}`} />
      <ConferenceField fieldValue={<i class="fa fa-star" />} />
    </div>
    <div class="conference-fields">
      <ConferenceField fieldValue={attrs.conference.date} />
      <CountDownField fieldValue={attrs.conference.date} />
    </div>
    </div>
}

export default ConferenceCards
