const m = require('mithril');

import StageTitle from './StageTitle.jsx';
import NavButton from './NavButton.jsx';


const StageBanner = (vnode) => {
  return {
    view: ({ attrs }) =>
      <div class="stage-banner">
        <StageTitle title={attrs.title} />
      </div>
  }
}



export default StageBanner;
