const m = require('mithril');

const AltButton = {
  view: ({attrs}) =>
        <div onclick={attrs.action}>
          <i class="fas fa-hand-peace"></i>
        </div>
};

export default AltButton;
