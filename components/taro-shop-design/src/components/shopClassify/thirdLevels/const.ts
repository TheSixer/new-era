import { ICoventTree } from '@wmeimob/utils/src/tree/types'
import { MenuTreeOutputDto } from '../const'

export interface IThirdLevelsProps {
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
