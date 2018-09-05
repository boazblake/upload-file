import m from 'mithril'
import { setSlides } from './model.js'

const SlideShow = (navigator, update) => {
    let slides = []

    return {
        oninit: ({ attrs: { model } }) =>
            (slides = setSlides(model)),
        view: ({ attrs: { model } }) => {

        }
    }
}



export default SlideShow