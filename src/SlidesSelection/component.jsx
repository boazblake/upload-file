import m from 'mithril'
import stream from 'mithril-stream'
import { viewModelMap, log } from '../utils/index';
import { getSlides } from './model.js'

import SlideSelectField from '../components/cards/SlideSelectField.jsx'

const slideModel = viewModelMap({ isSelected: stream(false), position: stream(0) });

const createSlidesSelectionPage = (navigator, update) => {
    let state = {}

    const toggleSelection = _ => s => {
        s.isSelected(!s.isSelected());
        return s
    };

    const editCard = id => navigator.navigatTo('editor', { id })


    return {
        oninit: ({ attrs: { model } }) =>
            state = getSlides(model),
        view: () => {
            return state.slides.map(slide => {
                const slidesModel = slideModel(slide.id)
                return (
                    <div class="thumb-card card" key={slidesModel.position(slide.id)}>
                        <div class="slide-fields">
                            <SlideSelectField fieldValue={`${slide.title}`} />
                            <SlideSelectField
                                action={() =>
                                    toggleSelection(slide)(slidesModel)
                                }
                                fieldColor={{
                                    color: slidesModel.isSelected() ? "yellow" : "green"
                                }}
                                fieldValue={<i class="fa fa-star" />}
                            />
                            <SlideSelectField
                                action={() => editCard(slide.id)}
                                fieldValue={<i class="fas fa-pen-alt" />}
                            />
                        </div>
                    </div>
                )
            }
            )
        }
    }
}


export default createSlidesSelectionPage