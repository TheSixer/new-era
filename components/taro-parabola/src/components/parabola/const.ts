import { CSSProperties, ReactNode } from 'react'

/** 默认曲率参数 */
export const DEFAULT_CURVATURE = -1

/** 默认动画时长 */
export const DEFAULT_TIME = 0.5

/** 默认 x 轴方向贝塞尔时间函数 */
export const DEFAULT_CUBIC_BEZIER_X: CSSProperties['transitionTimingFunction'] = 'linear'

export interface IParabolaProps {}

export interface IParabolaRef {
  /** 执行抛物线运动 */
  run: (params: IParabolaRunParams) => void
}

export interface IParabolaLine extends IParabolaRunParams {
  /** 抛物线 id */
  id: number
  /** 抛物线是否运动中 */
  running: boolean
  /** css transition y 轴贝塞尔时间函数 */
  cubicBezier: string
}

export interface IParabolaRunParams {
  /** 起点 [x, y] 坐标（position: fixed 形式） */
  start: number[]
  /** 终点 [x, y] 坐标（position: fixed 形式） */
  end: number[]
  /** 运动动画时长，单位：秒，默认 0.5 */
  time?: number
  /**
   * 曲率参数，默认 -1.0
   * 值范围为 -2.0 ~ 0
   * 0 为水平抛出，顶点位置即为起点位置
   */
  curvature?: number
  /** x 轴方向的 css 时间函数，默认：linear */
  cubicBezierX?: CSSProperties['transitionTimingFunction']
  /** 抛物线中显示的自定义内容 */
  content: (running: boolean) => ReactNode
  /** 抛物线运动结束后回调 */
  onComplete?: () => void
}
