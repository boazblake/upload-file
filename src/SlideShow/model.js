import log from '../utils/index'
import { propEq } from 'ramda';

export const setSlides = model => {
    return model.presentations[model.currentPresentationId].slides.filter(propEq('isSelected', true))
}