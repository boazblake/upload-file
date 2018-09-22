import { saveSlidesTask } from '../services/Requests.js'
import { compose, difference, isEmpty, last, split, prop, not, propEq, findIndex, remove, insert } from 'ramda'

export const toSlideSelection = (navigator, id, name) => navigator.navigateTo('slidesSelection', { name: name, presentationId: id })

export const updateText = state => text => state.contents(text)

export const _updateText = (field, attrs) => text => attrs[field](text)

const getId = compose(last, split('/'), prop('url'))

export const dirty = state => ({ title, contents }) => {
    let oldContents = JSON.stringify(state.slide.contents)
    let newContents = JSON.stringify(contents)
    let oldTitle = JSON.stringify(state.slide.title)
    let newTitle = JSON.stringify(title)

    return not(isEmpty(difference([oldContents], [newContents]))) || not(isEmpty(difference([oldTitle], [newTitle])))
}

export const updateSlideTask = model => update => ({ title, contents }) => {
    let id = getId(update())
    let slide = ({ id, title, contents })
    let oldList = model.currentPresentation.slides
    let idx = findIndex(propEq('id', id))(oldList)
    let newList = remove(idx, 1, oldList)
    model.updateSlides(update)(insert(idx, slide, newList))
    return saveSlidesTask(model.currentPresentation)
}
