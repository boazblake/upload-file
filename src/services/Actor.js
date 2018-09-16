import EventEmitter from "events";

const Emitter = new EventEmitter();

const Actor = {
    start(actions) {
        console.log(actions)
        const address = Symbol();
        let state = typeof actions.attrs.model === "function" ? actions.attrs.model() : {};

        Emitter.on(address, function ([method, message]) {
            state = action[method](state, message) || state;
        });

        return address;
    },

    send(target, message) {
        Emitter.emit(target, message);
    }
};

export default Actor;
