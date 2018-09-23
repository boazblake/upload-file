const m = require('mithril')

const UIButton = {
  view: ({ attrs }) =>
    <button onclick={attrs.action} class="button ui-button">
      <span>{attrs.name}</span>
    </button>
}


export default UIButton
