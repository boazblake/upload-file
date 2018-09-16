import m from 'mithril'
import Preview from '../Preview/component.jsx';

const Thumbnail = vnode => {
    console.log(vnode)
    return {
        view: (vnode) =>
            <Preview text={() => vnode.attrs.contents()} />
    }
}

export default Thumbnail