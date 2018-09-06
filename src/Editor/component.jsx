import m from 'mithril'
import SlideForm from './SlideForm.jsx';
import { getCurrentSlide, updateSlide, cancelUpdateSlide, formatPreviewText } from './model.js'

const createEditorPage = (navigator, update) => {
    const getSlide = getCurrentSlide('currentSlideId')
    const actions = {
        saveSlide: updateSlide,
        cancelEditing: cancelUpdateSlide,
        previewText: formatPreviewText
    };
    return {
        view: ({ attrs: { model } }) => {
            const slideId = m.route.param('slideId')
            const slide = getCurrentSlide(slideId)(model.slides)
            console.log('slide', slide)
            return <SlideForm title={slide.title} contents={slide.contents} actions={actions} />
        }
    }
}

export default createEditorPage