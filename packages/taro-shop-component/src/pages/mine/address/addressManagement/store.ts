import { optionCity } from '@wmeimob/taro-design/src/components/citys-picker/utils'
import { atom } from 'jotai'
import { UserAddressOutPutDto } from '@wmeimob/taro-api'

// 地址详情
export const addressAtom = atom<UserAddressOutPutDto>({})

// 地址选项
export const optionCitysAtom = atom<ReturnType<typeof optionCity>>(optionCity())
