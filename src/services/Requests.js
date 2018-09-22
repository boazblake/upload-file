import { log } from '../utils/index.js'
const m = require('mithril');
import Task from 'data.task'
import { v1 } from 'uuid'

import { apiKey } from './mlab.js'

import { map, lensPath, compose, toLower, filter, prop, test, view } from 'ramda';

const toMlab = id =>
  id == null || id == undefined
    ? null
    : `https://api.mlab.com/api/1/databases/mithril-presenter/collections/presentations/${id}?${apiKey}`


const toSlidesVm = ({ title, contents, id }) => ({ id, title, contents, isSelected: false })

const toSlidesViewModel = x => ({
  title: prop('Title', x),
  id: view(lensPath(['_id', '$oid']), x),
  slides: prop('Slides', x)
})

const toPresentationViewModel = x => ({
  title: prop('Title', x),
  id: view(lensPath(['_id', '$oid']), x),
  preview: view(lensPath(['Slides', 0, 'contents']), x)
})

const AddPresentationDto = name => ({ Title: name, Slides: [{ title: 'Demo Slide', id: v1(), contents: '![](https://aa1a5178aef33568e9c4-a77ea51e8d8892c1eb8348eb6b3663f6.ssl.cf5.rackcdn.com/p/full/e23e0406-e54c-4451-90e0-928f39f4b449.jpg)' }] })

const _addNewPresentationTask = name =>
  new Task((rej, res) =>
    m.request({
      method: 'POST',
      url: toMlab(''),
      data: AddPresentationDto(name),
      withCredentials: false
    }).then(res, rej))

const _getAllPresentationsTask = () =>
  new Task((rej, res) =>
    m.request({
      method: 'GET',
      url: toMlab(''),
      withCredentials: false
    }).then(res, rej))

const _getSlidesTask = id =>
  new Task((rej, res) =>
    m.request({
      method: 'GET',
      url: toMlab(id),
      withCredentials: false
    }).then(res, rej))

const _updateSlide = id => dto =>
  new Task((rej, res) =>
    m.request({
      method: 'PUT',
      url: toMlab(id),
      data: dto,
      withCredentials: false
    }).then(res, rej))

const Requests = {
  getAllPresentationsTask: () => _getAllPresentationsTask().map(map(toPresentationViewModel)),
  getSlidesTask: id => id ? _getSlidesTask(id).map(toSlidesViewModel) : Task.rejected({ errors: ['Missing Id'] }),
  addNewPresentationTask: name => name ? _addNewPresentationTask(name).map(toPresentationViewModel) : Task.rejected({ errors: ['Missing Name'] }),
  saveSlidesTask: ({ id, title, slides }) => id && title && slides ? _updateSlide(id)({ Title: title, Slides: slides }).map(toPresentationViewModel) : Task.rejected({ errors: ['Missing Dto'] }),

};

module.exports = Requests;
