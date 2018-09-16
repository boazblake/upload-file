import Emitter from '../../services/Emitter'

export const state = actions => {
    const address = Symbol()

    let state = typeof action.init === 'function' ? action.init() : {}


    Emitter.on(address, ({ method, msg }) => {
        console.log(msg)
        state = action[method](state, msg) || state
    })
    return address
}