const m = require('mithril')

const UIButton = {
  view: ({ attrs }) =>
    <div onclick={attrs.action} class="ui-button">
      <span>{attrs.name}</span>
    </div>
}


export default UIButton
