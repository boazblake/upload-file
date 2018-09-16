const m = require('mithril');

const SlideSelectField = {
  view: ({ attrs }) => (
    <div class={attrs.class} type={attrs.type} onclick={attrs.action} style={attrs.fieldColor}>
      {attrs.fieldValue}
    </div>
  )
};

export default SlideSelectField;
