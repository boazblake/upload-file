import m from 'mithril'
import O from 'patchinko/constant'
const { assoc, compose, clone, filter, propEq, fromPairs, last, split, prop, merge, map } = require('ramda');
const { v1 } = require('uuid');
import { log } from '../utils/index'

export const fromSlides = model => filter(propEq('id', model.currentPresentationId), model.presentations)[0]

const fromSlide = id => slides =>
    filter(propEq('id', id), slides)[0]


export const currentSlide = id =>
    compose(fromSlide(id), prop('slides'), fromSlides)


export const updateText = state => text => state.contents(text)

export const formatPreviewText = update => compose(updateText(update))

const bySlideId = id => propEq('id', id);

const getId = compose(last, split('/'), prop('url'))

const updateContents = updates => slide =>
    merge(slide, updates)

const getSlide = id => updates =>
    compose(map(updateContents(updates)), filter(bySlideId(id)))

export const updateSlide = update => attrs => {
    let id = getId(update())
    let title = attrs.title
    let contents = attrs.contents()
    //filter(bySlideId(id))
    return update({ slides: O(getSlide(id)({ title, contents })) })
};



