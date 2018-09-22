const m = require('mithril');

import UIButton from '../../components/ui/UIButton.jsx';

const Form = ({ attrs }) => {
  let { title, actions, contents, id, name, model } = attrs
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
          onkeyup={m.withAttr('value', actions.updateText('title', attrs))}
          value={title()}
        />

        <label for="contents" class="label">
          {`Slide Contents`}
        </label>
        <textarea
          id="contents"
          class="textarea"
          onkeyup={m.withAttr('value', actions.updateText('contents', attrs))}
          name="contents"
          autocomplete="false"
          value={contents()}
        />
        <UIButton
          action={() =>
            actions.saveSlide(model)(title(), contents())
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
