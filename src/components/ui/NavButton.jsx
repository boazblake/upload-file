const m = require('mithril');

const NavButton = {
  view: ({ attrs }) =>
    <div class="button" onclick={attrs.action}>
      {attrs.icon}
    </div>
};

export default NavButton;
