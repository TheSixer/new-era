import { createContext } from 'react'

interface ISettingContext {
  /** 云上传方法 */
  upload?: any
}

export const SettingContext = createContext<ISettingContext | null>(null)
