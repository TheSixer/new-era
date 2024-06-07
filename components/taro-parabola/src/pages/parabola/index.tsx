import Taro, { getCurrentInstance, getSystemInfoSync } from '@tarojs/taro'
import { FC, memo, useEffect, useRef, useState } from 'react'
import { ITouchEvent, View } from '@tarojs/components'
import styles from './index.module.less'
import { IParabolaProps } from './const'
import { IParabolaRef } from '~/components/parabola/const'
import classNames from 'classnames'
import { selectRect } from '@wmeimob/taro-design/src/components/utils'
import MMParabola from '~/components/parabola'
import MMButton from '@wmeimob/taro-design/src/components/button'
import MMNavigation from '@wmeimob/taro-design/src/components/navigation'

const targetPosition = {
  x: getSystemInfoSync().windowWidth * 0.5,
  y: getSystemInfoSync().windowHeight * 0.5
}

const Component: FC<IParabolaProps> = () => {
  const parabolaRef = useRef<IParabolaRef>(null)

  const card1Position = useRef<Taro.NodesRef.BoundingClientRectCallbackResult>()
  const card2Position = useRef<Taro.NodesRef.BoundingClientRectCallbackResult>()
  const card3Position = useRef<Taro.NodesRef.BoundingClientRectCallbackResult>()

  const timer = useRef<any>()

  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    getCardPosition()
  }, [])

  async function getCardPosition() {
    const page = getCurrentInstance().page
    const [res1, res2, res3] = await Promise.all([
      selectRect(`.${styles.card1}`, page),
      selectRect(`.${styles.card2}`, page),
      selectRect(`.${styles.card3}`, page)
    ])

    card1Position.current = res1
    card2Position.current = res2
    card3Position.current = res3
  }

  function getTouchPosition(event: ITouchEvent) {
    const [touch] = event.touches
    const { clientX: startX, clientY: startY } = touch
    return { startX, startY }
  }

  function normalClick(event: ITouchEvent) {
    const { startX, startY } = getTouchPosition(event)
    parabolaRef.current?.run({
      start: [startX, startY],
      end: [targetPosition.x, targetPosition.y],
      content: renderBall
    })
  }

  function up(event: ITouchEvent) {
    const { startX, startY } = getTouchPosition(event)
    parabolaRef.current?.run({
      start: [startX, startY],
      end: [card2Position.current!.left, card2Position.current!.top],
      curvature: -1.6,
      content: renderBall
    })
  }

  function horizontal(event: ITouchEvent) {
    const { startX, startY } = getTouchPosition(event)
    parabolaRef.current?.run({
      start: [startX, startY],
      end: [targetPosition.x, targetPosition.y],
      curvature: 0,
      content: renderBall
    })
  }

  function horizontalSpeed(event: ITouchEvent) {
    const { startX, startY } = getTouchPosition(event)
    parabolaRef.current?.run({
      start: [startX, startY],
      end: [card2Position.current!.left, card2Position.current!.top],
      curvature: 0,
      cubicBezierX: 'ease-out',
      content: renderBall
    })
  }

  function timeChange() {
    parabolaRef.current?.run({
      start: [card1Position.current!.left, card1Position.current!.top + card1Position.current!.height / 2],
      end: [card3Position.current!.left, card3Position.current!.top],
      curvature: 0,
      time: 2,
      content: renderBall
    })
  }

  function handleComplete(event: ITouchEvent) {
    const { startX, startY } = getTouchPosition(event)
    parabolaRef.current?.run({
      start: [startX, startY],
      end: [card2Position.current!.left + card2Position.current!.width / 2, card2Position.current!.top],
      content: renderBall,
      onComplete: () => {
        setIsRunning(true)
        timer.current = setTimeout(() => {
          setIsRunning(false)
          clearTimeout(timer.current!)
        }, 500)
      }
    })
  }

  function renderBall() {
    return <View className={styles.ball} />
  }

  return (
    <View className={styles.parabolaStyle}>
      <MMNavigation title="抛物线" />
      <View className="spacing" />

      <View className={classNames(styles.card, styles.card1)}>购物车1</View>
      <View className={classNames(styles.card, styles.card2, isRunning && styles.scale)}>购物车2</View>
      <View className={classNames(styles.card, styles.card3)}>购物车3</View>

      <MMButton style={{ height: 100, width: 240 }} onClick={normalClick}>
        动态起点，固定终点 (点击本区域内任意位置)
      </MMButton>

      <View className="spacing" />

      <MMButton onClick={up}>提高抛物线顶点位置</MMButton>

      <View className="spacing" />

      <MMButton onClick={horizontal}>水平抛物线</MMButton>

      <View className="spacing" />

      <MMButton onClick={horizontalSpeed}>水平抛物线 (调整x轴方向速度)</MMButton>

      <View className="spacing" />

      <MMButton onClick={timeChange}>调整动画时间 (2s)</MMButton>

      <View className="spacing" />

      <MMButton onClick={handleComplete}>运动完成后回调</MMButton>

      <MMParabola ref={parabolaRef} />
    </View>
  )
}

const Parabola = memo(Component)
export default Parabola
