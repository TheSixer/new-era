import { DropResult } from 'react-beautiful-dnd'
import { ICoventTree } from '@wmeimob/utils/src/tree/types'

export type TDropResult<T> = DropResult & { sourceItem: T; targentItem: T }

/**
 * 数据DTO
 */
export interface IDragItem extends ICoventTree {
  //
}

interface IDragCardEvent<T> {
  onSort: (result: DropResult) => void
  onEdit: (value: T) => void
  onDelete: (value: T) => void
  // 禁用状态
  isDragDisabled?: boolean
  isEditDisabled?: boolean
  isDeleteDisabled?: boolean
  isStatusDisabled?: boolean
}

/**
 * 拖拽卡片组件列表Props
 */
export interface IDragCardProps<T extends IDragItem = IDragItem> extends IDragCardEvent<T> {
  droppableId: string
  list: T[]
  level?: number
}

/**
 * 拖拽卡片组件单个Props
 */
export interface IDragCardItemProps<T extends IDragItem = IDragItem> extends IDragCardEvent<T> {
  useDraggedId: string
  item: T
  level: number
}
