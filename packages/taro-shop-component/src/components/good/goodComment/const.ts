import { CommentsVO } from '@wmeimob/taro-api'

export interface IGoodCommentProps {
  data: CommentsVO

  hasHandleBtn?: boolean

  hasAppendComment?: boolean

  /** 是否显示商品 */
  showGood?: boolean

  style?: any

  onRefresh?: () => void
}
