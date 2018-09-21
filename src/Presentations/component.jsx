import m from 'mithril'
import Stream from 'mithril-stream'
import { updatePresentations, newPresentationTask } from './model.js'
import Presentation from './Presentation/component.jsx'
import UIButton from '../components/ui/UIButton.jsx';
import Modal from '../components/Modal/component.jsx'

const createPresentationsPage = (navigator, update) => {
    let state = {
        presentation: { name: Stream('') },
        showModal: false
    }

    const onselect = model => (id, name) => {
        model.setId(update)(id)
        toSlideSelection(id, name)
    }

    const onSuccess = state => model => result => {
        state.error = ""
        updatePresentations(update)(model)(result)
        state.status = 'loaded'
    }

    const onError = state => error => {
        console.log('state, error', state, error)
    }

    const createPresentationTask = model => presentation => {
        state.status = 'loading'
        newPresentationTask(presentation).fork(onError(state), onSuccess(state)(model))
    }

    const toSlideSelection = (id, name) => navigator.navigateTo('slidesSelection', { name: name, presentationId: id })


    return {
        view: ({ attrs: { model } }) =>

            state.status == 'loading' ?
                "LOADING ..."

                :
                m('div', { class: 'container' },
                    model.presentations.map(p =>
                        m(Presentation, {
                            key: p.id,
                            title: p.title,
                            preview: p.preview,
                            model: model,
                            select: onselect,
                            id: p.id,
                            name: model.user.name,
                            icon: < i class="fas fa-check-circle" />
                        }
                        )
                    ),

                    < UIButton action={() => state.showModal = true} name="Add Presentation" />,
                    state.showModal ?
                        m(Modal, {
                            type: "addPresentation", content: {
                                value: state.presentation.name, click: (e) => {
                                    createPresentationTask(model)(state.presentation.name);
                                    return state.showModal = false
                                }
                            }
                        }) : ""

                )

    }
}

export default createPresentationsPage