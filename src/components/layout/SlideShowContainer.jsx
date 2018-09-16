import m from 'mithril'
import { SlideCard } from '../cards/SlideCard.jsx'
import { log } from '../../utils/index.js'


const SlideShowContainer = vnode => {
    const slideShow = vnode.attrs.model.slideShow
    slideShow.map(log('working???'))
    console.log('slideshow', slideShow)
    return {

        view: () => slideShow.map(
            slide => {
                console.log('slide', slide);
                return <SlideCard slide={slide} />
            })
    }
}

export default SlideShowContainer