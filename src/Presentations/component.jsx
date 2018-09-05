import m from 'mithril'
import { loadTask, updatePresentations, updateCurrentPresentationId } from './model.js'
import { log } from '../utils/index'
import PresentationSelectField from '../components/cards/PresentationSelectField.jsx'

const createPresentationsPage = (navigator, update) => {
    let state = {
        status: 'loading', error: ''
    }
    const selectPresentation = (id, name) => {
        updateCurrentPresentationId(update)(id)
        navigator.navigateTo('slidesSelection', { name: name, presentationId: id })
    }

    const onSuccess = state => model => result => {
        state.error = ""
        updatePresentations(update)(result)
        state.status = 'loaded'
    }

    const onError = state => error => {
        console.log('error', error)
        state.status = 'error'
        state.error = 'error with fetching presentations'
    }

    const reset = state =>
        state = {
            status: 'loading', error: ''
        }

    return {
        oninit: ({ attrs: { model } }) => loadTask(model.gists).fork(onError(state), onSuccess(state)(model)),
        view: ({ attrs: { model } }) => {
            if (state.status == 'loaded') {
                return model.presentations.map(p =>
                    <div class="thumb-card card">
                        <div class="slide-fields">
                            <PresentationSelectField
                                fieldValue={p.title}
                            />
                            <PresentationSelectField
                                action={() => selectPresentation(p.id, model.user.name)}
                                fieldValue={<i class="fas fa-select" />}
                            />
                        </div>
                    </div>
                )
            }
        }, onremove: () => reset()
    }
}


export default createPresentationsPage