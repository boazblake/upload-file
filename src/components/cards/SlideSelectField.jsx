const m = require('mithril');

const SlideSelectField = {
  view: ({ attrs }) => (
    <div class="slide-field" onclick={attrs.action} style={attrs.fieldColor}>
      {attrs.fieldValue}
    </div>
  )
};

export default SlideSelectField;
