const m = require('mithril');
import Task from 'data.task';
import Requests from '../../services/Requests.js';
import { compose, pluck, toLower, filter, prop, traverse } from 'ramda';

const log = m => v => {
  console.log(m, v);
  return v;
};

const getPresentationsTask = gists => {
  let presentations = [];
  let ids = pluck('id', gists);
  ids.map(id => Requests.getPresentations(id).then(p => presentations.push(p)));
  return Task.of(presentations);
};

const savePresentations = user => ps => user.setPs(ps);

const PresentationContainer = vnode => {
  const load = ({ attrs }) => {
    let user = attrs.user;

    getPresentationsTask(user.gists).fork(
      log('error'),
      savePresentations(user)
    );
  };

  return {
    oncreate: load,
    view: ({ attrs }) => {
      console.log('pres', attrs.user.Ps);
      return attrs.user.Ps.map(p => {
        console.log('slides array', p.slides);
        return <div class="presentations container" />;
      });
    }
  };
};

export default PresentationContainer;
