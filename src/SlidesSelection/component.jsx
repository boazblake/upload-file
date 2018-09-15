import m from 'mithril'
import { getCurrentSlides, setSlides, toggleSelection, toEditCard } from './model.js'
import Slide from './Slide/component.jsx'

const createSlidesSelectionPage = (navigator, update) => {
    const actions = { toggleSelection, editCard: toEditCard(navigator) }

    return {
        view: ({ attrs: { model } }) => getCurrentSlides(model).slides.map(slide =>
            <Slide key={slide.id} title={slide.title} actions={actions} slide={slide} />
        )
    }
}


export default createSlidesSelectionPage
