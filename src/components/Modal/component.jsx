import m from 'mithril'

const Content = {
    addPresentation: ({ value, click, close }) => {
        return (

            m('div', { class: 'modal' }, [
                m('div', { class: 'modal-background' }),
                m('div', { class: 'modal-card' }, [
                    m('header', { class: 'modal-card-head' }, [
                        m('p', { class: 'modal-card-title' }, [
                            m('label', { for: 'title', class: 'label' }, "Add Presentation"),
                        ]),
                        m('button', { class: 'delete', 'aria-label': 'close', onclick: () => close() })
                    ]),
                    m('section', { class: 'modal-card-body' }, [
                        m('input', {
                            onchange: m.withAttr('value', value),
                            type: 'title',
                            class: 'input modal-card-input',
                            name: 'title',
                            type: 'text',
                            autocomplete: false,
                            autofocus: true
                        }),
                    ]),
                    m('footer', { class: 'modal-card-foot' }, [
                        m('button', { class: 'button is-success', type: 'button', onclick: (e) => { e.preventDefault(); click(value) } }, [
                            m('i', { class: 'fa fa-save' })
                        ]),
                    ])
                ])
            ])
        )
    }
}


const Modal = {
    oninit: () => (vnode) => console.log(vnode),
    view: ({ attrs: { type, content } }) =>
        m('div', { class: 'modal' }, [Content[type](content)])


}


export default Modal