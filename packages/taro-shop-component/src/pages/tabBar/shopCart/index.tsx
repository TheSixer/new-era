/* eslint-disable max-lines */
import { ScrollView, View } from '@tarojs/components'
import Taro, { useDidHide, useDidShow } from '@tarojs/taro'
import MMCheckbox from '@wmeimob/taro-design/src/components/checkbox'
import MMNavigation from '@wmeimob/taro-design/src/components/navigation'
import { plus, times } from 'number-precision'
import { FC, memo, useMemo, useRef, useState } from 'react'
import ManageBar from './components/manageBar'
import ShopCartCell from './components/shopCartCell'
import SubmitBar from './components/submitBar'
import { EShopCartType, IShopCartProps, MyCart } from './const'
import styles from './index.module.less'
// import GoodRecommend from '../../../components/good/goodRecommend'
import MMButton from '@wmeimob/taro-design/src/components/button'
import MMEmpty from '@wmeimob/taro-design/src/components/empty'
import { useSuperLock } from '@wmeimob/utils/src/hooks/useSuperLock'
import { useSetAtom } from 'jotai'
import GoodSkuPopup from '../../../components/good/goodSkuPopup'
import { useCheckUserStatus } from '../../../globalStore'
import { PageContainer, useDialog, useToast } from '@wmeimob/taro-design'
import { GoodsVO, ShopCartModifyInputDto, api } from '@wmeimob/taro-api'
import { routeNames } from '../../../routes'
import { EOrderType } from '../../order/confirmOrder/const'
import { confirmGoodsAtom } from '../../order/confirmOrder/store'
import icon_empty from './images/icon_empty.png'
import TabBar from '../../../custom-tab-bar/tabBar'
import { isWeapp } from '../../../config'
import getParamsUrl from '@wmeimob/taro-utils/src/getParamsUrl'

