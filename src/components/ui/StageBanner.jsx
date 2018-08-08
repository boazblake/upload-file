const m = require('mithril');

import AltButton from './AltButton.jsx';
import StageTitle from './StageTitle.jsx';

const StageBanner = {
  view: ({attrs}) =>
    <div class="stage-banner">
      <StageTitle title={attrs.title} />
      <AltButton action={attrs.action} />
    </div>
};


export default StageBanner;
