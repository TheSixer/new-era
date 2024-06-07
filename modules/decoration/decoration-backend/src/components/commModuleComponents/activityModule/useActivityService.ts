import { EChooseGoodType } from '@wmeimob-modules/decoration-data/src/enums/EChooseGoodType'
import { useMemo, useState } from 'react'
import { IBasicActivityData } from '@wmeimob-modules/decoration-data'

interface IUserServiceProps<T> {
  /** 活动数据 */
  data: T[]
}

/**
 * 活动通用逻辑hook
 *
 * @export
 * @template T
 * @param {T} props
 * @return {*}
 */
export default function useActivityService<T extends IBasicActivityData>(props: IUserServiceProps<T>, defaultData: Partial<IBasicActivityData> = {}) {
  const { data } = props

  const [activeIndex, setActiveIndex] = useState(0)

  const localData = useMemo<IBasicActivityData[]>(() => {
    return data.length
      ? data
      : [
          {
            showGoodNum: 2,
            startTime: (Date.now() - 1000) as any,
            endTime: (Date.now() - 1000) as any,
            activityName: '',
            chooseGoodType: EChooseGoodType.Auto,
            goods: [],
            btnName: '去购买',
            showActivityTitle: '营销活动',
            ...defaultData
          }
        ]
  }, [data])

  const showCardTitle = useMemo(() => localData.length === 1, [localData])

  return {
    showCardTitle,
    localData,
    activeIndex,
    setActiveIndex
  }
}
