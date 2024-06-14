import { View } from '@tarojs/components'
import Taro, { getCurrentPages, useDidShow, useRouter, useShareAppMessage } from '@tarojs/taro'
import { EActivityStep } from '@wmeimob/shop-data/goods/enums/EActivityStep'
import { EActivityType } from '@wmeimob/shop-data/src/enums/activity/EActivityType'
import { useToast } from '@wmeimob/taro-design'
import MMCell from '@wmeimob/taro-design/src/components/cell'
import MMCellGroup from '@wmeimob/taro-design/src/components/cell/cell-group'
import MMIconFont from '@wmeimob/taro-design/src/components/icon-font'
import MMIconFontName from '@wmeimob/taro-design/src/components/icon-font/const'
import MMPoster from '@wmeimob/taro-poster/src/components/poster'
import MMShare from '@wmeimob/taro-share/src/components/share'
import { useSuperLock } from '@wmeimob/utils/src/hooks/useSuperLock'
import { useSetAtom } from 'jotai'
import { FC, memo, useContext, useEffect, useMemo, useState } from 'react'
import CouponBox from '../../../components/couponBox'
import GoodSkuPopup from '../../../components/good/goodSkuPopup'
import MMRichText from '../../../components/richText/index'
import useGlobalStore from '../../../globalStore'
import useGoodsSkuPopup from '../../../hooks/goods/useGoodsSkuPopup'
import useNewcomer from '../../../hooks/user/useNewcomer'
import { api } from '@wmeimob/taro-api'
import { routeNames } from '../../../routes'
import { EOrderType } from '../../order/confirmOrder/const'
import { confirmGoodsAtom } from '../../order/confirmOrder/store'
import ActInfoPop from './components/actInfoPop'
import ActivityCountdown from './components/activityCountdown'
import FooterBar from './components/footerBar'
import FooterButtons from './components/footerButtons'
import GoodComments from './components/goodComments'
import GoodCover from './components/goodCover'
import GoodInfo from './components/goodInfo'
import { GOODS_OFF_CODE, IGoodDetailProps, IRouteParams } from './const'
import GoodDetailContext from './context'
import useGoodCoupon from './hooks/useGoodCoupon'
import useShare from './hooks/useShare'
import { useCountdownActivity } from './store'
import { navByLink } from '../../../components/pageModules/utils'
import { EJumpType } from '@wmeimob-modules/decoration-data/src/enums/EJumpType'
import getParamsUrl from '@wmeimob/taro-utils/src/getParamsUrl'

