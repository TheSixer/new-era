import { atom } from 'jotai'
import { UserAddressOutPutDto } from '@wmeimob/taro-api'

// 地址详情
export const addressAtom = atom<UserAddressOutPutDto>({
    // province: '上海市'
})

