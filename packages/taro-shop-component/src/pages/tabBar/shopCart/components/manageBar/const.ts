export interface IManageBarProps {
  disabled?: boolean

  /** 全选 */
  checkAll: boolean

  handleCheckAll(value: boolean): void

  /**
   * 添加收藏
   * @param data
   */
  onAddCollection?(): void

  /**
   * 删除
   * @param data
   */
  onDel?(): void
}
