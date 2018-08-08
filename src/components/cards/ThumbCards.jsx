const m = require('mithril')

import SlideField from './SlideField.jsx'

const ThumbCards = {
  view: ({state, attrs}) =>
    <div class="card">
      <div class="slide-fields">
        <SlideField fieldValue={`${attrs.slide.title}`} />
        <SlideField fieldValue={<i class="fa fa-star" />} />
      </div>
    </div>
}

export default ThumbCards
