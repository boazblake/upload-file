import m from 'mithril'

const Presentation = ({ attrs: { model, select, id, name, preview, title, icon } }) => {
    return {
        view: () =>
            m('article', { class: 'media box', onmouseover: () => model.contents(preview) }, [
                m('div', { class: 'media-content ' }, [
                    m('span', { class: 'selection-title title is-5' }, title)
                ]),

                m('div', { class: 'media-right' }, [
                    m('button', { class: 'selection-button button', onclick: () => select(model)(id, name) }, [
                        icon
                    ]),
                ])
            ])
    }
}

export default Presentation