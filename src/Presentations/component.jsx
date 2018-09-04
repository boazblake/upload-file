import m from 'mithril'
import { loadTask } from './model.js'
import { log } from '../utils/index'
import PresentationSelectField from '../components/cards/PresentationSelectField.jsx'

const createPresentationsPage = (navigator, update) => {
    let state = {
        status: 'loading', error: ''
    }
    const selectPresentation = id =>
        m.route.set(`/slides/${id}`);

    const onSuccess = state => model => result => {
        state.error = ""
        model.presentations = result
        state.status = 'loaded'
    }

    const onError = state => error => {
        console.log('error', error)
        state.status = 'error'
        state.error = 'error with fetching presentations'
    }

    return {
        oninit: ({ attrs: { model } }) => loadTask(model.gists).fork(onError(state), onSuccess(state)(model)),
        view: ({ attrs: { model: { presentations } } }) => {
            if (state.status == 'loaded') {
                return presentations.map(p =>
                    <div class="thumb-card card">
                        <div class="slide-fields">
                            <PresentationSelectField
                                fieldValue={p.title}
                            />
                            <PresentationSelectField
                                action={() => selectPresentation(p.id)}
                                fieldValue={<i class="fas fa-select" />}
                            />
                        </div>
                    </div>
                )
            }
        }
    }
}


export default createPresentationsPage