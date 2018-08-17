const m = require('mithril');

import Task from 'data.task';

import Requests from '../../services/Requests.js';
import UIButton from './../ui/UIButton.jsx';

const loginTask = user =>
  new Task((rej, res) => Requests.getGists(user.getName()).then(res, rej));

const updateName = user => e => user.setName(e.target.value);

const onError = error => console.error(error);

const onSuccess = user => data => {
  user.setGists(data);
  m.route.set('/prezentations');
};

const login = user => loginTask(user).fork(onError, onSuccess(user));

const LoginPage = {
  view: vnode => (
    <div class="login container">
      <h1 class="app-title title">PREZENTER</h1>
      <h2 class="app-description sub-title">
        Save Your prezentations as gists.
      </h2>
      <input class="input" onchange={updateName(vnode.attrs.user)} />
      <UIButton action={() => login(vnode.attrs.user)} buttonName="LOGIN" />
    </div>
  )
};

export default LoginPage;
