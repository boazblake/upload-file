const m = require('mithril')
const {assoc,clone, fromPairs} = require('ramda');

import {setMockData} from './../store/data.js'
import UIButton from './ui/UIButton.jsx'

const EntryForm = {
  data:{
    CFP:false
  },
  reset: () => console.log(this),
  view: vnode =>
    <form name="entry-form" id="entry-form" class="form">
      <label for="name" class="label">
        {`Conference Name`}
      </label>
      <input id="name" class="input" name="name" type="text" autocomplete="false" />
      <label for="location" class="label">
        {`Conference Location`}
      </label>
      <input id="location" class="input" name="location" type="text" autocomplete="false" />
      <label for="date" class="label">
          {`Conference Date`}
      </label>
      <input id="date" class="input" name="date" type="text" autocomplete="false" />
      <label class="form-question">
          {`Are You Submitting a Paper ?`}
        <label for="yes-CFP" class="label">Yes</label>
        <input id="yes-CFP" value={vnode.state.CFP} class="radio" name="CFP" type="radio" onclick={() => {vnode.state.CFP = true} } />
        <label for="no-CFP" class="label">No</label>
        <input id="no-CFP" value={vnode.state.CFP} class="radio" name="CFP" type="radio" onclick={() => {vnode.state.CFP = false} } />
      </label>
      { vnode.state.CFP ?
          <label for="cfpDate" class="label">
            {`Call For Papers Deadline`}
            <input id="cfpDate" class="input" name="cfpDate" type="text" autocomplete="false" />
          </label>
            : null
      }
      <UIButton action={dom => entryFormHandler(vnode.dom)} buttonName="Save" />
    </form>
}


const entryFormHandler = formDOM => {
  const formData = new FormData(formDOM)
  const newEntry = assoc('favorite',false,assoc('CFPcomplete',false,fromPairs(Array.from(formData.entries()))))
  setMockData(newEntry)
  formDOM.reset()
}

export default EntryForm
