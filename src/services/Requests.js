const m = require('mithril');
import Task from 'data.task'

import { tagged } from 'daggy'
import { log } from './../utils/index.js'
var Stream = require('mithril/stream');
import { map, compose, toLower, filter, prop, path, test, toPairs, addIndex } from 'ramda';

const mapIndexed = addIndex(map)

const baseUrl =
  'https://api.github.com';

const SlidesVm = tagged('id', 'title', 'contents', 'isSelected')

const toSlidesVm = ({ id, title, contents }) => ({ id, title, contents, isSelected: false })

const toPresentationViewModel = (pair, id) => {
  const presentation = JSON.parse(pair[1].content)
  const title = presentation.Title
  const slides = presentation.slides.map(toSlidesVm)
  return { id, title, slides }
}

const toPresentationVM = compose(mapIndexed(toPresentationViewModel), toPairs)

const toPresentation =
  compose(toPresentationVM, prop('files'))

const byDescription =
  compose(test(/^mithril-prezentation/), toLower, prop('description'))

const filterForPresentations = compose(filter(byDescription))

const _getGistsTask = username => new Task((rej, res) =>
  m.request({
    method: 'GET',
    url: `${baseUrl}/users/${username}/gists`,
    withCredentials: false
  }).then(res, rej)
)

const _getPresentations = gist_id =>
  m.request({
    method: 'GET',
    url: `${baseUrl}/gists/${gist_id}`,
    withCredentials: false
  });

const Requests = {
  getGistsTask: username => _getGistsTask(username).map(filterForPresentations),
  getPresentations: id => _getPresentations(id).then(toPresentation)
};

module.exports = Requests;
