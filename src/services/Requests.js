const m = require('mithril');
var Stream = require('mithril/stream');
import { map, compose, toLower, filter, prop, path, test } from 'ramda';


const baseUrl =
  'https://api.github.com';

const log =
  m => v => {
    console.log(m, v);
    return v;
  };

const byDescription =
  compose(test(/^mithril-prezentation/), toLower, prop('description'))

const toPresentation =
  compose(JSON.parse, path(['files', 'object-oriented-prezentation.json', 'content']))


const filterForPresentations = compose(filter(byDescription))

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

const Requests = {
  getGists: username => _getGists(username).then(filterForPresentations),
  getPresentations: id => _getPresentations(id).then(toPresentation)
};

module.exports = Requests;
