import { compose, view, lensPath } from 'ramda'

const firstSlideLens = id => lensPath(['presentations', id, 'slides', 0, 'contents'])

const getFirstSlide = id => model => {
    console.log('get first slide id', id, x)
    return compose(view(firstSlideLens(id)))(x)
}

export { getFirstSlide }