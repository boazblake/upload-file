const m = require('mithril')

import ConferenceField from './ConferenceField.jsx'

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
      <ConferenceField fieldValue={`19 d 20 hr 45 m`} />
    </div>
    </div>
}

export default ConferenceCards
