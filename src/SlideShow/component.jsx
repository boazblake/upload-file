import m from 'mithril'
import { setSlides } from './model.js'
import Preview from '../components/Preview/component.jsx'
import UIButton from '../components/ui/UIButton.jsx'

const SlideShow = (navigator, update) => {
    let allSelectedSlides = []
    let idx = 0
    let currentSlide = idx => allSelectedSlides[idx]

    const nextSlide = next => {
        console.log(allSelectedSlides)
        let nextIdx = idx + next
        return idx = nextIdx > allSelectedSlides.length ? allSelectedSlides.length : nextIdx < 0 ? 0 : nextIdx
    }

    return {
        oninit: ({ attrs: { model } }) => {
            (allSelectedSlides = setSlides(model))
        },
        view: ({ attrs: { model } }) => {
            return (
                m('section', { class: 'container box slideshow' }, [
                    m(Preview, { text: () => currentSlide(idx).contents }),
                    m('section', { class: 'container actions' }, [
                        m(UIButton, { action: () => nextSlide(-1), name: '<< PREV' }),
                        m(UIButton, { action: () => nextSlide(+1), name: 'NEXT >>' }),
                    ])
                ])
            )
        }
    }
}



export default SlideShow