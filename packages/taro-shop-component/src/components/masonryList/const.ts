import { IGoodsVoWithActivity } from '@wmeimob/taro-api/src/types/goods/IGoodsVoWithActivity'

export interface IMasonryListProps {
  data: IGoodsVoWithActivity[]

  gap?: number

  className?: string

  onClick?(data: IGoodsVoWithActivity): void
}

export interface IVarRef {
  /** 列宽度 */
  width: number

  /** 高度缓存表 */
  heightMap: Record<string, number>

  /** 左侧高度 */
  leftHeight: number

  /** 右侧高度 */
  rightHeight: number
}
