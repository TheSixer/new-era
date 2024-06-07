import { ReactNode } from 'react'
export interface IDialogProps {
  /**
   * 是否显示
   */
  visible: boolean

  /**
   * 标题内容
   */
  title?: ReactNode

  /**
   * 对话框内容
   *
   * @description 更建议直接使用children进行传递
   */
  content?: ReactNode

  /**
   * 显示右上角关闭按钮，点击将触发 onCancel
   *
   * @default false
   */
  closeable?: boolean

  /**
   * 确定文本
   */
  okText?: ReactNode

  /**
   * 确定文字颜色
   */
  okColor?: string

  /**
   * 是否显示取消
   */
  cancel?: boolean

  /** 取消文本 */
  cancelText?: ReactNode

  /** 取消文本颜色 */
  cancelColor?: string

  /**
   * 自定义底部
   *
   * 设为 false 时将不显示整个 footer 区域
   */
  footer?: ReactNode | false

  /**
   * 点击ok时是否显示loading
   * 与onOk配合使用。设置为true时。onOk可以返回为一个Promise函数。
   * 在函数执行期间。确定按钮会显示为一个loading状态
   */
  okLoading?: boolean

  /**
   * 点击确定
   */
  onOk?(): void | Promise<void>

  /** 点击取消 */
  onCancel?(): void
}
