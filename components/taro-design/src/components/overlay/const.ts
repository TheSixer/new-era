export interface IOverlayProps {
  /** 是否显示 */
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

  /**
   * 是否显示遮罩颜色
   */
  maskColor?: boolean

  /**
   *  是否以 catch 的形式绑定 touchmove 事件
   */
  catchTouchMove?: boolean

  /**
   * 点击蒙层事件
   */
  onClick?: () => void
}
