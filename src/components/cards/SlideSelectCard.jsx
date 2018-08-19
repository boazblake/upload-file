const m = require('mithril');

import SlideSelectField from './SlideSelectField.jsx';
import User from './../../services/user.js';

const SlideSelectCard = {
  oninit: vnode => {
    User.setSlides(vnode.attrs.slide);
  },
  view: vnode => {
    const slides = vnode.attrs.slide.slides;
    console.log(slides);
    return slides.map(slide => (
      <div class="thumb-card card" draggable="true">
        <div class="slide-fields">
          <SlideSelectField fieldValue={`${slide.title}`} />
          <SlideSelectField
            action={() => toggleSelection(slide)}
            fieldColor={{ color: setColor(slide.isSelected) }}
            fieldValue={<i class="fa fa-star" />}
          />
          <SlideSelectField
            action={() => editCard(slide)}
            fieldValue={<i class="fas fa-pen-alt" />}
          />
        </div>
      </div>
    ));
  }
};

const toggleSelection = slide => {
  slide.isSelected = !slide.isSelected;
  return slide;
};

const setColor = isSelected => {
  return isSelected ? 'yellow' : 'green';
};

export const editCard = slide => {
  slide.isEditing = true;
  return m.route.set(`/editor/${slide.id}`);
};

export default SlideSelectCard;