const Component: FC<IShopCartProps> = () => {
  const setConfirmGoodsAtom = useSetAtom(confirmGoodsAtom)
  // const [recommendGoods] = useGoodRecommend()

  const [toast] = useToast()

  const {
    carts,
    setCarts,
    inValidCarts,
    cartType,
    setCartType,
    isEdit,
    checkAll,
    disabledManagent,
    handleCheckAll,
    handleManageClick,
    getShopCarts,
    totalPrice,
    totalBuyCounts,
    handleDelete,
    handleDeleteInvalid,
    handleAddCollection,
    handleChangeStepper,
    checkUserStatus,
    loading
  } = useShopCartService()
  // const [recommendGoods] = useGoodRecommendService()

  const {
    skuVisible,
    setSkuVisible,
    disabledSkuConfirm,
    good,
    skuValues,
    setSkuValues,
    buyCounts,
    setBuyCounts,
    handleSkuClick,
    handleSkuConfirm
  } =
    useSkuService()

  const isEmptyCart = !carts.length && !inValidCarts.length

  useDidHide(() => {
    setSkuVisible(false)
    // FIXED: 这里切换tab不重置。如果要放开的话。会出现管理选中状态异常
    // setCartType(EShopCartType.Checked)
  })

  async function handleBuy() {
    await checkUserStatus.check()

    const checkedCarts = carts.filter((item) => item.isChecked)
    // 判断商品库存是否溢出
    const isOverStock = checkedCarts.some(({ buyCounts: bc = 0, skuStock = 0 }) => bc > skuStock)
    if (isOverStock) {
      return toast?.message('商品库存不足')
    }
    setConfirmGoodsAtom(
      // eslint-disable-next-line no-shadow
      checkedCarts.map(({ skuNo, goodsNo, buyCounts, channelId }) => ({ skuNo, goodsNo, buyCounts, channelId }))
    )
    Taro.navigateTo({ url: getParamsUrl(routeNames.orderConfirmOrder, { orderType: EOrderType.ShopCart }) })
  }

  useDidShow(() => {
    let startX
    let startY
    document.addEventListener('touchstart', (ev) => {
      startX = ev.targetTouches[0].pageX
      startY = ev.targetTouches[0].pageY
    })

    document.addEventListener('touchmove', (ev) => {
      const moveX = ev.targetTouches[0].pageX
      const moveY = ev.targetTouches[0].pageY
      if (Math.abs(moveX - startX) > Math.abs(moveY - startY)) {
        ev.preventDefault()
      }
    }, { passive: false })
  })

  function renderFooterBar() {
    return isEdit ? (
      <ManageBar
        disabled={disabledManagent}
        checkAll={checkAll}
        handleCheckAll={handleCheckAll}
        onAddCollection={() => handleAddCollection()}
        onDel={() => handleDelete()}
      />
    ) : (
      <SubmitBar total={totalPrice} totalCounts={totalBuyCounts} handleBuy={() => handleBuy()} checkAll={checkAll}
                 handleCheckAll={handleCheckAll} />
    )
  }

  return (
    <PageContainer isTab className={styles.shopCartStyle}>
      <MMNavigation title='购物车' />
      {!loading && !isEmptyCart && (
        <View className={styles.head}>
          <MMCheckbox value={checkAll} onChange={handleCheckAll}>
            全选
          </MMCheckbox>
          <View className={styles.head_manager} onClick={handleManageClick}>
            {isEdit ? '完成' : '管理'}
          </View>
        </View>
      )}

      <ScrollView scrollY className={styles.content} style={{ height: !isWeapp ? '' : '' }}>
        {!loading && isEmptyCart ? (
          <MMEmpty
            fixed
            text='购物车还没有商品，快去购物吧～'
            src={icon_empty}
            imgStyle={{ width: 160, height: 160 }}
            suffix={
              <MMButton
                noBorder
                className={styles.emptyBtn}
                onClick={() => {
                  Taro.navigateTo({ url: routeNames.goodsGoodsList })
                }}
              >
                去购物
              </MMButton>
            }
          />
        ) : (
          <View className={styles.content_wrapper}>
            {/* 遍历购物车 */}
            {carts.map((cart, index) => (
              <ShopCartCell
                onSkuClick={() => handleSkuClick(cart)}
                key={cart.goodsNo! + cart.skuNo}
                data={cart}
                disableSlide={cartType === EShopCartType.Edit}
                onChangeStepper={(stepperValue) => {
                  handleChangeStepper(stepperValue, cart)
                }}
                onCheckChange={(checkValue) => {
                  setCarts((pre) =>
                    pre.map((ca, cartIdx) => {
                      if (cartIdx === index) {
                        return cartType === EShopCartType.Checked ? { ...ca, isChecked: checkValue } : {
                          ...ca,
                          isEdit: checkValue
                        }
                      }
                      return ca
                    })
                  )
                }}
                onDel={(skuNo) => handleDelete(skuNo)}
                onAddCollection={(goodsNo) => handleAddCollection(goodsNo)}
              />
            ))}

            {inValidCarts.length > 0 && (
              <View>
                <View className={styles.inValidTitle}>
                  <View className={styles.inValidTxt}>以下商品已失效</View>
                  {!isEdit && (
                    <View className={styles.clean} onClick={handleDeleteInvalid}>
                      清空失效
                    </View>
                  )}
                </View>

                {inValidCarts.map((cart) => (
                  <ShopCartCell key={cart.goodsNo! + cart.skuNo} data={cart} invalid disableSlide={isEdit}
                                onDel={(skuNo) => handleDelete(skuNo)} />
                ))}
                {/* 商品推荐 */}
                {/* <GoodRecommend list={recommendGoods} /> */}
              </View>
            )}
          </View>
        )}
      </ScrollView>

      {!isEmptyCart && renderFooterBar()}

      <GoodSkuPopup
        visible={skuVisible}
        good={good}
        skuValues={skuValues}
        buyCounts={buyCounts}
        footer={
          <View style={{ paddingBottom: 50 }}>
            <MMButton
              block
              disabled={disabledSkuConfirm}
              onClick={async () => {
                await handleSkuConfirm()
                getShopCarts()
              }}
            >
              确定
            </MMButton>
          </View>
        }
        onClose={() => {
          setSkuVisible(false)
        }}
        onCountChange={setBuyCounts}
        onSkuChange={(va) => {
          setSkuValues(va)
        }}
      />
      <TabBar />
    </PageContainer>
  )
}

const ShopCart = memo(Component)
export default ShopCart

