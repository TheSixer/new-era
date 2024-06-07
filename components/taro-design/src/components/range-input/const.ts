export interface IRangeInputProps {
  /** 值 */
  value: string[]

  /** placeholder */
  placeholder?: string | string[]

  /** 最小值 */
  min?: number

  /** 最大值 */
  max?: number

  /**
   * 数值变化
   *
   * @warning 在输入框blur后触发
   */
  onChange?(data: string[]): void
}
