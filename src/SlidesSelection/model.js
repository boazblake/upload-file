import { compose, filter, prop, propEq } from 'ramda'
import O from 'patchinko/constant'
import { log } from '../utils/index.js'

const getCurrentSlides = model => filter(propEq('id', model.currentPresentationId), model.presentations)[0]

const updateSlides = update => slides => update({ slides: O(slides) })

export const setSlides = update =>
  compose(updateSlides(update), prop('slides'), getCurrentSlides)


export const toggleSelection = s => {
  s.isSelected = !s.isSelected
  return s
}

export const toEditCard = nav => id => nav.navigateTo('editor', { id })