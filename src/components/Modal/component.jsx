import m from 'mithril'

const savePresentation = e => {

    console.log('saving presentation in modal', e)
}




const Content = {
    addPresentation: ({ value, click }) => {
        return (<form class="form modal-content" onsubmit={(e) => { e.preventDefault(); click(value) }} >
            <label for="title" class="label">
                {"Add Presentation"}
            </label>
            <input
                onchange={({ target }) => value(target.value)}
                id="title"
                class="input"
                name="title"
                type="text"
                autocomplete="false"
                autofocus="true"
            />
            <button class="button" type="submit" >
                <i class="fa fa-save"></i>
            </button>
        </form >)
    }
}


const Modal = {
    oninit: () => (vnode) => console.log(vnode),
    view: ({ attrs: { type, content } }) => {
        return m('div',
            {
                class: "modal"
            },
            Content[type](content)
        )
    }
}


export default Modal