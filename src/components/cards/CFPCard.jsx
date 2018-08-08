const m = require('mithril')

import ConferenceField from './ConferenceField.jsx'

const CFPCard = {
  view : ({attrs}) =>
    <div class="conference-card">
      <div class="conference-fields">
        <ConferenceField fieldValue={`${attrs.conference.name} @ ${attrs.conference.location}`}/>
        <ConferenceField fieldValue={<i class="fa fa-check-circle"/>}/>
      </div>
      <div class="conference-fields">
        <ConferenceField fieldValue={attrs.conference.CFPDate}/>
        <ConferenceField fieldValue={`19 d 20 hr 45 m`}/>
      </div>
    </div>
}


export default CFPCard
