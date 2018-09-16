import O from "patchinko/constant"
import { getGistsTask } from '../services/Requests'
import { log } from '../utils/index'
import { pluck } from 'ramda'

export const setText = update => field => e => update({ user: O({ [field]: e.target.value }) })

export const loginTask = name => getGistsTask(name).map(pluck('id'))

export const updateGists = update => data => update({ gists: O(data) })