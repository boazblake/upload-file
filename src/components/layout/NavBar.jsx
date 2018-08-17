const m = require('mithril');

import NavButton from './../ui/NavButton.jsx';

const NavBar = {
  view: () => (
    <div class="nav-bar">
      <NavButton path={`/editor`} icon={<i class="fa fa-edit" />} />
      <NavButton path={`/prezentations`} icon={<i class="fa fa-selection" />} />
      <NavButton path={`/organizer`} icon={<i class="fa fa-sitemap" />} />
      <NavButton path={`/slideshow`} icon={<i class="fab fa-slideshare" />} />
    </div>
  )
};

export default NavBar;
