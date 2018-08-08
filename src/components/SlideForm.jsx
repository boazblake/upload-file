const m = require('mithril')
const marked = require('marked')
const {assoc,clone, fromPairs} = require('ramda');
const { v1  } = require('uuid')

import {setMockData} from './../store/data.js'
import UIButton from './ui/UIButton.jsx'

const EntryForm = {
  oninit: previewText,
  data:{
    isSelected:false,
    contents:'ADD TEXT'
  },
  reset: () => console.log(this),
  view: vnode =>
    <section class="columns">
      <form name="slide-form" id="slide-form" class="form column">
        <label for="title" class="label">
          {`Slide Title`}
        </label>
        <input id="title" class="input" name="title" type="text" autocomplete="false" />

        <label for="contents" class="label">
          {`Slide Contents`}
        </label>
        <textarea id="text" class="textarea" onkeyup={e => previewText(e, vnode.state)} name="text"  autocomplete="false" />
        <UIButton action={dom => entryFormHandler(vnode.dom, vnode.attrs.position)} buttonName="Save" />
      </form>
      <section class="coulmn">
        <h1>PREVIEW ##</h1>
      { m.trust(marked(vnode.state.contents || ''))}
      </section>
    </section>

}


const entryFormHandler = (formDOM, position) => {
  let form = formDOM.querySelector('.form')
  const formData = new FormData(form)
  const newEntry = assoc('position',position,assoc('uuid',v1(),assoc('isEditing',false,assoc('isSelected',false,fromPairs(Array.from(formData.entries()))))))
  // console.log('entry', newEntry)
  setMockData(newEntry)
  form.reset()
}


const previewText = (e, state) => {
  state.contents = 'ADD TEXT'
  if (e == undefined) return state
  state.contents = e.target.value
  return m.trust(marked(state.contents))
}

export default EntryForm
