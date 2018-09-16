import { compose, view, lensPath } from 'ramda'

const firstSlideLens = id => lensPath(['presentations', id, 'slides', 0, 'contents'])

const getFirstSlide = id =>
    compose(view(firstSlideLens(id)))

export { getFirstSlide }