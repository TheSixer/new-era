import { InputProps } from '@tarojs/components/types/Input'
import { CSSProperties, ReactNode, Ref } from 'react'
import { ComponentSize, IComponentProps } from '../types'

export interface IFeildContainerProps extends IComponentProps {
  /** 标题 */
  label?: ReactNode

  /** 名称，作为提交表单时的标识符	 */
  name?: string

  /** 标签样式 */
  labelStyle?: string | CSSProperties

  /**
   * 值文本对齐方式
   *
   * 'right' - 右侧对齐 | 'left'- 左侧对齐 | center-居中
   * @default left
   */
  valueAlign?: 'left' | 'center' | 'right'

  /**
   * 后缀箭头
   */
  suffix?: ReactNode | boolean

  /**
   * 输入框验证规则
   */
  rules?: IFeildRule[]

  /**
   * 尺寸
   */
  size?: ComponentSize

  /**
   * 是否显示星号
   */
  required?: boolean

  /**
   * 是否显示边框
   *
   * @default false
   */
  border?: boolean

  /**
   * 是否只读
   */
  readonly?: boolean

  /**
   * 是否不应用样式
   *
   * 去除默认padding
   */
  noStyle?: boolean
}

export interface IFeildProps extends IFeildContainerProps {
  /** 值 */
  value: string | number

  /**
   * 输入框类型
   */
  type?: TFeildType

  /** 占位提示符 */
  placeholder?: string

  /** 原生inputProps */
  fieldProps?: InputProps

  /** 是否运行清空 */
  allowClear?: boolean

  /**
   * 输入框的值发生变化时
   *
   * 这个是监听的input事件
   */
  onChange?(value: string): void
}

export type TFeildType =
  | InputProps['type']
  // 手机号
  | 'mobile'
  // 自定义
  | 'custom'
  /**
   * 金额
   */
  | 'money'

export interface IFeildRule {
  /**
   * 是否必填
   */
  required?: boolean

  /** 错误信息 */
  message?: string

  /** 自定义验证表格 */
  validate?: (rule: IFeildRule, value: string) => Promise<boolean>
}

export type IFeildRef = {
  /** 校验输入框 */
  valid(): Promise<any>

  /** 获取对应字段名的值	 */
  getFieldValue(): any
}
