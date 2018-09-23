const m = require('mithril');
const marked = require('marked');

const Preview = ({ attrs }) => {

    return {
        view: () =>
            m('section', { id: 'editor-preview', class: 'section' }, [
                m('div', { class: 'editor-preview' }, m.trust(marked(attrs.text() || '')))
            ])
    }
}

export default Preview