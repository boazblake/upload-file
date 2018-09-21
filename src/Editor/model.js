const { compose, identical, not, last, split, prop } = require('ramda');


export const updateText = state => text => state.contents(text)

export const formatPreviewText = update => compose(updateText(update))

const getId = compose(last, split('/'), prop('url'))

export const dirty = state => ({ title, contents }) => {
    let oldContents = JSON.stringify(state.slide.contents())
    let newContents = JSON.stringify(contents())
    let oldTitle = JSON.stringify(state.slide.title)
    let newTitle = JSON.stringify(title)

    console.log('OLD>>>>', oldTitle, 'NEW>>>>>>', newTitle)
    console.log('OLD>>>>>', oldContents, 'NEW>>>>>', newContents)
    console.log('diff title', identical(oldTitle, newTitle))
    console.log('diff Contents', identical(oldContents, newContents))
    return identical(oldContents, newContents) || identical(oldTitle, newTitle)
}

export const updateSlideTask = update => ({ title, contents }) => {
    console.log()
    let id = getId(update())
    saveSlideTask(id)({ id, title, contents })
};



