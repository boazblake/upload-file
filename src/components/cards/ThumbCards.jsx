const m = require('mithril')

import ThumbField from './ThumbField.jsx'

const ThumbCards = {
  view: ({state, attrs}) =>
   <div class="thumb-card card" draggable="true">
          <div class="slide-fields">
            <ThumbField fieldValue={`${attrs.slide.title}`} />
            <ThumbField action={() => toggleSelection(attrs.slide)} fieldColor={{color: setColor(attrs.slide.isSelected)}} fieldValue={<i class="fa fa-star" />} />
            <ThumbField action={() => editCard(attrs.slide)} fieldValue={<i class="fas fa-pen-alt" ></i>} />
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


export const editCard = slide => {
  slide.isEditing = true
  return m.route.set('/editor', {slideId: slide.uuid})
}

export default ThumbCards
