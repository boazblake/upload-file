const m = require('mithril');
var Stream = require('mithril/stream');
import { compose, toLower, filter, prop, path } from 'ramda';
import Task from 'mithril';

const baseUrl = 'https://api.github.com';

const log = m => v => {
  console.log(m, v);
  return v;
};

const byDescription = g =>
  toLower(prop('description', g).split(' ')[0]) == 'prezentation';

const _getGists = username =>
  m.request({
    method: 'GET',
    url: `${baseUrl}/users/${username}/gists`,
    withCredentials: false
  });

const _getPresentations = gist_id =>
  m.request({
    method: 'GET',
    url: `${baseUrl}/gists/${gist_id}`,
    withCredentials: false
  });

const filterForPresentations = gists => filter(byDescription, gists);

const toPresentation = dto => {
  console.log(
    'dto',
    JSON.parse(
      path(['files', 'object-oriented-prezentation.json', 'content'], dto)
    )
  );

  return JSON.parse(
    path(['files', 'object-oriented-prezentation.json', 'content'], dto)
  );
};

const Requests = {
  getGists: username => _getGists(username).then(filterForPresentations),
  getPresentations: id => _getPresentations(id).then(toPresentation)
};

module.exports = Requests;
