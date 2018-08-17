const m = require('mithril');

import { compose, toLower, filter, prop, path } from 'ramda';

import Task from 'mithril';

const log = m => v => {
  console.log(m, v);
  return v;
};

const byDescription = g =>
  toLower(prop('description', g).split(' ')[0]) == 'prezentation';

const _getGists = username =>
  m.request({
    method: 'GET',
    url: `https://api.github.com/users/${username}/gists`,
    withCredentials: false
  });

const _getPresentations = gist_id =>
  m.request({
    method: 'GET',
    url: `https://api.github.com/gists/${gist_id}`,
    withCredentials: false
  });

const filterForPresentations = gists => filter(byDescription, gists);

const toPresentation = dto =>
  JSON.parse(
    path(['files', 'object-oriented-prezentation.json', 'content'], dto)
  );

const Requests = {
  githubdata: {},
  list: [],
  getGists: username => _getGists(username).then(filterForPresentations),
  getPresentations: id => _getPresentations(id).then(toPresentation),
  loadList: () =>
    m
      .request({
        method: 'GET',
        url: baseUrl + '/prezentations',
        withCredentials: true
      })
      .then(data => {
        console.log('data', data);
        return (Requests.list = data || []);
      }),

  add: (slide, id) =>
    m
      .request({
        method: 'POST',
        url: baseUrl + `/prezentations`,
        data: toViewModel(slide, id),
        withCredentials: true
      })
      .then(data => {
        console.log('data', data);
        return Requests.list.push(data) || [];
      }),

  update: slide =>
    m
      .request({
        method: 'PUT',
        url: baseUrl + `/prezentations/${slide.id}`,
        data: slide,
        withCredentials: true
      })
      .then(data => {
        console.log('data', data);
        return Requests.list.push(data) || [];
      })
};

module.exports = Requests;
