import { BasicModuleSignEnum } from '@wmeimob-modules/decoration-data'
import { initContextValue } from './store-context'
import { guid } from '@wmeimob/utils/src/guid'

export type DrayData = {
  /** 唯一id */
  id: string
  /** 类型 */
  type: BasicModuleSignEnum
  /** 数据 */
  data?: any
  /** 是否不可删除 */
  undeletable?: boolean
  /** 是否不可拖拽 */
  undraggable?: boolean
  /**
   * 是否钉住，即dragover事件不在此组件上响应
   * true -钉住  | false -不钉住 | top - 不响应上面 | bottom- 不响应下面
   */
  pushpin?: boolean | 'top' | 'bottom'
  [i: string]: any
}

export function getDefaultModuleData(type: BasicModuleSignEnum, initData?: any): DrayData {
  const { modules } = initContextValue
  const module = modules.find(({ moduleInfo }) => moduleInfo.type === type)

  const baseData: any = { id: guid(), type }
  let data: any
  if (module?.moduleInfo.getDefaultProps) {
    data = module.moduleInfo.getDefaultProps(initData)
  }
  return { ...baseData, data }
}

export const customCardFormItemProps = { labelCol: { span: 5 }, colon: false }
