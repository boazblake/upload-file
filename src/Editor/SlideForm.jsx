const m = require('mithril');

import UIButton from '../components/ui/UIButton.jsx';

const SlideForm = vnode => {
  console.log(vnode)
  return {
    view: () =>
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
            value={vnode.attrs.title}
          />

          <label for="contents" class="label">
            {`Slide Contents`}
          </label>
          <textarea
            id="contents"
            class="textarea"
            onkeyup={m.withAttr('value', vnode.attrs.actions.previewText)}
            name="contents"
            autocomplete="false"
            value={vnode.attrs.contents}
          />
          <UIButton
            action={dom =>
              vnode.attrs.actions.saveSlide
            }
            buttonName="Save"
          />
          <UIButton
            action={() =>
              vnode.attrs.actions.cancelEditing
            }
            buttonName="Cancel"
          />
        </form>
      </section>
  }
}

export default SlideForm;
