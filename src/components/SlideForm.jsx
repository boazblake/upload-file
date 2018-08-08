const m = require('mithril')
const {assoc,clone, fromPairs} = require('ramda');

import {setMockData} from './../store/data.js'
import UIButton from './ui/UIButton.jsx'

const EntryForm = {
  oninit: previewText,
  data:{
    isSelected:false,
  },
  reset: () => console.log(this),
  view: vnode =>{
    console.log(vnode)

  return <section class="columns">
      <form name="slide-form" id="slide-form" class="form column">
        <label for="title" class="label">
          {`Slide Title`}
        </label>
        <input id="title-input" class="input" name="title-input" type="text" autocomplete="false" />

        <label for="contents" class="label">
          {`Slide Contents`}
        </label>
        <textarea id="contents-input" class="textarea" onkeyup={e => previewText(e)} name="contents-input"  autocomplete="false" />
        <UIButton action={dom => entryFormHandler(vnode.dom)} buttonName="Save" />
      </form>
      <section class="coulmn">
        <h1>PREVIEW ##</h1>
      { previewText()}
      </section>
    </section>
  }
}


const entryFormHandler = formDOM => {
  const formData = new FormData(formDOM)
  const newEntry = assoc('position','',assoc(uuid,v1(),assoc('isEditing',false,assoc('isSelected',false,fromPairs(Array.from(formData.entries()))))))
  setMockData(newEntry)
  formDOM.reset()
}


const previewText = e => {
  let contents = 'ADD TEXT'
  if (e !== undefined)

  contents = e.target.value

  return m.trust(contents)

  // const formData = new FormData(formDOM)
  // console.log('formData', Array.from(formData.values))
  // const text = ''
}

export default EntryForm
