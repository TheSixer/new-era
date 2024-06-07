import { IComponentProps } from '../types.d'
import { TextareaProps } from '@tarojs/components/types/Textarea'

export interface ITextareaProps extends Omit<TextareaProps, 'onInput' | 'style' | 'className'>, IComponentProps {
  /** 是否显示限制输入 */
  showLimit?: boolean

  /** 输入框高度 */
  height?: number

  onChange?(value: string): void
}
