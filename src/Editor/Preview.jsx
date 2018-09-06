const m = require('mithril');
const marked = require('marked');

const Preview = vnode => {
    console.log('vnode', vnode)
    return {
        view: () =>
            <section id="editor-preview" class="column is-half">
                <h1 id="preview-title">PREVIEW ##</h1>
                <div id="preview-text">
                    {m.trust(marked(vnode.attrs.text()))}
                </div>
            </section>
    }
}

export default Preview