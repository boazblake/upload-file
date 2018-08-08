const m = require('mithril');

import NavButton from './../ui/NavButton.jsx';

const NavBar = {
  view: () =>
            <div class="nav-bar">
            <NavButton path={`/cfp`} icon={<i class="fa fa-microphone" />}></NavButton>
            <NavButton path={`/conference`} icon={<i class="fa fa-users" />}></NavButton>
            <NavButton path={`/entry`} icon={<i class="fa fa-edit" />}></NavButton>
            </div>
};

export default NavBar;
