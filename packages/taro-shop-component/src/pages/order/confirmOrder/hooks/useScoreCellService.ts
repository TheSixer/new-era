import { OrderCalculateResponse } from '@wmeimob/taro-api'
import { useToast } from '@wmeimob/taro-design'
import { IFeildRule } from '@wmeimob/taro-design/src/components/feild/const'
import { useAtomValue } from 'jotai'
import { useEffect, useMemo, useState } from 'react'
import { disableInputAtom } from '../store'

/**
 * 积分输入逻辑
 */
export function useScoreCellService(params: { order: OrderCalculateResponse; onRefresh(): void }) {
  const [toast] = useToast()

  const disabled = useAtomValue(disableInputAtom)

  const [score, setScoreBase] = useState('')
  const [visible, setVisible] = useState(false)

  // 用户当前可用积分余额
  const userAvailableScore = params.order.scoreBO?.availableScore || 0

  // 最大可输入积分 = (用户可用积分余额 与 商品实付最大可用积分) 的最小值
  const maxCanInputScore = Math.min(params.order.scoreBO?.upperlimitScore || 0, userAvailableScore)

  // 能不能输积分
  const useable = useMemo(() => {
    // 有积分商品
    const hadScoreGoods = params.order.items?.some((item) => item.useScore)

    // 首次计算订单接口返回前显示出来
    if (hadScoreGoods === undefined) return true

    // 两者都 true 时显示积分输入栏
    return !!(hadScoreGoods && maxCanInputScore)
  }, [params.order, maxCanInputScore])

  useEffect(() => {
    setScore('')
    setVisible(useable)
  }, [useable])

  // fix：先输入最大积分，再选择优惠券时，需要调整当前已输入的最大积分
  useEffect(() => {
    setScore((score) => {
      if (score !== '' && Number(score) > maxCanInputScore) {
        return `${maxCanInputScore || ''}` // 不要突然出现个0
      }
      return score
    })
  }, [maxCanInputScore])

  function triggerVisible() {
    setVisible((prev) => !prev)
  }

  function validator(__: IFeildRule, value: string) {
    const pass = () => Promise.resolve(true)
    const err = (text: string) => {
      toast?.message(text)
      return Promise.reject(new Error(text))
    }

    if (!value) return pass()
    if (!/^\d+$/.test(value)) return err('请输入整数')

    const isOver = Number(value) > maxCanInputScore
    if (isOver) return err(`最多可输入${maxCanInputScore}积分`)

    return pass()
  }

  /**
   * 输入非数字会清理掉,因为是整数所以不用管1.这样的输入
   * @param num
   */
  function setScore(num) {
    if (!isNaN(Number(score))) {
      setScoreBase(num)
    } else {
      setScoreBase('')
    }
  }

  function handleBlur() {
    !isNaN(Number(score)) && score !== '' && setScore(`${Number(score)}`)
    params.onRefresh()
  }

  return {
    score,
    disabled: disabled || !useable,
    visible,
    useable,
    userAvailableScore,
    maxCanInputScore,
    setScore,
    triggerVisible,
    validator,
    handleBlur
  }
}
