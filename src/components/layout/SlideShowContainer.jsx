import m from 'mithril'
import { SlideCard } from '../cards/SlideCard.jsx'
import { log } from '../../utils/index.js'


const SlideShowContainer = vnode => {
    const slideShow = vnode.attrs.model.slideShow
    return {

        view: () => slideShow.map(
            slide => {
                return <SlideCard slide={slide} />
            })
    }
}

export default SlideShowContainer