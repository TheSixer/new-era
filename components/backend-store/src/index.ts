// import { atom, useAtom } from 'jotai'
import { defineShopConfig } from '@wmeimob/shop-data'

// export const apiUrlAtom = atom('')

const globalData = {
  instance: async (...args: any[]) => {},
  /** 阿里云上传 */
  upload: async (fileList: File[]) => [] as string[],

  isDev: false,
  isUat: false,
  isPrd: false,
  baseUrl: '',
  apiUrl: '',
  systemConfig: defineShopConfig({}),
  loginPath: '/login',
  defaultAccount: 19999999999,
  defaultPwd: 'ocj123456',
  applicationName: '美萌软件',
  publicPath: ''
} as const

export function getGlobalData<T extends typeof globalData, K extends keyof T>(key: K): T[K] {
  return (globalData as any)[key]
}

export function setGlobalData<T = typeof globalData>(key: keyof T, value: any): T
export function setGlobalData<T = typeof globalData>(data: { [p in keyof T]: T[p] }): T

export function setGlobalData(key: any, value?: any) {
  if (typeof key === 'string') {
    ;(globalData as any)[key] = value
  } else {
    Object.keys(key).forEach((kk) => {
      globalData[kk] = key[kk]
    })
  }
  return globalData
}

export function getAllGlobalData() {
  return globalData
}
