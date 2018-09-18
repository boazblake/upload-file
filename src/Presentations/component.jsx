import m from 'mithril'
import Stream from 'mithril-stream'
import v1 from 'uuid'
import { loadTask, updatePresentations, newPresentationTask } from './model.js'
import { log } from '../utils/index'
import Presentation from './Presentation/component.jsx'
import UIButton from '../components/ui/UIButton.jsx';
import Modal from '../components/Modal/component.jsx'

const createPresentationsPage = (navigator, update) => {
    let state = {
        presentation: { name: Stream('') },
        status: 'loading',
        error: '',
        showModal: false
    }

    const createPresentation = dto => newPresentationTask(dto).fork(onSuccess(state), onError(state))

    const updateId = id => update({ currentPresentationId: id })
    const toSlideSelection = (id, name) => navigator.navigateTo('slidesSelection', { name: name, presentationId: id })

    const onSelect = (id, name) => {
        updateId(id)
        toSlideSelection(id, name)
    }

    const onSuccess = state => result => {
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
        oninit: ({ attrs: { model } }) => loadTask(model.gists).fork(onError(state), onSuccess(state)),
        view: ({ attrs: { model } }) =>


            m('div', { class: 'container' },
                state.status == 'loaded' ?
                    model.presentations.map((p, idx) =>
                        m(Presentation,
                            {
                                title: p.title,
                                model: model,
                                select: onSelect,
                                id: idx,
                                name: model.user.name,
                                icon: < i class="fas fa-check-circle" />
                            }
                        ))
                    : "loading ...",

                < UIButton action={() => state.showModal = true} name="Add Presentation" />,
                state.showModal ?
                    m(Modal, {
                        type: "addPresentation", content: {
                            value: state.presentation.name, click: (e) => {
                                console.log('stater', createPresentation(state.presentation.name))
                                    ; return state.showModal = false
                            }
                        }
                    }) : ""

            )

    }
}

export default createPresentationsPage