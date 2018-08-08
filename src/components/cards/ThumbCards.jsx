const m = require('mithril')

import ThumbField from './ThumbField.jsx'

const ThumbCards = {
  view: ({state, attrs}) =>
    <div class="card">
      <div class="slide-fields">
        <ThumbField fieldValue={`${attrs.slide.title}`} />
        <ThumbField fieldValue={<i class="fa fa-star" />} />
        <ThumbField fieldValue={<i class="fas fa-pen-alt"></i>} />
      </div>
    </div>
}

export default ThumbCards