const Component: FC<IGoodDetailProps> = () => {
  const { params }: { params: IRouteParams } = useRouter()
  const goodsNo = params.scene || params.goodsNo || ''

  const liveId = params.liveId ?? ''

  const { user } = useGlobalStore()

  const isOnlyOnePage = useMemo(() => getCurrentPages().length === 1, [])
  const {
    good,
    goodCovers,
    goodContent,
    isCollection,
    handleCollect,
    cartCount,
    getCartCount,
    isOff,
    getData
  } = useGoodDetailService(goodsNo, liveId)

  // 分享相关
  const { showSharePop, setShowSharePop, options, handleShareClick, posterRef, posterStyle } = useShare(good)

  const setConfirmGoodsAtom = useSetAtom(confirmGoodsAtom)

  const { cannotBuy, selectSku, skuProps, open, onAddCart, onBuy } = useGoodsSkuPopup({
    liveId,
    onAddCart: () => {
      getCartCount()
    },
    onBuy(data) {
      setConfirmGoodsAtom([data])
      Taro.navigateTo({ url: getParamsUrl(routeNames.orderConfirmOrder, { orderType: EOrderType.Buy }) })
    }
  })

  /** 商品分享 */
  useShareAppMessage((res) => {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      // console.log(res.target)
    }
    const { goodsName } = good
    const path = `${routeNames.goodsGoodDetail}?goodsNo=${goodsNo}&isShare=1`

    return { path, title: goodsName }
  })

  const { earlyActivity, earlyIsPreSale, inFlashSale } = useCountdownActivity()

  // 优惠券相关
  const { couponCell, couponList, handleReceiveCoupon, couponVisible, setCouponVisible } = useGoodCoupon(goodsNo)

  // 新人券领取成功
  const { toastReceiveNewcomerCouponSuccess } = useNewcomer()

  useDidShow(() => {
    toastReceiveNewcomerCouponSuccess()
  })

  const homeButton = isOnlyOnePage ? <MMIconFont value={MMIconFontName.Index}
                                                 onClick={() => Taro.switchTab({ url: routeNames.tabBarHome })} /> : undefined

  /**
   * 预售活动并且未开始：不显示
   * 预售活动并且进行中：显示
   * 预售活动并且已结束：商品会下架，不用管
   * 其他时候(常规状态、限时抢购)：显示
   */
  const canSelectSku = !(earlyIsPreSale && earlyActivity?.activityStep === EActivityStep.NotStarted)

  return (
    <>
      {/* <MMNavigation title='商品详情' renderLeft={homeButton} /> */}

      {/* 商品封面 */}
      <GoodCover videoUrl={good.videoUrl} bannersUrl={goodCovers} />

      {/* 活动倒计时 */}
      {good.goodsNo && <ActivityCountdown onRefresh={getData} />}

      {/* 商品信息 */}
      <GoodInfo data={good} coupons={couponCell} onShowCoupon={() => setCouponVisible(true)} />

      {/* 外部显示cell */}
      {canSelectSku && (
        <MMCellGroup style={{ marginTop: 10 }}>
          <MMCell
            title={<View style={{ fontWeight: 'bold' }}>商品规格</View>}
            arrow
            onClick={(/* Taro.navigateTo({ url: routeNames.auth }) */) => (user.mobile ? open(good, 'open') : navByLink(EJumpType.None, {}))}
            placeholder={selectSku.specNames?.split(',')?.join('/') || '请选择规格'}
          />
        </MMCellGroup>
      )}

      {/* 商品评论 */}
      <GoodComments goodsNo={goodsNo} />

      {/* 商品文本 */}
      <MMRichText html={goodContent} style={{ marginTop: 10, paddingLeft: 10, paddingRight: 10 }} />

      {/* 底部栏 */}
      {good.goodsNo && <FooterBar goods={good} cartCount={cartCount} onOpenSku={open} isCollection={isCollection}
                                  onCollection={handleCollect} showCart />}

      {/* 分享弹窗 */}
      <MMShare visible={showSharePop} title='选择分享方式' options={options} onClick={handleShareClick}
               onClose={() => setShowSharePop(false)} />

      {/* 海报生成组件 */}
      <MMPoster ref={posterRef} canvasStyle={posterStyle}
                canvasSetting={{ backgroundColor: '#ffffff', borderRadius: 10 }} />

      {/* 活动详情弹窗 */}
      <ActInfoPop />

      {/* 优惠券弹窗 */}
      <CouponBox
        couponVisible={couponVisible}
        data={couponList}
        onClose={() => setCouponVisible(false)}
        onReceiveCoupon={(coupon) => {
          handleReceiveCoupon(coupon)
        }}
      />

      {/* sku弹窗 */}
      <GoodSkuPopup
        {...skuProps}
        good={good}
        footer={
          good.goodsNo && (
            <FooterButtons
              type={(() => {
                if (earlyIsPreSale) return EActivityType.PreSale

                return inFlashSale ? EActivityType.FlashSale : 'normal'
              })()}
              disabled={cannotBuy}
              onBuy={onBuy}
              onAddCart={onAddCart}
            />
          )
        }
      />
    </>
  )
}

const Detail = memo(Component)
export default Detail

/** 商品详情业务 */
function useGoodDetailService(goodsNo: string, liveId: string) {
  const { good, setGood, isOff, setIsOff } = useContext(GoodDetailContext)

  // const [good, setGood] = useAtom(goodAtom) // 商品数据
  const [goodContent, setGoodContent] = useState('') // 商品详情富文本
  const [isCollection, setIsCollection] = useState(false) // 是否收藏
  const [cartCount, setCartCount] = useState(0) // 购物车数量

  const [toast] = useToast()
  const { user } = useGlobalStore()

  // 商品封面图片
  const goodCovers = useMemo(() => (good.bannerImgPaths ? good.bannerImgPaths.split(',') : []), [good.bannerImgPaths])

  // 获取商品
  async function getData() {
    toast?.loading()
    try {
      const { data = {} } = await api['/wechat/goods/details/{no}_GET']({ no: goodsNo, liveId })
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

  // 获取购物车数量
  async function getCartCount() {
    const { data } = await api['/wechat/mall/shopCart/count_GET']({})
    setCartCount(data!)
  }

  /**
   * 判断是否收藏
   *
   */
  async function getIsCollection() {
    const { data } = await api['/wechat/collection/exists/{no}_GET'](goodsNo)
    setIsCollection(!!data)
  }

  /**
   * 点击收藏/取消收藏
   *
   */
  const [handleCollect] = useSuperLock(async () => {
    toast?.loading({ mask: true })
    try {
      if (isCollection) {
        // 取消收藏
        await api['/wechat/collection_DELETE']({ relationalNo: goodsNo! })
        setIsCollection(false)
        toast?.success('取消收藏')
      } else {
        // 添加收藏
        await api['/wechat/collection_POST']({ relationalNo: goodsNo! })
        setIsCollection(true)
        toast?.success('收藏成功')
      }
    } catch (error) {
    }

    toast?.hideLoading()
  })

  useEffect(() => {
    if (toast) {
      getData()
    }
  }, [goodsNo, toast])

  useEffect(() => {
    if (user.mobile) {
      getIsCollection()
      getCartCount()
    }
  }, [user, goodsNo])

  return { good, goodCovers, goodContent, isCollection, handleCollect, cartCount, getCartCount, getData, isOff }
}
