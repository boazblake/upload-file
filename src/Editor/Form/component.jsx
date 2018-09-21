const m = require('mithril');

import UIButton from '../../components/ui/UIButton.jsx';

const Form = ({ attrs }) => {
  let { title, actions, contents, id, name } = attrs
  return {
    view: () =>
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
          value={title}
        />

        <label for="contents" class="label">
          {`Slide Contents`}
        </label>
        <textarea
          id="contents"
          class="textarea"
          onkeyup={m.withAttr('value', actions.previewText(attrs))}
          name="contents"
          autocomplete="false"
          value={contents}
        />
        <UIButton
          action={() =>
            actions.saveSlide(attrs)
          }
          name="Save"
        />
        <UIButton
          action={() =>
            actions.cancelEditing(id, name)
          }
          name="Cancel"
        />
      </form>
  }
}

export default Form;
