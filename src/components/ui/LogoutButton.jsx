const m = require('mithril');

const LogOutButton = {
  view: ({attrs}) =>
        <div onclick={attrs.action}>
          <i class="fa fa-sign-out-alt"></i>
        </div>
};

export default LogOutButton;
