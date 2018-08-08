const m = require('mithril')


const SlideField = {
  view: ({attrs}) =>
    <div class="box">
      {attrs.fieldValue}
    </div>
}

export default SlideField
