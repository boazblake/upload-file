const m = require('mithril')


const SlideField = {
  view: ({attrs}) =>
    <div class="hero">
      {attrs.fieldValue}
    </div>
}

export default SlideField
