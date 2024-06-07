import { getGlobalData } from '@wmeimob/taro-global-data'

export default (...args) => getGlobalData('instance')(...args)
