const m = require('mithril');

import NavButton from './../ui/NavButton.jsx';

const NavBar = {
  view: () =>
            <div class="nav-bar">
            <NavButton path={`/editor`} icon={<i class="fa fa-edit" />}></NavButton>
            <NavButton path={`/organizer`} icon={<i class="fa fa-sitemap" />}></NavButton>
            <NavButton path={`/slideshow`} icon={<i class="fab fa-slideshare" />}></NavButton>
            </div>
};

export default NavBar;
