import Taro from '@tarojs/taro'
import { CSSProperties, forwardRef, memo, useImperativeHandle, useState } from 'react'
import { View } from '@tarojs/components'
import { DEFAULT_CUBIC_BEZIER_X, DEFAULT_CURVATURE, DEFAULT_TIME, IParabolaLine, IParabolaProps, IParabolaRef, IParabolaRunParams } from './const'
import styles from './index.module.less'

let id = 0

const Component = forwardRef<IParabolaRef, IParabolaProps>((_props, ref) => {
  const [queue, setQueue] = useState<{ [key: number]: IParabolaLine }>({})

  useImperativeHandle(ref, () => ({
    run: initLine
  }))

  function initLine(params: IParabolaRunParams) {
    id++

    const [, startY] = params.start
    const [, endY] = params.end
    const lineId = id
    const curvature = params.curvature ?? DEFAULT_CURVATURE
    const time = params.time ?? DEFAULT_TIME
    const cubicBezierX = params.cubicBezierX ?? DEFAULT_CUBIC_BEZIER_X

    // 水平抛物线
    const isHorizontal = curvature === 0

    // 注: 由贝塞尔曲线计算的抛物线，y 轴起始距离越远时，顶点越高
    // 为保持相对统一的顶点位置，需根据高度减少贝塞尔曲线的末尾值
    const distance = 100
    const diploid = Math.abs(endY - startY) / distance

    // 每 x 目标距离，减少一点弧度
    // 距离小于一个 x 时，不再减弧度
    const radianGap = 0.1
    const y2 = diploid > 1 ? curvature + diploid * radianGap : curvature

    const line = {
      id: lineId,
      running: false,
      time,
      cubicBezierX,
      cubicBezier: `cubic-bezier(0 ,0 ,1 ,${isHorizontal ? 0 : y2})`,
      ...params
    }

    setQueue((prev) => ({ ...prev, [lineId]: line }))
    run(line)
  }

  function updateLineStatus(lineId: number, nextLineStatus: Partial<IParabolaLine>) {
    setQueue((prev) => {
      const next = { ...prev }
      next[lineId] = { ...next[lineId], ...nextLineStatus }

      return next
    })
  }

  function run(line: IParabolaLine) {
    const timer = setTimeout(() => {
      !line.running && updateLineStatus(line.id, { running: true })
      clearTimeout(timer)
    }, 50)
  }

  function clear(lineId: number) {
    setQueue((prev) => {
      const next = { ...prev }
      const line = next[lineId]
      line.onComplete?.()

      delete next[lineId]
      return next
    })
  }

  function renderLine(item: IParabolaLine) {
    const lineId = item.id
    const line = queue[lineId]
    const { running, cubicBezier, time } = line
    const [startX, startY] = line.start
    const [endX, endY] = line.end
    const distanceX = endX - startX
    const distanceY = endY - startY

    const styleX: CSSProperties = running
      ? {
          left: startX,
          top: startY,
          transform: `translate3d(${distanceX}px, -50%, 0)`,
          transitionDuration: `${time}s`,
          transitionTimingFunction: line.cubicBezierX
        }
      : {}

    const styleLine: CSSProperties = running
      ? {
          transform: `translate3d(0, ${distanceY}px, 0)`,
          transitionDuration: `${time}s`,
          transitionTimingFunction: cubicBezier
        }
      : {}

    return (
      <View key={lineId} className={styles.x} style={styleX}>
        <View className={styles.y} style={styleLine} onTransitionEnd={() => clear(lineId)}>
          {line.content?.(line.running)}
        </View>
      </View>
    )
  }

  return <View className={styles.parabola}>{Object.values(queue).map(renderLine)}</View>
})

const MMParabola = memo(Component)
export default MMParabola
