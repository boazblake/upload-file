const m = require('mithril');
const marked = require('marked');

const Preview = ({ attrs }) => {

    return {
        view: () =>
            <section id="editor-preview" class="hero">
                <div id="preview-text">
                    {m.trust(marked(attrs.text()))}
                </div>
            </section>
    }
}

export default Preview