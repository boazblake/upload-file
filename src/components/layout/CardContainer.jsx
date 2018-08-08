const m = require('mithril')


const CardContainer = {
  view: ({children}) =>
    <div ondragend={e => dragStop(e)} ondragstart={e => dragStart(e)} id="cards-container" class="hero">{children}</div>
}

const dragStart = ev => {
  ev.dataTransfer.dropEffect = 'move'
  ev.dataTransfer.effectAllowed = 'move'
  console.log('start',ev.dataTransfer)
  return ev
}

const dragStop = ev => {
  ev.preventDefault()

}

export default CardContainer
