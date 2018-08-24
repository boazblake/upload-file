const m = require('mithril');
const marked = require('marked');
const { assoc, clone, filter, propEq, fromPairs } = require('ramda');
const { v1 } = require('uuid');

const log = m => v => {
  console.log(m, v);
  return v;
};

import UIButton from './ui/UIButton.jsx';

const SlideForm = {
  view: vnode => {
    console.log('slide from ; need data, actions, style...', vnode);
    return (
      <section class="columns">
        <form name="slide-form" id="slide-form" class="form column is-half">
          <label for="title" class="label">
            {`Slide Title`}
          </label>
          <input
            id="title"
            class="input"
            name="title"
            type="text"
            autocomplete="false"
            value={vnode.attrs.state.slide.title}
          />

          <label for="contents" class="label">
            {`Slide Contents`}
          </label>
          <textarea
            id="contents"
            class="textarea"
            onkeyup={e => previewText(e, vnode.attrs.state.slide)}
            name="contents"
            autocomplete="false"
            value={vnode.attrs.state.slide.contents}
          />
          <UIButton
            action={dom =>
              vnode.attrs.state.actions.saveSlide(
                vnode.dom,
                vnode.attrs.state.slide
              )
            }
            buttonName="Save"
          />
          <UIButton
            action={() =>
              vnode.attrs.state.actions.cancelEditing(vnode.attrs.state)
            }
            buttonName="Cancel"
          />
        </form>

        <section id="editor-preview" class="column is-half">
          <h1 id="preview-title">PREVIEW ##</h1>
          <div id="preview-text">
            {m.trust(marked(vnode.attrs.state.slide.contents || ''))}
          </div>
        </section>
      </section>
    );
  }
};

export default SlideForm;
