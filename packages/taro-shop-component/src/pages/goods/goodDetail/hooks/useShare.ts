import { IShareOption } from '@wmeimob/taro-share/src/components/share/const'
import { useAtom } from 'jotai'
import { useContext, useMemo, useState } from 'react'
import { GoodsVO } from '@wmeimob/taro-api'
import GoodDetailContext, { GoodDetailContextValue } from '../context'
import useGoodPoster from './useGoodPoster'
import { appName, isH5, isWeapp } from '../../../../config'
import { isWebApp } from '@wmeimob/taro-pages/src/config'
import { upload } from '../../../../components/aliyun'
import { useToast } from '@wmeimob/taro-design'
import { routeNames } from '../../../../routes'

/**
 * 分享业务
 *
 * 包含海报组件分享
 * @returns
 */
export default function useShare(data: GoodsVO) {
  const { showSharePop, setShowSharePop, handleWebAppAppShare } = useContext(GoodDetailContext)
  const [toast] = useToast()

  // const [showSharePop, setShowSharePop] = useAtom(showSharePopAtom)

  const options = useMemo<IShareOption[]>(() => {
    if (isWeapp) {
      return [
        { key: 'wechat', type: 'wechat', title: '微信分享' },
        { key: 'poster', type: 'poster', title: '生成海报' }
      ]
    }

    if (isWebApp) {
      return [
        { key: 'wechat', type: 'wechat', title: '微信分享' },
        { key: 'poster', type: 'poster', title: '生成海报' }
      ]
    }

    return [{ key: 'poster', type: 'poster', title: '生成海报' }]
  }, [])

  const { posterRef, draw, getDrawImageSrc, posterStyle } = useGoodPoster(data)

  // 处理分享点击
  const handleShareClick = async (item: IShareOption) => {
    setShowSharePop(false)
    if (item.key === 'poster') {
      draw()
    }

    if (isWebApp && item.key === 'wechat') {
      handleWebAppAppShare()
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
