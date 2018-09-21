import { log } from '../utils/index.js'
const m = require('mithril');
import Task from 'data.task'

import { apiKey } from './mlab.js'

import { map, lensPath, compose, toLower, filter, prop, test, view } from 'ramda';


const baseUrl =
  'https://api.github.com';

const toMlab = `https://api.mlab.com/api/1/databases/mithril-presenter/collections/Slides?${apiKey}`

const toSlidesVm = ({ title, contents, id }) => ({ id, title, contents, isSelected: false })


const toPresentationViewModel = x => ({
  title: prop('Title', x),
  id: view(lensPath(['_id', '$oid']), x),
  preview: view(lensPath(['Slides', 0, 'contents']), x) || 'Add A Slide.'
})

const AddPresentationDto = name => ({ Title: name, Slides: [] })

const _addNewPresentationTask = name =>
  new Task((rej, res) =>
    m.request({
      method: 'POST',
      url: toMlab,
      data: AddPresentationDto(name),
      withCredentials: false
    }).then(res, rej))

const _getAllPresentationsTask = () =>
  new Task((rej, res) =>
    m.request({
      method: 'GET',
      url: toMlab,
      withCredentials: false
    }).then(res, rej))

const Requests = {
  getAllPresentationsTask: () => _getAllPresentationsTask().map(map(toPresentationViewModel)),
  getAPresentationTask: id => _getAPresentationTask(id).map(log(`this presention? ${id}`)),
  addNewPresentationTask: name => _addNewPresentationTask(name).map(log('?')).map(toPresentationViewModel).map(log('??'))
};

module.exports = Requests;
