import { createContext, useContext, Dispatch } from 'react'
import { MallConfMaterialGroupVo, MallConfMaterialVo, MaterialType } from '../const'

export interface MaterialState {
  /** 类型 */
  type: MaterialType
  /** 分组数据 */
  group: MallConfMaterialGroupVo[]
  /** 列表数据 */
  list: MallConfMaterialVo[]
  /** 当前选中分组id */
  selectedGroup: number | null
  /** 选中素材id 多选 */
  selectedItems: number[]
  /** 选中素材链接 多选 */
  selectedLinks: MallConfMaterialVo[]
  /** 选择素材模式下 选中素材最大值 */
  maxLinkCount: number
}

interface MaterialContext {
  state: MaterialState
  dispatch: Dispatch<ActionType>
}

export const initialState: MaterialState = {
  type: MaterialType.Image,
  list: [],
  group: [],
  selectedGroup: null,
  selectedItems: [],
  selectedLinks: [],
  maxLinkCount: 1
}

const context = createContext<MaterialContext>({
  state: initialState,
  dispatch: () => {}
})

export const { Provider, Consumer } = context

export function useConsumer() {
  return useContext(context)
}

// reducer类型
export type ActionType =
  | { type: 'MaxCount'; max: number }
  | { type: 'SelectedGroup'; selected?: number }
  | { type: 'SelectedList'; selected: number[] }
  | { type: 'SelectedLink'; selected: MallConfMaterialVo[] }
  | { type: 'ChangeGroup'; group: MallConfMaterialGroupVo[] }
  | { type: 'ChangeList'; list: MallConfMaterialVo[] }
  | { type: 'ChangeType'; selected: MaterialType }

export function changeReducer(state: MaterialState, action: ActionType): MaterialState {
  switch (action.type) {
    case 'MaxCount':
      return {
        ...state,
        maxLinkCount: action.max
      }
    case 'SelectedGroup':
      return {
        ...state,
        selectedGroup: action.selected ? action.selected : null
      }
    case 'SelectedList':
      return {
        ...state,
        selectedItems: action.selected
      }
    case 'SelectedLink':
      return {
        ...state,
        selectedLinks: action.selected
      }
    case 'ChangeGroup':
      return {
        ...state,
        group: action.group
      }
    case 'ChangeList':
      return {
        ...state,
        list: action.list
      }
    case 'ChangeType':
      return {
        ...state,
        type: action.selected
      }
    default:
      return state
  }
}
