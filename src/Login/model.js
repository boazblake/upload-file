import O from "patchinko/constant"
import Requests from '../services/Requests'
import Task from 'data.task'
export const setText = update => field => e => update({ user: O({ [field]: e.target.value }) })

export const loginTask = name => Task.of(Requests.getGists(name))