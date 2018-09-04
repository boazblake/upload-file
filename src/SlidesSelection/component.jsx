import m from 'mithril'
import stream from 'mithril-stream'
import { viewModelMap, log } from '../utils/index';
import { setState } from './model.js'

const slideModel = viewModelMap({ isSelected: stream(false), position: 0 });

const createSlidesSelectionPage = (navigator, update) => {
    const state = {
        title: '',
        slides: [],
        id: '',
    }

    return {
        oninit: ({ attrs: { model } }) => setState(state)(model),
        view: () => <div>SLIDES</div>
    }
}


export default createSlidesSelectionPage