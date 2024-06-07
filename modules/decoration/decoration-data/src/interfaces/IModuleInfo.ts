import { ExoticComponent } from 'react'
import { BasicModuleSignEnum } from '../enums/BasicModuleSignEnum'
import { EModuleCategory } from '../enums/EModuleCategory'

export type IModuleInfo = {
  /** 组件类型 */
  type: BasicModuleSignEnum
  /** 中文名称 */
  cname: string
  /** 图标 */
  icon: string
  /**
   * 所属分类
   * 如未设置。默认分配给基础模块
   */
  category?: EModuleCategory
  /** 默认props方法 */
  getDefaultProps?: (data?: any) => any
  /** 设置组件 */
  settingComponet?: ExoticComponent<any>
}
