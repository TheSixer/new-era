declare module 'slash2'
declare module '*.css'
declare module '*.less'
declare module '*.scss'
declare module '*.sass'
declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.bmp'
declare module '*.tiff'
declare module 'omit.js'
declare module 'numeral'
declare module '@antv/data-set'
// declare module 'mockjs';
declare module 'react-fittext'
declare module 'bizcharts-plugin-slider'

// preview.pro.ant.design only do not use in your production ;
// preview.pro.ant.design Dedicated environment variable, please do not use it in your project.
declare let ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: 'site' | undefined

declare const REACT_APP_ENV: 'uat' | 'dev' | false

declare const PUBLIC_PATH: string

declare const API_URL: string | undefined

/**
 * 扩展antdPromColumns的ValueType
 *
 * 目前支持:
 * 城市选择器
 */

declare module 'MMProType' {
  import { ProColumns } from '@ant-design/pro-table'

  export type MMProColumns<T = any, ValueType = 'city'> = ProColumns<T, ValueType>
}
