const m = require('mithril');

import StageTitle from './StageTitle.jsx';
import NavButton from './NavButton.jsx';


const StageBanner = (vnode) => {
  return {
    view: ({ attrs }) =>
      <div class="stage-banner">
        <div className="nav-bar">
          {attrs.title == 'Login' ? '' : <NavButton action={() => console.log(window.history)} icon={<i class="fa fa-arrow-left"></i>} />}
          <StageTitle title={attrs.title} />
          <NavButton action={attrs.action} icon={<i class="fas fa-hand-peace"></i>} />
        </div>
      </div>
  }
}



export default StageBanner;
