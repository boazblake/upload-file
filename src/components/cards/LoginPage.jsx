const m = require('mithril');
import Task from 'data.task';
import { pluck } from 'ramda';

import Requests from '../../services/Requests.js';
import UIButton from './../ui/UIButton.jsx';

const getPresentationsTask = id => {
  const req =
    new Task((rej, res) => Requests.getPresentations(id).then(res, rej))

  return req
}

const loginTask = user =>
  new Task((rej, res) => Requests.getGists(user.getName()).then(res, rej));

const updateName = user => e => user.setName(e.target.value);

const onError = error => console.error(error);

const onSuccess = model => data => {
  model.presentations(data)
  m.route.set('/presentations')
}



const login = model =>
  loginTask(model)
    .map(pluck('id'))
    .chain(getPresentationsTask)
    .fork(onError, onSuccess(model));

const LoginPage = vnode => {
  const model = vnode.attrs.model

  return {
    view: () => (
      <div class="login container">
        <h1 class="app-title title">Mithril presenter</h1>
        <h2 class="app-description sub-title">
          Save Your presentations as gists.
      </h2>
        <input class="input" onchange={updateName(model)} />
        <UIButton action={() => login(model)} buttonName="LOGIN" />
      </div>
    )
  }
};

export default LoginPage;
