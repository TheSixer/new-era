import Taro from '@tarojs/taro'
import dayjs from 'dayjs'
import { useAtom } from 'jotai'
import { useState, useEffect } from 'react'
import { BannerPositionOutputDto, api } from '@wmeimob/taro-api'
import { isPopupAdsShowedAtom } from '../store'

const POPUP_ADS_STORAGE_KEY = 'POPUP_ADS_STORAGE_KEY'

export interface IPopupAdsStorageData {
  date: string
  /** 每个广告 id 对应的次数 */
  logs: Record<string, number>
}

export default function usePopupAds() {
  const [isShowed, setIsShowed] = useAtom(isPopupAdsShowedAtom)

  const [ads, setAds] = useState<BannerPositionOutputDto[]>([])
  const [currentIdx, setCurrentIdx] = useState(-1)

  const current = ads[currentIdx]

  useEffect(() => {
    current && logAdsCount(current.id!)
  }, [current])

  async function run() {
    if (isShowed) {
      return
    }

    try {
      const { data } = await api['/wechat/mall/banner/queryList_GET']({position: 'OPEN_SCREEN'})
      const res = data || []
      setAds(res)

      if (res.length && getNextValidIdx(0)) {
        setCurrentIdx(0)
        setIsShowed(true)
      }
    } catch (error) {}
  }

  function getOldLogs() {
    const old: IPopupAdsStorageData = Taro.getStorageSync(POPUP_ADS_STORAGE_KEY) || { date: dayjs().startOf('date').format('YYYY-MM-DD'), logs: {} }
    return old
  }

  /** 记录自然日中每个广告 id 出现的次数 */
  function logAdsCount(adId: number) {
    const old = getOldLogs()
    const today = dayjs().startOf('date')
    const isNewDate = today.isAfter(dayjs(old.date))
    const next = {
      date: today.format('YYYY-MM-DD'),
      logs: isNewDate ? { [adId]: 1 } : { ...old.logs, [adId]: (old.logs[adId] || 0) + 1 }
    }

    Taro.setStorageSync(POPUP_ADS_STORAGE_KEY, next)
  }

  function getNextValidIdx(nextIdx: number) {
    const _next = ads[nextIdx + 1]

    if (_next) {
      return getNextValidIdx(nextIdx + 1)
    }

    return -1
  }

  function handleClose() {
    const nextIdx = getNextValidIdx(currentIdx + 1)
    setCurrentIdx(nextIdx)
  }

  return {
    run,
    current,
    handleClose
  }
}
