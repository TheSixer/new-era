export interface IOverlayProps {
  /** 是否可见 */
  visible: boolean

  /**
   * 是否启用coverView
   *
   * 由于小程序普通的view无法阻止点击穿透
   * 所以在你需要阻止点击穿透时。可以启用coveView
   * 具体使用参照toast组件
   * @support weapp
   */
  coverView?: boolean
}
