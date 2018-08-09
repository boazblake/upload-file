const m = require('mithril')
const marked = require('marked')
const { assoc, clone, filter, propEq, fromPairs } = require('ramda');
const { v1  } = require('uuid')

const log = m => v => {console.log(m,v); return v}

import {setMockData} from './../store/data.js'
import UIButton from './ui/UIButton.jsx'


const saveSlide = (formDOM, position) => {
  let form = formDOM.querySelector('.form')
  const formData = new FormData(form)
  const newEntry = assoc('position',position,assoc('uuid',v1(),assoc('isEditing',false,assoc('isSelected',false,fromPairs(Array.from(formData.entries()))))))
  setMockData(newEntry)
  console.log((Array.from(formData.entries())))
  form.reset()
}

const assignSlide = vnode => {
  console.log( 'vnode', vnode)
}

const load = (vnode) => {
  let currentId = m.route.param('slideId')
  let slide = filter(propEq('uuid', currentId),vnode.attrs.list)
  slide.map(s => {
    vnode.state.title = s.title
    vnode.state.text = s.text
  })
}

const previewText = (ev, state) =>
  ev.target ? state.text = ev.target.value  : ''

const SlideForm = {
  oninit: load,
  oncreate:previewText,
  state:{},
  data:{
    text:'ADD TEXT'
  },
  reset: () => console.log(this),
  view: vnode =>
  <section class="columns">
      <form name="slide-form" id="slide-form" class="form column is-half">
        <label for="title" class="label">
          {`Slide Title`}
        </label>
        <input id="title" class="input" name="title" type="text" autocomplete="false" value={vnode.state.title}/>

        <label for="text" class="label">
          {`Slide Contents`}
        </label>
        <textarea id="text" class="textarea" onkeyup={e => previewText(e, vnode.state)} name="text"  autocomplete="false" value={vnode.state.text} />
        <UIButton action={dom => saveSlide(vnode.dom, vnode.attrs.list.length)} buttonName="Save" />
      </form>



      <section id="preview" class="column is-half">
        <h1 id="preview-title">PREVIEW ##</h1>
      <div id="preview-text">
        { m.trust(marked(vnode.state.text || ''))}
      </div>
      </section>
    </section>

}

export default SlideForm
