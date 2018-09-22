import m from 'mithril'

const Presentation = ({ attrs: { model, select, id, name, preview, title, icon } }) => {
    return {
        view: () =>
            < div class="thumb-card card" onmouseover={() => model.contents(preview)}>
                <div class="slide-fields">
                    <div class="title slide-field">
                        {title}
                    </div>
                    <div className="button slide-field" onclick={() => select(model)(id, name)}>
                        {icon}
                    </div>
                </div>
            </div >
    }
}

export default Presentation