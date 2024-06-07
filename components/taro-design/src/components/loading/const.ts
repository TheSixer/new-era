/* eslint-disable no-use-before-define */
export interface MMLoadingProps {
  /**
   * icon 宽高
   */
  size?: number

  /**
   * 类型
   */
  type?: ELoadingType | keyof typeof ELoadingType

  /** 颜色 */
  color?: string

  /**
   * 灰色调
   * 一般跟组件的diaabled配合
   */
  gray?: boolean
}

export enum ELoadingType {
  /** 果冻样式 */
  jelly = 'jelly',

  /**  spin样式 */
  spinner = 'spinner',

  /** 闪烁点 */
  fadeDot = 'fadeDot',

  /** 旋转圆圈 */
  rotate = 'rotate',

  ball = 'ball'
}
