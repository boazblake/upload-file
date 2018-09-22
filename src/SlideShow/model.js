import { propEq } from 'ramda';

export const setSlides = model =>
    model.currentPresentation.slides.filter(propEq('isSelected', true))
