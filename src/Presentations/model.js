import m from 'mithril'
import O from 'patchinko/constant'
import { getPresentationsTask } from '../services/Requests'
import { traverse, compose, map, head } from 'ramda';
import Task from 'data.task'
import { log } from '../utils/index'

const fetchPresentationsTask = traverse(Task.of, getPresentationsTask)

const toViewModel = data =>
    head(data)

export const loadTask = compose(
    map(toViewModel), fetchPresentationsTask
)

export const updatePresentations = update => data => update({ presentations: O(data) })

export const updateCurrentPresentationId = update => data => {
    update({ currentPresentationId: data })
}