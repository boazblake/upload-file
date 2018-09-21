import m from 'mithril'
import stream from 'mithril-stream'
import Form from './Form/component.jsx';
import Preview from '../components/Preview/component.jsx'
import { updateSlideTask, formatPreviewText, dirty } from './model.js'
import { clone, propEq } from 'ramda'

const createEditorPage = (navigator, update) => {
    const state = {
        slide: {}, slideId: null, errors: []
    }

    const onError = state => errors => {
        console.log('errors', errors)
        state.errors = errors
    }

    const onSuccess = _navigator => data => {
        console.log(data)
    }

    const actions = {
        saveSlide: data => {
            console.log(dirty(state)(data))
            return dirty(state)(data)
                ? updateSlideTask(update)(data).fork(onError(state), onSuccess(navigator))
                : {}
        },
        cancelEditing: (id, name) => navigator.navigateTo('slidesSelection', { name: name, presentationId: id }),
        previewText: formatPreviewText
    };
    return {
        view: ({ attrs: { model } }) => {
            state.slideId = m.route.param('slideId')
            model.currentPresentation
                .slides.filter(propEq('id', state.slideId))
                .map(s => state.slide = clone(s))

            state.slide.contents = stream(state.slide.contents)
            return (
                <div class="columns">
                    <Form title={state.slide.title} contents={state.slide.contents} actions={actions} id={model.currentPresentation.id} name={model.user.name} />
                    <Preview text={state.slide.contents} />
                </div>
            )
        }
    }
}

export default createEditorPage