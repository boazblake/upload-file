const m = require('mithril');
import Stream from 'mithril-stream'
const marked = require('marked');
const { assoc, clone, filter, propEq, fromPairs } = require('ramda');
const { v1 } = require('uuid');
import SlideForm from './SlideForm.jsx';
import Preview from './Preview.jsx'
import { SlideModel } from './../models/index.js';

const _state = Stream()


const formatPreviewText = (ev, state) => {
  console.log('update', state)
  return ev.target ? (state.contents = ev.target.value) : '';
}

const bySlideId = id => propEq('id', id);

const log = m => v => {
  console.log(m, v);
  return v;
};

const updateSlide = state => {
  console.log('save state', state);
  history.go(-1);
};

const cancelUpdateSlide = state => {
  console.log('canceled', state)
  let slide = filter(bySlideId(state.slide.id), state.slides);
  history.go(-1);
};

const editingSlideActions = {
  saveSlide: updateSlide,
  cancelEditing: cancelUpdateSlide,
  previewText: formatPreviewText
};

const newSlide = (formDOM, position) => {
  let form = formDOM.querySelector('.form');
  const formData = new FormData(form);
  console.log(fromPairs(Array.from(formData.entries())));
  const newEntry = assoc(
    'position',
    position,
    assoc(
      'uuid',
      v1(),
      assoc('isSelected', false, fromPairs(Array.from(formData.entries())))
    )
  );
  console.log(newEntry);
  form.reset();
};

const cancelNewSlide = state => {
  history.go(-1);
};

const addingSlideActions = {
  saveSlide: newSlide,
  cancelEditing: cancelNewSlide,
  previewText: formatPreviewText
};

const isAddingSlide = (state) => {
  state.slide = SlideModel(0, v1(), '', false, true, '');
  return (state.actions = addingSlideActions);
};

const isEditingSlide = (currentId, state) => {
  let slides = filter(bySlideId(currentId), state.slides);
  let newSlide = clone(slides[0])
  state.actions = editingSlideActions;
  state.slide = newSlide
};

const SlideEditor = vnode => {
  let state = _state({ slide: {}, slides: [], actions: {} })

  state.slides = vnode.attrs.list.slides

  let currentId = m.route.param('slideId');


  return {
    oninit: currentId ? isEditingSlide(currentId, state) : isAddingSlide(state),
    oncreate: formatPreviewText,
    view: () =>
      <div>
        <SlideForm state={state} />
        <Preview state={state} />
      </div>
  }
};

export default SlideEditor;
