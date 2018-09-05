const m = require('mithril');

const NavButton = {
  view: ({ attrs }) =>
    <button class="nav-button" onclick={attrs.action}>{attrs.icon}</button>
};

export default NavButton;
