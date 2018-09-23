const m = require('mithril');

import StageTitle from './StageTitle.jsx';
import NavButton from './NavButton.jsx';


const StageBanner = (vnode) => {
  return {
    view: ({ attrs }) =>
      <div class="stage-banner">
        {attrs.title == 'MithrilJS-Presenter' ? '' : <NavButton icon={<i class="fa fa-arrow-left" />} action={attrs.action} />}
        <StageTitle title={attrs.title} />
      </div>
  }
}



export default StageBanner;