/** 购物车业务 */
function useShopCartService() {
  const dialog = useDialog()
  const checkUserStatus = useCheckUserStatus()

  const [loading, setLoading] = useState(true)
  const [carts, setCarts] = useState<MyCart[]>([]) // 购物车
  const [inValidCarts, setInValidCarts] = useState<any[]>([]) // 失效购物车数据
  const [cartType, setCartType] = useState(EShopCartType.Checked) // 当前购物车状态  选择结算、管理删除

  const [toast] = useToast()
  const isEdit = useMemo(() => cartType === EShopCartType.Edit, [cartType]) // 是否在编辑中

  /**
   * 是否已经全选
   *
   * 购物车不为空且购物当前全部选中
   */
  const checkAll = useMemo(() => {
    return !!carts.length && (cartType === EShopCartType.Checked ? carts.every((it) => it.isChecked) : carts.every((it) => it.isEdit))
  }, [cartType, carts])

  // 禁用管理按钮
  const disabledManagent = useMemo(() => isEdit && !carts.some((it) => it.isEdit), [isEdit, carts])

  // 合计金额、合计数量
  const [totalPrice, totalBuyCounts] = useMemo<[number, number]>(() => {
    if (cartType === EShopCartType.Checked) {
      return carts
        .filter((it) => it.isChecked)
        .reduce(
          ([total, totalCounts], item) => {
            const { buyCounts = 0, skuPrice = 0 } = item
            return [plus(total, times(skuPrice, buyCounts)), totalCounts + buyCounts]
          },
          [0, 0]
        )
    }
    return [0, 0]
  }, [cartType, carts])

  useDidShow(() => {
    getShopCarts()
  })

  /** 获取购物车数据 */
  async function getShopCarts() {
    setLoading(true)
    const { data = [] } = await api['/wechat/mall/shopCart_GET']({})

    // 缓存编辑信息
    const editMap: Record<string, { isChecked: boolean; isEdit: boolean }> = {}
    ;[...carts, ...inValidCarts].forEach((item) => {
      // eslint-disable-next-line no-shadow
      const { goodsNo = '', skuNo = '', isChecked, isEdit } = item
      editMap[goodsNo + skuNo] = { isChecked, isEdit }
    })
    // 提取失效数据
    const invalidShopCarts: any[] = []
    // 提取有效数据
    const validShopCarts = data
      .map((it) => {
        // 回写编辑信息
        const { goodsNo = '', skuNo = '' } = it
        const isChecked = editMap[goodsNo + skuNo]?.isChecked || false
        // eslint-disable-next-line no-shadow
        const isEdit = editMap[goodsNo + skuNo]?.isEdit || false
        return { ...it, isChecked, isEdit }
      })
      .filter((item) => {
        if (!item.validity) {
          invalidShopCarts.push({ ...item, isChecked: false })
        }
        return item.validity
      })

    setCarts(validShopCarts)

    setInValidCarts(invalidShopCarts)
    setLoading(false)
  }

  const handleCheckAll = (value: boolean) => {
    const newCarts = carts.map((ca) => {
      return cartType === EShopCartType.Checked ? { ...ca, isChecked: value } : { ...ca, isEdit: value }
    })
    setCarts(newCarts)
  }

  const handleManageClick = () => {
    setCarts((pre) => pre.map((ca) => ({ ...ca, isChecked: false, isEdit: false })))
    setCartType((pre) => (pre === EShopCartType.Checked ? EShopCartType.Edit : EShopCartType.Checked))
  }

  /**
   * 删除购物车数据
   *
   * @description 如果传递单个skuNo表示为删除单个。否则从购物车中选取
   */
  function handleDelete(skuNo = '') {
    return new Promise<boolean>((resolve) => {
      const delSkuNos = skuNo ? [skuNo] : carts.filter((fData) => fData.isEdit).map((mData) => mData.skuNo!)
      if (delSkuNos.length) {
        dialog?.show({
          title: '提示',
          content: '是否确认删除选中商品？',
          okLoading: true,
          onOk: async () => {
            await api['/wechat/mall/shopCart_DELETE']({ delSkuNos })
            getShopCarts()
            resolve(false)
          },
          onCancel: () => {
            resolve(false)
          }
        })
      }
    })
  }

  /**
   * 清除无效商品数据
   *
   */
  async function handleDeleteInvalid() {
    const delSkuNos = inValidCarts.map((item) => item.skuNo)
    if (delSkuNos.length) {
      dialog?.show({
        title: '提示',
        content: '是否确定清除无效商品？',
        okLoading: true,
        onOk: async () => {
          await api['/wechat/mall/shopCart_DELETE']({ delSkuNos })
          getShopCarts()
        }
      })
    }
  }

  /**
   * 移入收藏夹
   */
  async function handleAddCollection(goodsNo = '') {
    const nos = goodsNo ? [goodsNo] : carts.filter((fData) => fData.isEdit).map((mData) => mData.goodsNo)
    await api['/wechat/collection/list_POST']([...new Set(nos)].map((relationalNo) => ({ relationalNo })))

    const delSkuNos = goodsNo
      ? carts.filter((mData) => mData.goodsNo === goodsNo).map((mData) => mData.skuNo!)
      : carts.filter((fData) => fData.isEdit).map((mData) => mData.skuNo!)
    await api['/wechat/mall/shopCart_DELETE']({ delSkuNos })
    getShopCarts()
  }

  const [handleChangeStepper] = useSuperLock(async (stepperValue, cart) => {
    await checkUserStatus.check()

    if (stepperValue > cart.skuStock) {
      toast!.message('库存不足，不可添加')
      return
    }

    // 赋值
    setCarts(
      carts.map((value) => {
        if (value.skuNo! + value.goodsNo === cart.skuNo + cart.goodsNo) {
          return {
            ...value,
            buyCounts: stepperValue
          }
        }
        return value
      })
    )

    const params: ShopCartModifyInputDto = {
      buyCounts: stepperValue,
      goodsNo: cart.goodsNo,
      skuNo: cart.skuNo,
      channelId: ''
    }

    toast?.loading()
    try {
      await api['/wechat/mall/shopCart_PUT'](params)
      await getShopCarts()
    } catch (error) {
    }
    toast?.hideLoading()
  }, 100)

  return {
    /** 购物车 */
    carts,
    setCarts,
    inValidCarts,
    setInValidCarts,
    cartType,
    setCartType,
    isEdit,
    checkAll,
    disabledManagent,
    /** 购物车结算总金额 */
    totalPrice,
    /** 购物车结算总数量 */
    totalBuyCounts,
    /** 获取购物数据 */
    getShopCarts,
    /** 点击选择全部 */
    handleCheckAll,
    /** 点击管理 */
    handleManageClick,

    handleDelete,

    handleDeleteInvalid,

    handleAddCollection,

    handleChangeStepper,
    checkUserStatus,
    loading
  }
}

