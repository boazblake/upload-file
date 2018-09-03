import { log } from '../utils/index'
import m from 'mithril'
import { map } from 'ramda'
import UIButton from '../components/ui/UIButton.jsx';
import { setText, loginTask } from './model.js'


const createLoginPage = update => {
    const updateText = setText(update)
    const onError = log('error')
    const onSuccess = log('sucess')
    const login = name =>
        loginTask(name).fork(onError, onSuccess)

    return {
        view: ({ attrs: { model } }) => {
            return <div class="login container">
                <h1 class="app-title title">Mithril presenter</h1>
                <h2 class="app-description sub-title">
                    Save Your presentations as gists.
                </h2>
                <input class="input" value={model.user.name} oninput={updateText("name")} />
                <UIButton action={() => login(model.user.name)} buttonName="LOGIN" />
            </div>
        }
    }
}

export default createLoginPage