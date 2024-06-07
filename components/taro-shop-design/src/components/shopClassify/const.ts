import { ICoventTree } from '@wmeimob/utils/src/tree/types'

export interface IMmCategorysProps {
  /** 默认选中tab索引 */
  defaultTabIndex?: number
  /** 数据 */
  data: TCateItem[]
  /** 点击tab */
  onTabClick?: (item: TCateItem, index: number) => void
  /** 三级点击 */
  onClick?(item: TCateItem): void
}

export type TCateItem = ICoventTree<MenuTreeOutputDto>

export interface MenuTreeOutputDto {
  children?: MenuTreeOutputDto[]

  /** 是否前端展示 */
  frontShow?: boolean

  /**
   * id
   * @format int64
   */
  id?: number

  /** 名称 */
  name?: string
  pic?: string

  /**
   * pid
   * @format int64
   */
  pid?: number

  /**
   * 排序
   * @format int32
   */
  sort?: number
}
