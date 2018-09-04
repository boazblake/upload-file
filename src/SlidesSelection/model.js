import { filter, propEq } from 'ramda'

export const setState = state => model => {
    const currentPresentation = filter(propEq('id', model.currentPresentationId), model.presentations)[0]
    return state = { id: model.currentPresentationId, title: currentPresentation.title, slides: currentPresentation.slides }
}