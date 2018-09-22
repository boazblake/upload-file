import m from 'mithril'
import { getCurrentSlides, setSlides, toggleSelection, toEditCard } from './model.js'
import Slide from './Slide/component.jsx'
import UIButton from '../components/ui/UIButton.jsx';
import Sortable from 'sortablejs'
import { getSlidesTask } from '../services/Requests.js'


const createSlidesSelectionPage = (navigator, update) => {
    const state = {
        errors: []
    }
    let slides = []
    const actions = { toggleSelection, editCard: toEditCard(navigator) }
    const toSlideShow = ({ id, name }) => navigator.navigateTo('SlideShow', { name: name, presentationId: id })
    const onError = _state => errors => { console.log('errros', errors); state.errors = errors }
    const onSuccess = _state => _model => ({ title, slides }) => {
        _state.errors = [];
        _model.updateSlides(update)(slides)
        _model.updateTitle(update)(title)
    }
    return {
        oninit: ({ attrs: { model } }) => getSlidesTask(model.currentPresentation.id).fork(onError(state), onSuccess(state)(model)),
        oncreate: ({ dom }) => Sortable.create(dom, { sort: true }),
        view: ({ attrs: { model } }) => {
            slides = model.currentPresentation.slides.map((slide, idx) =>
                <Slide key={idx}
                    model={model}
                    title={slide.title}
                    actions={actions}
                    slide={slide}
                    editDto={{
                        slideId: slide.id
                        , presentationId: model.currentPresentation.id
                        , name: model.user.name
                    }
                    } />
            )

            return (
                <div class="hero" id="slide-container" >
                    < UIButton action={() => toEditCard(navigator)({
                        slideId: '', presentationId: model.currentPresentation.id
                        , name: model.user.name
                    })} name="Add Slide" />
                    {slides}
                    < UIButton action={() => toSlideShow({ id: model.currentPresentation.id, name: model.user.name })} name="Start Presentation" />
                </div >
            )
        }
    }

}


export default createSlidesSelectionPage
