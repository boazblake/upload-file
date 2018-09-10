import m from 'mithril'
import O from 'patchinko/constant'
const { assoc, compose, clone, filter, propEq, fromPairs, last, split, prop, merge, map } = require('ramda');
const { v1 } = require('uuid');
import { log } from '../utils/index'

export const getCurrentSlide = id => slides => filter(propEq('id', id), slides)[0]

export const updateText = state => text => state.contents(text)

export const formatPreviewText = update => compose(updateText(update))

const bySlideId = id => propEq('id', id);

const getId = compose(last, split('/'), prop('url'))

const updateContents = updates => slide =>
    merge(slide, updates)

const modifySlide = id => updates =>
    compose(log('?'), map(updateContents(updates)), filter(bySlideId(id)))

export const updateSlide = update => attrs => {
    let id = getId(update())
    let title = attrs.title
    let contents = attrs.contents()
    //filter(bySlideId(id))
    return update({ slides: O(modifySlide(id)({ title, contents })) })
};

export const cancelUpdateSlide = state => {
    console.log('canceled', state)
    let slide = filter(bySlideId(state.slide.id), state.slides);
    history.go(-1);
};


const newSlide = (formDOM, position) => {
    let form = formDOM.querySelector('.form');
    const formData = new FormData(form);
    console.log(fromPairs(Array.from(formData.entries())));
    const newEntry = assoc(
        'position',
        position,
        assoc(
            'uuid',
            v1(),
            assoc('isSelected', false, fromPairs(Array.from(formData.entries())))
        )
    );
    console.log(newEntry);
    form.reset();
};

const cancelNewSlide = state => {
    history.go(-1);
};

const addingSlideActions = {
    saveSlide: newSlide,
    cancelEditing: cancelNewSlide,
    previewText: formatPreviewText
};

const isAddingSlide = (state) => {
    state.slide = SlideModel(0, v1(), '', false, true, '');
    return (state.actions = addingSlideActions);
};

const isEditingSlide = (currentId, state) => {
    let slides = filter(bySlideId(currentId), state.slides);
    let newSlide = clone(slides[0])
    state.actions = editingSlideActions;
    state.slide = newSlide
};

