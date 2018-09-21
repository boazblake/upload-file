import m from 'mithril'
import { getFirstSlide } from './model.js'

const Presentation = ({ attrs }) => {
    const model = attrs.model
    const id = attrs.id
    return {
        view: () =>
            < div class="thumb-card card" onmouseover={() => model.contents(attrs.preview)}>
                <div class="slide-fields">
                    <div class="title slide-field">
                        {attrs.title}
                    </div>
                    <div className="button slide-field" onclick={() => attrs.select(attrs.id, attrs.name)}>
                        {attrs.icon}
                    </div>
                </div>
            </div >
    }
}

export default Presentation