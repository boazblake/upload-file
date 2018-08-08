const m = require('mithril')


const SlideField = {
  view: ({attrs}) =>
    <div class="slide-field">
      {attrs.fieldValue}
    </div>
}

export default SlideField
