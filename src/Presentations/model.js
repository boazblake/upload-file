import m from 'mithril'
import tagged from 'daggy'
import O from 'patchinko/constant'
import { getPresentationsTask, addNewPresentationTask } from '../services/Requests'
import { traverse, compose, map, flatten, addIndex, unnest } from 'ramda';
import Task from 'data.task'
import { log } from '../utils/index'

const _content = value => JSON.stringify({ "Title": value(), "slides": [] })

const mapIndexed = addIndex(map)

const fetchPresentationsTask = traverse(Task.of, getPresentationsTask)

const toViewModel = (data, idx) => ({ id: idx, ...data })

export const loadTask = compose(
    map(mapIndexed(toViewModel)), map(unnest), fetchPresentationsTask
)

export const updatePresentations = update => data => update({ presentations: O(data) })


const toDtoTask = name => Task.of({
    description: `mithril-prezentation - ${name}`, public: true, files: { [`${name}`]: { content: _content(name) } }
})

export const newPresentationTask = name =>
    toDtoTask(name).chain(addNewPresentationTask).map(log('dto'))