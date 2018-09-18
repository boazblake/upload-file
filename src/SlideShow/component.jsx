import m from 'mithril'
import { setSlides } from './model.js'
import Preview from '../components/Preview/component.jsx'
import UIButton from '../components/ui/UIButton.jsx'

const SlideShow = (navigator, update) => {
    let allSelectedSlides = []
    let currentSlide = {}
    let idx = 0

    const nextSlide = next => {
        console.log(allSelectedSlides)
        let nextIdx = idx + next
        return idx = nextIdx > allSelectedSlides.length ? allSelectedSlides.length : nextIdx < 0 ? 0 : nextIdx
    }

    return {
        oninit: ({ attrs: { model } }) => {
            (allSelectedSlides = setSlides(model))
            currentSlide = idx => allSelectedSlides[idx]
        },
        view: ({ attrs: { model } }) => {
            return (< div class="container hero" >
                <Preview text={() => currentSlide(idx).contents} />
                < UIButton action={() => nextSlide(-1)} name="<< PREV" />
                < UIButton action={() => nextSlide(+1)} name="NEXT >>" />
            </div >)
        }
    }
}



export default SlideShow