/** sku业务 */
function useSkuService() {
  const [skuValues, setSkuValues] = useState<number[]>([])
  const [buyCounts, setBuyCounts] = useState(1)
  const [skuVisible, setSkuVisible] = useState(false)
  const [good, setGood] = useState<GoodsVO>({})
  const [toast] = useToast()

  const cartRef = useRef<MyCart>()

  // 当前选中的sku
  const skuDetail = useMemo(() => {
    const specIds = skuValues.join(',')
    return (good.goodsSkuDetailList || []).find((sk) => sk.specIds === specIds) || {}
  }, [good, skuValues])

  /**
   * 是否禁用sku确认按钮
   */
  const disabledSkuConfirm = useMemo(() => !skuDetail.skuNo, [skuDetail])

  async function handleSkuClick(cart: MyCart) {
    const { skuNo, goodsNo } = cart
    cartRef.current = cart
    const { data = {} } = await api['/wechat/goods/details/{no}_GET']({ no: goodsNo! })
    setGood(data)
    setBuyCounts(cart.buyCounts || 0)
    const sDetail = (data.goodsSkuDetailList || []).find((item) => item.skuNo === skuNo)
    const { specIds = '' } = sDetail || {}
    const values: number[] = specIds ? specIds.split(',').map((item) => parseInt(item, 10)) : []
    setSkuValues(values)
    setSkuVisible(true)
  }

  const handleSkuConfirm = async () => {
    // 如果不修改sku 则不需要传oldSkuNO
    const oldSkuNo = cartRef.current!.skuNo === skuDetail.skuNo ? undefined : cartRef.current!.skuNo
    const shopCartDto: ShopCartModifyInputDto = {
      buyCounts,
      goodsNo: good.goodsNo!,
      oldSkuNo,
      skuNo: skuDetail.skuNo
      //  delIds: [],
    }

    toast!.loading()
    try {
      await api['/wechat/mall/shopCart_PUT'](shopCartDto)
    } catch (error) {
    }
    toast?.hideLoading()
    setSkuVisible(false)
  }

  return {
    /** 显示sku弹窗 */
    skuVisible,
    setSkuVisible,
    disabledSkuConfirm,
    /** 商品详情 */
    good,
    skuValues,
    setSkuValues,
    buyCounts,
    setBuyCounts,
    /** sku详情 */
    skuDetail,
    /** 点击切换sku */
    handleSkuClick,
    /** 处理改变sku */
    handleSkuConfirm
  }
}

/** 推荐商品hook */
function useGoodRecommendService() {
  const [goods, setGoods] = useState<any[]>([])

  useDidShow(async () => {
    // const { data } = await mockRequest({ url: '/api/goods' })
    // setGoods(data.list)
  })

  return [goods]
}
