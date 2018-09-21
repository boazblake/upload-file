import { addNewPresentationTask } from '../services/Requests'


export const updatePresentations = update => model => presentation =>
    model.updatePresentations(update)(model.presentations.concat(presentation))


export const newPresentationTask = name =>
    addNewPresentationTask(name)