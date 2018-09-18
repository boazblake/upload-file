import { propEq } from 'ramda';

export const setSlides = model =>
    model.presentations[model.currentPresentationId]
        .slides.filter(propEq('isSelected', true))