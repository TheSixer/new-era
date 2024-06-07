import { FC, memo, useEffect, useRef, useState } from 'react'
import { View, Text } from '@tarojs/components'
import { useSuperLock } from '@wmeimob/utils/src/hooks/useSuperLock'
import styles from './index.module.less'

interface IMobileCaptchaProps {
  /**
   * 提示文本
   *
   * @default ['获取验证码', '重新获取']
   */
  text?: string[]

  /**
   * 开始倒计时之前执行操作
   *
   * 你可以在这个函数里面执行调用接口发送验证码
   */
  beforeCountDown?(): Promise<any>
}

/**
 * 手机验证码倒计时
 *
 * @param {*} props
 * @return {*}
 */
const Component: FC<IMobileCaptchaProps> = (props) => {
  const { text = ['获取验证码', '重新获取'], beforeCountDown = () => Promise.resolve() } = props

  const [currentState, setCurrentState] = useState(0)

  const [countTime, setCountTime] = useState<number>()

  const timer = useRef<any>()

  const [startText, endText] = text

  const showText = { 0: startText, 1: `${countTime}s`, 2: endText || startText }[currentState]

  useEffect(() => {
    return () => {
      timer.current && clearTimeout(timer.current)
    }
  }, [])

  function countDown(time = 60) {
    const rest = time - 1
    // rest = rest <= 0 ? 0 : rest
    setCountTime(rest)
    if (rest <= 0) {
      setCurrentState(2)
      return
    }
    timer.current = setTimeout(() => {
      countDown(rest)
    }, 1000)
  }

  const [handleClick] = useSuperLock(async () => {
    try {
      await beforeCountDown()
      if (currentState === 1) {
        return
      } else if (currentState === 0) {
        setCurrentState((pre) => pre + 1)
      } else if (currentState === 2) {
        setCurrentState(1)
      }
      countDown()
    } catch (error) {}
  })

  return (
    <View className={styles.mobileCaptchaStyle} onClick={handleClick}>
      <Text>{showText}</Text>
    </View>
  )
}

const MobileCaptcha = memo(Component)
export default MobileCaptcha
