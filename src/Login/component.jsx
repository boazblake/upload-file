import { log } from '../utils/index'
import m from 'mithril'
import { map } from 'ramda'
import UIButton from '../components/ui/UIButton.jsx';
import { updatePresentations, setUser } from '../Models/index.js'
import { getAllPresentationsTask } from '../services/Requests'


const createLoginPage = (navigator, update) => {

    let state = {
        status: { error: false, msg: '' }
    }

    const updateText = field => model => model.setUser(update)(field)

    const onError = state => e => {
        state.status.error = true
        state.status.msg = 'Error with logging in'
    }

    const onSuccess = state => model => data => {
        state.status.error = false
        model.updatePresentations(update)(data)
        return navigator.navigateTo('presentations', { name: model.user.name })
    }

    const login = model => getAllPresentationsTask(model).fork(onError(state), onSuccess(state)(model))

    const reset = state =>
        state = { error: false, msg: '' }

    return {
        view: ({ attrs: { model } }) => {
            return <div class="container">
                <div class="section">
                    <div class="hero is-large">
                        <h2 class="app-title title is-bold">Welcome</h2>
                    </div>
                    <div class="hero">
                        <input class="input" value={model.user.name} oninput={updateText("name")(model)} />
                        {state.status.msg}
                        <UIButton action={() => login(model)} name="LOGIN" />
                    </div>
                </div>
            </div>
        },
        onremove: () => reset()
    }
}

export default createLoginPage