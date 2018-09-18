import m from 'mithril'
import Preview from '../Preview/component.jsx';

const Thumbnail = ({ attrs }) => {
    return {
        onupdate: ({ dom }) => {
            dom.animate({
                opacity: [0.5, 0.9, 1],
                offset: [0, 0.8],
                easing: ['ease-in', 'ease-out'],
            }, 1200)
        },
        onbeforeremove: ({ dom }) => dom.classList.add('fancyout'),
        view: () =>
            <div class="card section-padding-large">
                <Preview text={() => attrs.contents()} />
            </div>
    }
}

export default Thumbnail