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
  }
}

declare const REACT_APP_ENV: 'uat' | 'dev' | false

declare namespace Taro {
  namespace navigateTo {
    interface Option {
      /**
       * 查询参数
       *
       * 会作为url的query拼接
       */
      params?: Record<string, any>
    }
  }

  namespace redirectTo {
    interface Option {
      /**
       * 查询参数
       *
       * 会作为url的query拼接
       */
      params?: Record<string, any>
    }
  }
}
