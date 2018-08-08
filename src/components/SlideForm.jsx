const m = require('mithril')
const {assoc,clone, fromPairs} = require('ramda');

import {setMockData} from './../store/data.js'
import UIButton from './ui/UIButton.jsx'

const EntryForm = {
  data:{
    isSelected:false
  },
  reset: () => console.log(this),
  view: vnode =>
    <form name="slide-form" id="slide-form" class="form">
      <label for="title" class="label">
        {`Slide Title`}
      </label>
      <input id="title-input" class="input" name="title-input" type="text" autocomplete="false" />

      <label for="contents" class="label">
        {`Slide Contents`}
      </label>
      <input id="contents-input" class="input" name="contents-input" type="text" autocomplete="false" />
      <UIButton action={dom => entryFormHandler(vnode.dom)} buttonName="Save" />
    </form>
}


const entryFormHandler = formDOM => {
  const formData = new FormData(formDOM)
  const newEntry = assoc('position','',assoc(uuid,v1(),assoc('isEditing',false,assoc('isSelected',false,fromPairs(Array.from(formData.entries()))))))
  setMockData(newEntry)
  formDOM.reset()
}

export default EntryForm
