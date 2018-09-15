import m from 'mithril'
import { getCurrentSlides, setSlides, toggleSelection, toEditCard } from './model.js'
import Slide from './Slide/component.jsx'
import UIButton from '../components/ui/UIButton.jsx';

const createSlidesSelectionPage = (navigator, update) => {
    const actions = { toggleSelection, editCard: toEditCard(navigator) }
    const toSlideShow = (id, name) => navigator.navigateTo('SlideShow', { name: name, presentationId: id })

    return {
        view: ({ attrs: { model } }) => {
            const slides = getCurrentSlides(model).slides.map(slide =>
                <Slide key={slide.id} title={slide.title} actions={actions} slide={slide} />
            )

            return (<div class="hero">
                {slides}
                < UIButton action={() => toSlideShow(model.currentPresentationId, model.user.name)} name="Start Presentation" />
            </div>)
        }
    }
}


export default createSlidesSelectionPage
