import { flatten, filter, prop, propEq } from 'ramda'
import O from 'patchinko/constant'
import { log } from '../utils/index.js'

export const getCurrentSlides = model => filter(propEq('id', model.currentPresentationId), model.presentations)[0]

export const toggleSelection = s => {
  s.isSelected = !s.isSelected
  return s
}

export const toEditCard = nav => ({ slideId, presentationId, name }) =>
  nav.navigateTo('Editor', { slideId, presentationId, name })
