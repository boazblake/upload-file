const m = require('mithril');
const marked = require('marked');
const { assoc, clone, filter, propEq, fromPairs } = require('ramda');
const { v1 } = require('uuid');
import SlideForm from './SlideForm.jsx';
const log = m => v => {
  console.log(m, v);
  return v;
};

const saveSlide = (formDOM, position) => {
  let form = formDOM.querySelector('.form');
  const formData = new FormData(form);
  console.log(fromPairs(Array.from(formData.entries())));
  const newEntry = assoc(
    'position',
    position,
    assoc(
      'uuid',
      v1(),
      assoc(
        'isEditing',
        false,
        assoc('isSelected', false, fromPairs(Array.from(formData.entries())))
      )
    )
  );
  console.log(newEntry);
  form.reset();
};

const isAddingSlide = vnode => {
  console.log('addiong ne slide ', vnode);
  return vnode;
};

const isEditingSlide = (currentId, slides, vnode) => {
  console.log('is editing a slide ', currentId, slides, vnode);
  const bySlideId = propEq('id', parseInt(currentId));
  let slide = filter(bySlideId, slides);
  console.log('si this the slide ?', slide);
  slide.map(s => {
    vnode.state.title = s.title;
    vnode.state.contents = s.contents;
    vnode.state.id = currentId;
  });
};

const load = vnode => {
  let slides = vnode.attrs.list.slides;
  console.log('slideform slides', slides);
  let currentId = m.route.param('slideId');
  return currentId ? isEditingSlide(currentId, slides, vnode) : isAddingSlide();
};

const previewText = (ev, state) =>
  ev.target ? (state.contents = ev.target.value) : '';

const SlideEditor = {
  oninit: load,
  oncreate: previewText,
  state: {},
  data: {
    text: 'ADD TEXT'
  },
  reset: () => console.log(this),
  view: vnode => <SlideForm slide={vnode.state} saveSlide={saveSlide} />
};

export default SlideEditor;
