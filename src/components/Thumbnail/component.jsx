import m from 'mithril'
import Preview from '../Preview/component.jsx';

const Thumbnail = vnode => {
    console.log(vnode)
    return {
        onupdate: ({ dom }) => {
            dom.animate({
                opacity: [0, 0.9, 1],
                offset: [0, 0.8],
                easing: ['ease-in', 'ease-out'],
            }, 1200)
        },
        onbeforeremove: ({ dom }) => dom.classList.add('fancyout'),
        view: (vnode) =>
            <div class="card section-padding-large">
                <Preview text={() => vnode.attrs.contents()} />
            </div>
    }
}

export default Thumbnail