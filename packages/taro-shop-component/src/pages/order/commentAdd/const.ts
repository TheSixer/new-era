import { OrderItemsVO } from '@wmeimob/taro-api'

export interface ICommentAddProps {}

export interface ICommentData extends OrderItemsVO {
  /** 匿名状态 */
  anonymousStatus: number
  /** 星级 */
  star: number
  /** 图片 */
  imglist: string[]
  /** 评论内容 */
  content: string
}

/** 评价字符数上限 */
export const WORDS_LIMIT = 500
