import m from 'mithril'
import { loadTask, updatePresentations } from './model.js'
import { log } from '../utils/index'
import Presentation from './Presentation/component.jsx'

const createPresentationsPage = (navigator, update) => {
    let state = {
        status: 'loading', error: ''
    }

    const updateId = id => update({ currentPresentationId: id })
    const toSlideSelection = (id, name) => navigator.navigateTo('slidesSelection', { name: name, presentationId: id })

    const onSelect = (id, name) => {
        updateId(id)
        toSlideSelection(id, name)
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



    return {
        oninit: ({ attrs: { model } }) => loadTask(model.gists).fork(onError(state), onSuccess(state)(model)),
        view: ({ attrs: { model } }) => {
            if (state.status == 'loaded') {
                return model.presentations.map((p, idx) =>
                    <Presentation title={p.title} select={onSelect} id={idx} name={model.user.name} icon={< i class="fas fa-check-circle" />} />
                )
            } else {
                "loading ..."
            }
        }
    }
}


export default createPresentationsPage