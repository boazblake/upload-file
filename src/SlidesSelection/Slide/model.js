import { compose, view, lensPath } from 'ramda'

const firstSlideLens = id => lensPath(['slides', id, 'contents'])

const getFirstSlide = id =>
    compose(view(firstSlideLens(id)))

export { getFirstSlide }