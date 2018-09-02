const m = require('mithril');

const log = m => v => {
  console.log(m, v);
  return v;
};

import UIButton from './ui/UIButton.jsx';

const SlideForm = {
  view: vnode =>
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
          onkeyup={e => vnode.attrs.state.actions.previewText(e, vnode.attrs.state.slide)}
          name="contents"
          autocomplete="false"
          value={vnode.attrs.state.slide.contents}
        />
        <UIButton
          action={dom =>
            vnode.attrs.state.actions.saveSlide(
              vnode.attrs.state
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
    </section>
};

export default SlideForm;
