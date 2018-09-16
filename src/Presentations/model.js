import m from 'mithril'
import O from 'patchinko/constant'
import { getPresentationsTask } from '../services/Requests'
import { traverse, compose, map, flatten, addIndex, unnest } from 'ramda';
import Task from 'data.task'
import { log } from '../utils/index'

const mapIndexed = addIndex(map)

const fetchPresentationsTask = traverse(Task.of, getPresentationsTask)

const toViewModel = (data, idx) => ({ id: idx, ...data })

export const loadTask = compose(
    map(mapIndexed(toViewModel)), map(unnest), fetchPresentationsTask
)

export const updatePresentations = update => data => update({ presentations: O(data) })

