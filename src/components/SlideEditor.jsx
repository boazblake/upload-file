const m = require('mithril');
const marked = require('marked');
const { assoc, clone, filter, propEq, fromPair, map } = require('ramda');
const { v1 } = require('uuid');
import SlideForm from './SlideForm.jsx';
import SlideModel from './../models/index.js';

const STATE = { slide: {}, slides: [], actions: {} };

const bySlideId = id => propEq('id', parseInt(id));

const log = m => v => {
  console.log(m, v);
  return v;
};

const updateSlide = (formDOM, position, id) => {
  let form = formDOM.querySelector('.form');
  const formData = new FormData(form);
  console.log(fromPairs(Array.from(formData.entries())));
  const newEntry = assoc(
    'position',
    position,
    assoc('id', id, fromPairs(Array.from(formData.entries())))
  );
  console.log(newEntry);
  form.reset();
};

const cancelUpdateSlide = state => {
  let slide = filter(bySlideId(state.slide.id), state.slides);
  history.go(-1);
};

const editingSlide = {
  saveSlide: updateSlide,
  cancelEditing: cancelUpdateSlide
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

const addingSlide = {
  saveSlide: newSlide,
  cancelEditing: cancelNewSlide
};

const isAddingSlide = ({ state }) => {
  state.slide = SlideModel(0, v1(), '', false, true, '');
  return (state.actions = addingSlide);
};

const isEditingSlide = (currentId, { state }) => {
  let slide = filter(bySlideId(currentId), state.slides);
  console.log('slide', slide);
  state.actions = editingSlide;
  slide.map(s => (state.slide = s));
  console.log('isEditing: id, state', currentId, state);
};

const load = vnode => {
  vnode.state = clone(STATE);
  vnode.state.slides = vnode.attrs.list.slides;

  let currentId = m.route.param('slideId');
  currentId ? isEditingSlide(currentId, vnode) : isAddingSlide(vnode);
};

const previewText = (ev, state) =>
  ev.target ? (state.contents = ev.target.value) : '';

const SlideEditor = {
  oninit: load,
  oncreate: previewText,
  reset: () => console.log(this),
  view: vnode => {
    console.log('state??!?!?!', vnode.state);
    return <SlideForm state={vnode.state} />;
  }
};

export default SlideEditor;
