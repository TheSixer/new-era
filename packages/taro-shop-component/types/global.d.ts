/// <reference types="@tarojs/taro" />

declare module '*.png'
declare module '*.gif'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.svg'
declare module '*.css'
declare module '*.less'
declare module '*.scss'
declare module '*.sass'
declare module '*.styl'

declare namespace NodeJS {
  interface ProcessEnv {
    TARO_ENV: 'weapp' | 'swan' | 'alipay' | 'h5' | 'rn' | 'tt' | 'quickapp' | 'qq' | 'jd'
    /**
     * 接口地址
     * 在项目根目录.env文件中配置
     */
    TARO_APP_API_URL: string
    /**
     * 阿里云静态地址
     * 在项目根目录.env文件中配置
     * */
    TARO_APP_YUN_OSS: string
  }

  interface Process {}
}

/** 应用环境 */
declare const REACT_APP_ENV: 'dev' | 'uat' | 'prod'
/** 是否是H5端 */
declare const IS_H5: boolean
/** 是否是微信小程序 */
declare const IS_WEAPP: boolean
/** 是否是ReactNative */
declare const IS_RN: boolean
