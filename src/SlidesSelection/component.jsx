import m from 'mithril'
import { getCurrentSlides, setSlides, toggleSelection, toEditCard } from './model.js'
import Slide from './Slide/component.jsx'
import UIButton from '../components/ui/UIButton.jsx';
import { log } from '../utils/index'
import Sortable from 'sortablejs'


const createSlidesSelectionPage = (navigator, update) => {
    let slides = []
    const actions = { toggleSelection, editCard: toEditCard(navigator) }
    const toSlideShow = (id, name) => navigator.navigateTo('SlideShow', { name: name, presentationId: id })

    return {
        oncreate: ({ dom }) => Sortable.create(dom, { sort: true }),
        view: ({ attrs: { model } }) => {
            slides = getCurrentSlides(model).slides.map((slide, idx) =>
                <Slide key={idx}
                    model={model}
                    title={slide.title}
                    actions={actions}
                    slide={slide}
                    editDto={{
                        slideId: slide.id
                        , presentationId: model.currentPresentationId
                        , name: model.user.name
                    }
                    } />
            )

            return (
                <div class="hero" id="slide-container" >
                    {slides}
                    < UIButton action={() => toSlideShow(model.currentPresentationId, model.user.name)} name="Start Presentation" />
                </div >
            )
        }
    }

}


export default createSlidesSelectionPage
