import { atom, useAtom, useSetAtom } from 'jotai'
import { useEffect } from 'react'
import { GoodsVO, MarketingActivityDto } from '@wmeimob/taro-api'

/**
 * TODO:积分商品全局状态的清理，改成上下文。现在的写法也没有bug
 */
/** 显示分享弹窗 */
export const showSharePopAtom = atom(false)

/** 显示活动弹窗 */
export const showActivityPopAtom = atom(false)

/** 活动弹窗信息 */
export const activityPopDtoAtom = atom<MarketingActivityDto>({})

/**
 * 活动弹窗hook
 * @returns
 */
export function useActivityPop() {
  const [showActivityPop, setShowActivityPop] = useAtom(showActivityPopAtom)
  const [activityPopDto, setSctivityPopDto] = useAtom(activityPopDtoAtom)

  return {
    showActivityPop,
    setShowActivityPop,
    activityPopDto,
    setSctivityPopDto
  }
}

export function useStoreReset() {
  const [, setShowActivityPop] = useAtom(showActivityPopAtom)
  const [, setSctivityPopDto] = useAtom(activityPopDtoAtom)

  const setShowSharePopAtom = useSetAtom(showSharePopAtom)

  useEffect(() => {
    return () => {
      setShowActivityPop(false)
      setSctivityPopDto({})
      setShowSharePopAtom(false)
    }
  }, [])
}
