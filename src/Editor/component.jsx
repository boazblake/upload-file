import m from 'mithril'
import stream from 'mithril-stream'
import Form from './Form/component.jsx';
import Preview from './Preview/component.jsx'
import { getCurrentSlide, updateSlide, cancelUpdateSlide, formatPreviewText } from './model.js'
import { clone } from 'ramda'

const createEditorPage = (navigator, update) => {
    const actions = {
        saveSlide: updateSlide(update),
        cancelEditing: cancelUpdateSlide,
        previewText: formatPreviewText
    };
    return {
        view: ({ attrs: { model } }) => {
            const slideId = m.route.param('slideId')
            const slide = getCurrentSlide(slideId)(model.slides)
            const _slide = clone(slide)
            _slide.contents = stream(_slide.contents)
            return (
                <div>
                    <Form title={_slide.title} contents={_slide.contents} actions={actions} />
                    <Preview text={_slide.contents} />
                </div>
            )
        }
    }
}

export default createEditorPage