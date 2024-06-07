export interface IMMSwitchProps {
  /**
   *  选中状态
   *
   * @type {boolean}
   * @memberof IMMSwitchProps
   */
  checked: boolean
  /**
   * 是否禁用
   *
   * @type {boolean}
   * @memberof IMMSwitchProps
   */
  disabled?: boolean
  /**
   * 改变事件
   *
   * @memberof IMMSwitchProps
   */
  onChange?: (checked: boolean) => void
}
