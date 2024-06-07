import { IShareOption } from '@wmeimob/taro-share/src/components/share/const'
import { useAtom } from 'jotai'
import { useState } from 'react'
import { GoodsVO } from '@wmeimob/taro-api'
import { showSharePopAtom } from '../store'
import useGoodPoster from './useGoodPoster'

/**
 * 分享业务
 *
 * 包含海报组件分享
 * @returns
 */
export default function useShare(data: GoodsVO) {
  const [showSharePop, setShowSharePop] = useAtom(showSharePopAtom)

  const [options] = useState<IShareOption[]>([
    { key: 'wechat', type: 'wechat', title: '微信分享' },
    { key: 'poster', type: 'poster', title: '生成海报' }
  ])

  const { posterRef, draw, posterStyle } = useGoodPoster(data)

  // 处理分享点击
  const handleShareClick = (item: IShareOption) => {
    setShowSharePop(false)
    if (item.key === 'poster') {
      draw()
    }
  }

  return {
    showSharePop,
    setShowSharePop,
    options,
    posterRef,
    posterStyle,
    handleShareClick
  }
}
