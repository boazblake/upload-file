import { filter, propEq } from 'ramda'
import { clone } from 'ramda'

export const getSlides = model =>
    filter(propEq('id', model.currentPresentationId), model.presentations)[0]