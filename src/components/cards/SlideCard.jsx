const m = require('mithril')

import ShowField from './ShowField.jsx'

const SlideCard = {
  view : ({attrs}) =>
    <div class="slide-card">
      <div class="slide-fields">
        <ShowField fieldValue={`${attrs.slide.text}`}/>
      </div>
    </div>
}


export default SlideCard
