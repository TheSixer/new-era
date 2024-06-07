import { View } from '@tarojs/components'
import Taro, { getCurrentPages, useRouter, useShareAppMessage } from '@tarojs/taro'
import { PageContainer, useToast } from '@wmeimob/taro-design'
import MMButton from '@wmeimob/taro-design/src/components/button'
import MMCell from '@wmeimob/taro-design/src/components/cell'
import MMCellGroup from '@wmeimob/taro-design/src/components/cell/cell-group'
import MMFixFoot from '@wmeimob/taro-design/src/components/fix-foot'
import MMIconFont from '@wmeimob/taro-design/src/components/icon-font'
import MMIconFontName from '@wmeimob/taro-design/src/components/icon-font/const'
import MMNavigation from '@wmeimob/taro-design/src/components/navigation'
import MMPoster from '@wmeimob/taro-poster/src/components/poster'
import MMShare from '@wmeimob/taro-share/src/components/share'
import { useSetAtom } from 'jotai'
import { FC, memo, useEffect, useMemo, useState } from 'react'
import GoodSkuPopup from '../../../components/good/goodSkuPopup'
import MMRichText from '../../../components/richText/index'
import useGlobalStore, { useCheckUserStatus } from '../../../globalStore'
import useGoodsSkuPopup from '../../../hooks/goods/useGoodsSkuPopup'
import { api } from '@wmeimob/taro-api'
import { GoodsVO } from '@wmeimob/taro-api'
import { routeNames } from '../../../routes'
import { EOrderType } from '../../order/confirmOrder/const'
import { confirmGoodsAtom } from '../confirm/store'
import GoodCover from './components/goodCover'
import GoodInfo from './components/goodInfo'
import GoodsOff from './components/goodsOff'
import { GOODS_OFF_CODE, IGoodDetailProps, IRouteParams } from './const'
import useShare from './hooks/useShare'
import styles from './index.module.less'
import { useStoreReset } from './store'
import { MMButtonType } from '@wmeimob/taro-design/src/components/button/const'
import getParamsUrl from '@wmeimob/taro-utils/src/getParamsUrl'

const Component: FC<IGoodDetailProps> = () => {
  const { params }: { params: IRouteParams } = useRouter()
  const goodsNo = params.scene || params.goodsNo || ''

  const isOnlyOnePage = useMemo(() => getCurrentPages().length === 1, [])
  const { user } = useGlobalStore()
  const { good, goodCovers, goodContent, isOff } = useGoodDetailService(goodsNo)

  // 分享相关
  const { showSharePop, setShowSharePop, options, handleShareClick, posterRef, posterStyle } = useShare(good)

  const checkUserStatus = useCheckUserStatus()

  const setConfirmGoodsAtom = useSetAtom(confirmGoodsAtom)

  const { cannotBuy, selectSku, skuProps, open, onBuy } = useGoodsSkuPopup({
    onBuy(data) {
      setConfirmGoodsAtom([data])
      Taro.navigateTo({ url: getParamsUrl(routeNames.integralGoodsConfirm, { orderType: EOrderType.Buy }) })
    }
  })

  /** 商品分享 */
  useShareAppMessage((res) => {
    if (res.from === 'button') {
      // 来自页面内转发按钮
    }
    const { goodsName } = good
    const path = `${routeNames.integralGoodsDetail}?goodsNo=${goodsNo}&isShare=1`

    return { path, title: goodsName }
  })

  const homeButton = isOnlyOnePage ? <MMIconFont value={MMIconFontName.Index}
                                                 onClick={() => Taro.switchTab({ url: routeNames.tabBarHome })} /> : undefined

  async function handleBuy() {
    await checkUserStatus.check()
    user.mobile ? open(good, 'open') : Taro.navigateTo({ url: routeNames.auth })
  }

  if (isOff) {
    return (
      <PageContainer className={styles.goodDetailStyle}>
        <MMNavigation title='商品详情' renderLeft={homeButton} />
        <GoodsOff />
      </PageContainer>
    )
  }

  return (
    <PageContainer className={styles.goodDetailStyle} noPlace>
      <MMNavigation title='积分商品详情' renderLeft={homeButton} />

      {/* 商品封面 */}
      <GoodCover videoUrl={good.videoUrl} bannersUrl={goodCovers} />

      {/* 商品信息 */}
      <GoodInfo data={good} />

      {/* 商品sku */}
      <MMCellGroup style={{ marginTop: 10 }}>
        <MMCell
          title={<View style={{ fontWeight: 'bold' }}>商品规格</View>}
          arrow
          onClick={() => (user.mobile ? open(good, 'open') : Taro.navigateTo({ url: routeNames.auth }))}
          placeholder={selectSku.specNames || '请选择规格'}
        />
      </MMCellGroup>

      {/* 商品文本 */}
      <MMRichText html={goodContent} style={{ marginTop: 10, paddingLeft: 10, paddingRight: 10 }} />

      {/* 底部栏 */}
      <MMFixFoot>
        <View className={styles.footer}>
          <MMButton type={MMButtonType.h5Red} className={styles.footer_button} onClick={handleBuy}>
            立即兑换
          </MMButton>
        </View>
      </MMFixFoot>

      {/* sku弹窗 */}
      <GoodSkuPopup
        {...skuProps}
        good={good}
        footer={
          <View className={styles.footer}>
            <MMButton type={MMButtonType.h5Red} className={styles.footer_button} onClick={() => onBuy()}
                      disabled={cannotBuy}>
              立即兑换
            </MMButton>
          </View>
        }
      />

      {/* 分享弹窗 */}
      <MMShare visible={showSharePop} title='选择分享方式' options={options} onClick={handleShareClick}
               onClose={() => setShowSharePop(false)} />

      {/* 海报生成组件 */}
      <MMPoster ref={posterRef} canvasStyle={posterStyle}
                canvasSetting={{ backgroundColor: '#ffffff', borderRadius: 10 }} />
    </PageContainer>
  )
}

const GoodDetail = memo(Component)
export default GoodDetail

/** 商品详情业务 */
function useGoodDetailService(goodsNo: string) {
  const [good, setGood] = useState<GoodsVO>({}) // 商品数据
  const [goodContent, setGoodContent] = useState('') // 商品详情富文本
  const [isOff, setIsOff] = useState(false) // 商品是否已下架

  const [toast] = useToast()

  useStoreReset()

  // 商品封面图片
  const goodCovers = useMemo(() => (good.bannerImgPaths ? good.bannerImgPaths.split(',') : []), [good.bannerImgPaths])

  // 获取商品
  async function getData() {
    toast?.loading()
    try {
      const { data = {} } = await api['/wechat/goods/details/{no}_GET']({ no: goodsNo })
      if (data.richId) {
        getGoodContent(data.richId)
      }
      setGood(data)
    } catch (error) {
      setIsOff(error.data.code === GOODS_OFF_CODE)
    }
    toast?.hideLoading()
  }

  // 获取商品详情文本
  async function getGoodContent(richId: number) {
    const { data = '' } = await api['/wechat/richtext_GET']({ id: richId as any })
    setGoodContent(data)
  }

  useEffect(() => {
    if (toast) {
      getData()
    }
  }, [goodsNo, toast])

  return { good, goodCovers, goodContent, getData, isOff }
}
