export interface IQuickSearchProps {
  /** 标题 */
  title?: string
  /** */
  values: string[]

  /** 点击选项 */
  onClick?(value: string, index: number): void

  /** 点击清除 */
  onClear?(): void
}
