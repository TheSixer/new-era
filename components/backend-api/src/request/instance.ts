import { getGlobalData } from '@wmeimob/backend-store'

export default (...args) => getGlobalData('instance')(...args)
