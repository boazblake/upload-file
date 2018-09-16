const m = require("mithril");
import Stream from 'mithril/stream';
import { log } from '../../utils/index.js'
import { contains, filter, not, lensProp, over, compose, propEq, tail } from "ramda";

import SlideSelectCard from "./../cards/SlideSelectCard.jsx";
import SlideSelectField from "./../cards/SlideSelectField.jsx";
import { viewModelMap } from "../../utils/index.js";


const SelectSlideContainer = vnode => {
  let _ps = []
  vnode.attrs.model.presentations.map(PS => PS.map(ps => _ps.push(ps)))
  const id = parseInt(m.route.get().split('/')[2])//get the id from url
  const presentation = filter(propEq('id', id), _ps)[0] //remove from array


  const slidesModel = viewModelMap({
    isSelected: Stream(false),
    position: Stream(0)
  });

  const toggleSelection = slide => state => {
    state.isSelected(!state.isSelected());
    return state
  };

  return {
    view: () => {
      return presentation.slides.map(slide => (
        <SlideSelectCard
          slide={slide}
          state={slidesModel}
          edit={editCard}
          toggle={toggleSelection}
        />
      ));
    }
  }
};

const selectedLens = lensProp("isSelected");

const setColor = slideshow => slide =>
  contains(slide, slideshow) ? "yellow" : "green";

export const editCard = slide => m.route.set(`/editor/${slide.id}`);

export default SelectSlideContainer;
