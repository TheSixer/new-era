import { InputProps } from '@tarojs/components'
import { ReactNode } from 'react'

export interface IStepperProps {
  /** 值 */
  value: number

  /**
   * 最小值
   */
  min?: number

  /**
   * 最大值
   */
  max?: number

  /**
   * 步进
   *
   * @default 1
   */
  step?: number

  /** 是否禁用 */
  disabled?: boolean

  /** 内容输入框部分 props 覆盖 */
  inputProps?: InputProps

  /** 当 没有 value 或为 0 时，隐藏减号与输入框 */
  hiddenInZero?: boolean

  /**
   * 类型
   * number - 数值
   * digit - 支持小数
   * @default number
   */
  type?: 'number' | 'digit'

  /**
   * 异步处理变化
   * 在真正改变之前进行拦截校验
   * @param value
   */
  beforeChange?(value: number): Promise<boolean>

  /**
   * 值发生变化时
   * @param value
   */
  onChange?(value: number): void

  /** 自定义渲染加号 */
  renderPlus?(isDisabledMax: boolean): ReactNode

  /** 自定义渲染减号 */
  renderMinus?(isDisabledMin: boolean): ReactNode

}
