import m from 'mithril'
import { setSlides } from './model.js'
import Preview from '../components/Preview/component.jsx'

const SlideShow = (navigator, update) => {
    let slides = []

    return {
        oninit: ({ attrs: { model } }) =>
            (slides = setSlides(model)),
        view: ({ attrs: { model } }) => {
            return slides.map(s =>
                <div className="hero">
                    <Preview text={() => s.contents} />
                </div>
            )
        }
    }
}



export default SlideShow