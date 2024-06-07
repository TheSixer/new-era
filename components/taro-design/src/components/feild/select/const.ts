import { IMMPopupProps } from '../../popup/const'
import { IFeildContainerProps } from '../const'
export interface ISelectProps<ValueType = any> extends IFeildContainerProps {
  /** 选中的值 */
  value: ValueType

  /** 选项 */
  options: { label: string; value: ValueType }[]

  /** 对 MMPopup 组件进行设置 */
  fieldProps?: Omit<IMMPopupProps, 'visible' | 'onClose'>

  /** 占位提示符 */
  placeholder?: string

  /** 选择框发生变化 */
  onChange?(value: ValueType): void

  /**
   * 当选择框弹出或隐藏时事件
   */
  onShowChange?(show: boolean): void
}
