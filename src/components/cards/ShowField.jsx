const m = require('mithril')


const ShowField = {
  view: ({attrs}) =>
    <div class="box">
      {attrs.fieldValue}
    </div>
}

export default ShowField
