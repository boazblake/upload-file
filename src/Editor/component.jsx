import m from 'mithril'
import stream from 'mithril-stream'
import Form from './Form/component.jsx';
import Preview from './Preview/component.jsx'
import { currentSlide, updateSlide, formatPreviewText } from './model.js'
import { clone } from 'ramda'

const createEditorPage = (navigator, update) => {
    const actions = {
        saveSlide: updateSlide,
        cancelEditing: (id, name) => navigator.navigateTo('slidesSelection', { name: name, presentationId: id }),
        previewText: formatPreviewText
    };
    return {
        view: ({ attrs: { model } }) => {
            const slideId = m.route.param('slideId')
            const slide = currentSlide(slideId)(model)
            const _slide = clone(slide)
            _slide.contents = stream(_slide.contents)
            return (
                <div class="columns">
                    <Form title={_slide.title} contents={_slide.contents} actions={actions} id={model.currentPresentationId} name={model.user.name} />
                    <Preview text={_slide.contents} />
                </div>
            )
        }
    }
}

export default createEditorPage