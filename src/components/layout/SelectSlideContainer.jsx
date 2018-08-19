const m = require('mithril');
import Stream from 'mithril/stream';

import { contains, without, not, lensProp, over, compose } from 'ramda';

import SlideSelectField from './../cards/SlideSelectField.jsx';
import User from './../../services/user.js';
import { viewModelMap } from './../../models/index.js';

const slidesModel = viewModelMap({
  isSelected: Stream(false),
  position: Stream(0)
});

const toggleSelection = slide => state => {
  console.log('state', state.isSelected());
  state.isSelected(!state.isSelected());
  return User.toggleSelection(slide);
};
const SelectSlideContainer = {
  oninit: vnode => {
    User.setSlides(vnode.attrs.slide);
    vnode.state = slidesModel;
  },
  view: vnode => {
    const slides = vnode.attrs.slide.slides;
    console.log(vnode);
    return slides.map(slide => {
      var slideVM = vnode.state(slide.id);

      return (
        <div class="thumb-card card" draggable="true">
          <div class="slide-fields">
            <SlideSelectField fieldValue={`${slide.title}`} />
            <SlideSelectField
              action={() => toggleSelection(slide)(slideVM)}
              fieldColor={{ color: slideVM.isSelected() ? 'yellow' : 'green' }}
              fieldValue={<i class="fa fa-star" />}
            />
            <SlideSelectField
              action={() => editCard(slide)}
              fieldValue={<i class="fas fa-pen-alt" />}
            />
          </div>
        </div>
      );
    });
  }
};

const selectedLens = lensProp('isSelected');

const setColor = slideshow => slide =>
  contains(slide, slideshow) ? 'yellow' : 'green';

export const editCard = slide => m.route.set(`/editor/${slide.id}`);

export default SelectSlideContainer;
