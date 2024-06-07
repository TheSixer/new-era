import { ComponentSize, IComponentProps } from '../types'

/** 布局方向 */
export enum EMMRadioDirection {
  /** 垂直 */
  vertical = 'vertical',
  /** 水平 */
  horizontal = 'horizontal'
}

/** 按钮类型 */
export enum EMMRadioType {
  /** 默认 */
  default = 'default',
  /** 按钮 */
  button = 'button'
}

export interface IMMRadioProps extends IComponentProps {
  /**
   * 当前是否选中
   */
  checked?: boolean

  /** 值 */
  value?: any

  /** 禁用 */
  disabled?: boolean

  /**
   * 类型
   * @warn 请通过Group的optionType使用
   * @defalut default
   */
  type?: EMMRadioType | keyof typeof EMMRadioType

  /**
   * 设置组件尺寸
   */
  size?: ComponentSize

  /** 变化时回调函数	 */
  onChange?(val: boolean): void
}

export interface IMMRadioGroupProps<ValutType extends string | number = number> extends IComponentProps {
  /** 指定选中的选项	 */
  value?: ValutType

  /**
   * 是否运行选中之后取消选中
   * @default false
   */
  allowUnCheck?: boolean

  /**
   * 选项类型
   * @defalut default
   */
  optionType?: EMMRadioType | keyof typeof EMMRadioType

  /**
   * 设置组件尺寸
   */
  size?: ComponentSize

  /**
   * 排列方向
   * @default 'vertical'
   */
  direction?: EMMRadioDirection | keyof typeof EMMRadioDirection

  /** 变化时回调函数	 */
  onChange?(val?: ValutType): void
}
