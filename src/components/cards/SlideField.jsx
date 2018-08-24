const m = require('mithril');
import marked from 'marked';

const SlideField = {
  view: ({ attrs }) => m('div', { class: 'hero' }, m.trust(attrs.fieldValue))
};

export default SlideField;

// <div class="hero">
//   m.trust(marked(
//   {attrs.fieldValue}
//   ))
// </div>
