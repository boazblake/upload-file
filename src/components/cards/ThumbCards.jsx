const m = require('mithril')

import ThumbField from './ThumbField.jsx'

const ThumbCards = {
  view: ({state, attrs}) =>
   <div class="thumb-card card" draggable="true">
          <div class="slide-fields">
            <ThumbField fieldValue={`${attrs.slide.title}`} />
            <ThumbField action={() => toggleSelection(attrs.slide)} fieldColor={{color: setColor(attrs.slide.isSelected)}} fieldValue={<i class="fa fa-star" />} />
            <ThumbField fieldValue={<i class="fas fa-pen-alt" ></i>} />
          </div>
        </div>
}

const toggleSelection = (slide) => {
    slide.isSelected = !slide.isSelected
    return slide
  }

const setColor = isSelected => {
  return isSelected ? 'yellow' : 'green'
}


export default ThumbCards
