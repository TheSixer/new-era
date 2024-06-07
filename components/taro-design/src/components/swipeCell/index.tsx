import { memo, useCallback, useEffect, useRef, useState, FC, PropsWithChildren } from 'react'
import { View, ITouchEvent } from '@tarojs/components'
import { ISwipeCellButton, ISwipeCellProps } from './const'
import styles from './index.module.less'

const buttonWidth = 60

/**
 * 滑动单元格
 *
 * @description 可以左右滑动来展示操作按钮的单元格组件。
 * @param {*} props
 * @return {*}
 */
const Component: FC<PropsWithChildren<ISwipeCellProps>> = (props) => {
  const { visible = false, sliderButtons, disabled = false, beforeClose = () => true } = props

  const [transX, setTransX] = useState(0)
  const touchStartX = useRef(0)
  const touchStartY = useRef(0) // y轴移动
  const touchEndX = useRef(0)
  const touchEndY = useRef(0)
  const slideStatus = useRef(0) // 滑块状态 0-关闭 1-打开

  const maxX = sliderButtons.length * buttonWidth

  useEffect(() => {
    setTransX(visible ? maxX : 0)
    slideStatus.current = visible ? 1 : 0
  }, [visible])

  const handleTouchStart = useCallback(
    (ev: ITouchEvent) => {
      if (!disabled) {
        const { touches = [] } = ev
        touchStartX.current = (touches[0] || {}).pageX
        touchStartY.current = (touches[0] || {}).pageY
        touchEndX.current = touchStartX.current
        touchEndY.current = touchStartY.current
      }
    },
    [disabled]
  )

  const handleTouchMove = useCallback(
    (ev: ITouchEvent) => {
      if (!disabled) {
        const { touches = [] } = ev
        const pageX = (touches[0] || {}).pageX
        const pageY = (touches[0] || {}).pageY
        touchEndX.current = pageX
        touchEndY.current = pageY
        let offsetX = touchStartX.current - pageX
        const offsetY = touchStartY.current - pageY

        // 如果x轴移动大于y轴移动才滑动,
        if (Math.abs(offsetX)>Math.abs(offsetY)){
          offsetX = offsetX < 0 ? 0 : offsetX

          const tx = offsetX >= maxX ? maxX : offsetX
          setTransX(tx)
        }
      }
    },
    [disabled]
  )

  const handleTouchEnd = useCallback(() => {
    if (!disabled) {
      const offsetX = touchStartX.current - touchEndX.current
      const offsetY = touchStartY.current - touchEndY.current
      const tx = offsetX > maxX / 2 ? maxX : 0
      // 如果x轴移动大于y轴移动才滑动,
      if (Math.abs(offsetX)>Math.abs(offsetY)){
        setTransX(tx)
      }

      touchStartX.current = 0
      touchEndX.current = 0

      setTimeout(() => {
        if (tx === maxX) {
          if (slideStatus.current !== 1) {
            slideStatus.current = 1
            props.onVisibleChange?.(true)
          }
        } else {
          if (slideStatus.current !== 0) {
            slideStatus.current = 0
            props.onVisibleChange?.(false)
          }
        }
      })
    }
  }, [disabled])

  const handleClickButton = async (button: ISwipeCellButton, index: number) => {
    const res = await beforeClose(button, index)
    if (res) {
      slideStatus.current = 0
      setTransX(0)
      props.onClickButton?.(button, index)
      props.onVisibleChange?.(false)
    }
  }

  return (
    <View className={styles.swipeCellStyle}>
      <View className={styles.swipeCellStyle_wrapper} style={{ transform: `translate(-${transX || 0}px)` }}>
        <View onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
          {props.children}
        </View>

        <View className={styles.swipeCellStyle_slider}>
          {sliderButtons.map((button, index) => {
            const { text, ...btnStyle } = button
            return (
              <View key={1 + index} style={btnStyle} className={styles.swipeCellStyle_slider_item} onClick={() => handleClickButton(button, index)}>
                <View className={styles.swipeCellStyle_slider_text}>{button.text}</View>
              </View>
            )
          })}
        </View>
      </View>
    </View>
  )
}

const MMSwipeCell = memo(Component)
export default MMSwipeCell
