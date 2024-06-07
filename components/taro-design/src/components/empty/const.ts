/* eslint-disable no-shadow */
import contacts from './images/contacts.png'
import grade from './images/grade.png'
import internet from './images/internet.png'
import location from './images/location.png'
import message from './images/message.png'
import record from './images/record.png'
import data from './images/data.png'
import update from './images/update.png'
import { CSSProperties, ReactNode } from 'react'

export interface IMMEmptyProps {
  /**
   * 快捷类型
   *
   * 通过传递类型直接使用快捷的empty
   */
  // eslint-disable-next-line no-use-before-define
  type?: EMMEmpty | keyof typeof EMMEmpty

  /**
   * 文本
   */
  text?: string

  /**
   * 图片地址
   */
  src?: string

  /**
   * 浮动居中
   */
  fixed?: boolean

  /**
   * 后面需要添加的元素
   */
  suffix?: ReactNode

  /**
   * 图片样式
   */
  imgStyle?: CSSProperties
}

export enum EMMEmpty {
  /** 空数据 */
  data = 'data',
  /** 空联系人 */
  contacts = 'contacts',
  /** 空评分 */
  grade = 'grade',
  /** 无网络连接 */
  internet = 'internet',
  /** 空地址 */
  location = 'location',
  /** 空消息 */
  message = 'message',
  /** 空记录 */
  record = 'record',
  /** 无更新 */
  update = 'update'
}

type TypeMap = Record<
  keyof typeof EMMEmpty,
  {
    text: string
    src: string
    imgStyle?: CSSProperties
  }
>

export const typeMap: TypeMap = {
  [EMMEmpty.contacts]: {
    text: '暂无联系人~',
    src: contacts
  },
  [EMMEmpty.grade]: {
    text: '暂无评分~',
    src: grade
  },
  [EMMEmpty.internet]: {
    text: '连接失败~',
    src: internet
  },
  [EMMEmpty.location]: {
    text: '获取地址失败~',
    src: location
  },
  [EMMEmpty.message]: {
    text: '暂无消息~',
    src: message
  },
  [EMMEmpty.record]: {
    text: '暂无记录~',
    src: record
  },
  [EMMEmpty.update]: {
    text: '暂无更新~',
    src: update
  },
  [EMMEmpty.data]: {
    text: '没有数据~',
    src: data
  }
}
