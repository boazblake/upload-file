import m from 'mithril'
import stream from 'mithril-stream'
import Form from './Form/component.jsx';
import Preview from '../components/Preview/component.jsx'
import { updateSlideTask, dirty, _updateText, toSlideSelection } from './model.js'
import { clone, propEq } from 'ramda'

const createEditorPage = (navigator, update) => {
    const state = {
        slide: {}, slideId: null, errors: []
    }

    const onError = state => errors => {
        console.log('errors', errors)
        state.errors = errors
    }

    const onSuccess = ({ currentPresentation, user }) => _ => toSlideSelection(navigator, currentPresentation.id, user.name)

    const actions = {
        saveSlide: model => (title, contents) => {
            let data = { title, contents }
            return dirty(state)(data)
                ? updateSlideTask(model)(update)(data).fork(onError(state), onSuccess(model))
                : {}
        },
        cancelEditing: (id, name) => navigator.navigateTo('slidesSelection', { name: name, presentationId: id }),
        updateText: _updateText,
    };
    return {
        view: ({ attrs: { model } }) => {
            state.slideId = m.route.param('slideId')
            model.currentPresentation
                .slides.filter(propEq('id', state.slideId))
                .map(s => state.slide = clone(s))

            state.slide.contents = stream(state.slide.contents)
            state.slide.title = stream(state.slide.title)
            return (
                <div class="columns">
                    <Form title={state.slide.title}
                        contents={state.slide.contents}
                        actions={actions}
                        id={model.currentPresentation.id}
                        name={model.user.name}
                        model={model} />
                    <Preview text={state.slide.contents} />
                </div>
            )
        }
    }
}

export default createEditorPage