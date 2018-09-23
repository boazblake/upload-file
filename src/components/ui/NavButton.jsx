const m = require('mithril');

const NavButton = {
  view: ({ attrs }) =>
    <button class="button" onclick={() => attrs.action()}>
      {attrs.icon}
    </button>

};

export default NavButton;
