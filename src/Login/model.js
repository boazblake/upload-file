import O from "patchinko/constant"
import { getGistsTask } from '../services/Requests'

export const setText = update => field => e => update({ user: O({ [field]: e.target.value }) })

export const loginTask = name => getGistsTask(name)