const m = require('mithril');
import marked from 'marked';

const SlideField = {
  view: ({ attrs }) => (
    <div class="hero">
      m.trust(marked(
      {attrs.fieldValue}
      ))
    </div>
  )
};

export default SlideField;
