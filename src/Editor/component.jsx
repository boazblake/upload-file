import m from 'mithril'
import stream from 'mithril-stream'
import Form from './Form/component.jsx';
import Preview from '../components/Preview/component.jsx'
import { currentSlide, updateSlide, formatPreviewText } from './model.js'
import { clone, propEq } from 'ramda'

const createEditorPage = (navigator, update) => {
    const actions = {
        saveSlide: updateSlide,
        cancelEditing: (id, name) => navigator.navigateTo('slidesSelection', { name: name, presentationId: id }),
        previewText: formatPreviewText
    };
    return {
        view: ({ attrs: { model } }) => {
            let _slide = {}
            const slideId = m.route.param('slideId')
            const slide = model.currentPresentation.slides.filter(propEq('id', slideId))
            slide.map(s => _slide = clone(s))
            _slide.contents = stream(_slide.contents)
            return (
                <div class="columns">
                    <Form title={_slide.title} contents={_slide.contents} actions={actions} id={model.currentPresentation.id} name={model.user.name} />
                    <Preview text={_slide.contents} />
                </div>
            )
        }
    }
}

export default createEditorPage