const m = require('mithril');

const PresentationSelectField = {
  view: ({ attrs }) => (
    <div class="slide-field" onclick={attrs.action} style={attrs.fieldColor}>
      {attrs.fieldValue}
    </div>
  )
};

export default PresentationSelectField;
