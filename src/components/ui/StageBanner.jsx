const m = require('mithril');

import LogOutButton from './LogoutButton.jsx';
import StageTitle from './StageTitle.jsx';

const StageBanner = {
  view: ({attrs}) =>
    <div class="stage-banner">
      <StageTitle title={attrs.title} />
      <LogOutButton action={attrs.action} />
    </div>
};


export default StageBanner;
