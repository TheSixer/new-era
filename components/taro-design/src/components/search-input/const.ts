import { InputProps } from '@tarojs/components/types/Input'
import { ReactNode } from 'react'
import { IComponentProps } from '../types'

export interface ISearchInputProps extends Pick<InputProps, 'placeholder' | 'focus' | 'onFocus' | 'onBlur'>, IComponentProps {
  /** 默认初始值 */
  defaultValue?: string

  /** 是否可以清除 */
  clear?: boolean

  /** 是否只读 */
  readonly?: boolean

  /** 搜索文本 */
  searchText?: string

  /**
   * 自定义渲染尾部内容
   *
   * 此时searchText字段将失效
   */
  renderSuffix?: ReactNode

  /** 点击搜索事件 */
  onSearch?: (value: string) => void

  /** 点击清除事件 */
  onClear?: () => void
}

export interface ISearchInputState {
  value: string
}
