import { useMemo, useState } from 'react'
import { channelIdAtom, useCheckUserStatus } from '../../globalStore'
import { useToast } from '@wmeimob/taro-design'
import { api } from '@wmeimob/taro-api'
import { IGoodSkuPopupProps, TGoodSku } from '../../components/good/goodSkuPopup/const'
import { GoodsVO } from '@wmeimob/taro-api'
import { useAtom } from 'jotai'

interface IGoodSkuProps {
  /**
   * hook业务类型
   * 'detail'-商品详情 | 'list'-商品列表
   * @defult detail
   * @description 钩子函数在列表中业务逻辑有些许特殊
   */
  type?: 'detail' | 'list'

  /**
   * 直播id
   */
  liveId?: string

  /**
   * 添加购物车完成
   */
  onAddCart?(): void

  /**
   * 直接购买
   */
  onBuy?(data: {
    /** 商品编号 */
    goodsNo: string
    /** 商品sku编号 */
    skuNo: string
    /** 购买数量 */
    buyCounts: number
    /** 渠道id */
    channelId: string
  }): void
}

/**
 * 弹窗打开类型
 * open 直接打开弹窗 ｜ buy 直接购买 ｜ shopCart 加入购物车
 */
type OpenType = 'open' | 'buy' | 'shopCart'

/**
 * 商品sku弹窗业务
 *
 * @export
 * @param {IGoodSkuProps} props
 * @return {*}
 */
export default function useGoodsSkuPopup(props: IGoodSkuProps) {
  const [buyCounts, setBuyCounts] = useState(1) // 购买数量
  const [skuValues, setSkuValues] = useState<number[]>([]) // 选中的skuValue
  const [selectSku, setSelectSku] = useState<TGoodSku>({}) // 选中的sku
  const [visible, setVisible] = useState(false) // sku弹窗是否可见
  const [goodsDetail, setGoodsDetail] = useState<GoodsVO>({}) // 商品数据

  const liveId = props.liveId;

  const [toast] = useToast()

  const checkUserStatus = useCheckUserStatus()

  // 是否不可购买与加购
  const cannotBuy = useMemo(() => {
    const { skuNo, stock, activityStock } = selectSku
    // 选中有sku并且库存存在
    const can = !!skuNo && !!(activityStock ?? stock)
    return !can
  }, [selectSku])

  /**
   * 加入购物车
   */
  async function handlePushCart() {
    await checkUserStatus.check()

    if (validSku()) {
      await api['/wechat/mall/shopCart_POST']({
        skuNo: selectSku.skuNo!,
        goodsNo: goodsDetail.goodsNo,
        buyCounts,
        channelId: liveId ? liveId! : ''
      })
      toast?.message({ message: '加入购物车成功' })
      props.onAddCart?.()
      handleClose()
    }
  }

  /**
   * 直接购买
   * @returns
   */
  async function handleBuy() {
    await checkUserStatus.check()

    if (!validSku()) {
      return
    }
    handleClose()
    props.onBuy?.({ skuNo: selectSku.skuNo!, goodsNo: goodsDetail.goodsNo!, buyCounts, channelId: liveId ? liveId! : ''  })
  }

  /**
   * 单sku直接购买/加购物车
   * @returns
   */
  async function handleSingleSkuBuy({ goodsNo = '' }: GoodsVO, { skuNo = '' }: TGoodSku, openType: OpenType = 'buy') {
    if (openType === 'buy') {
      handleClose()
      props.onBuy?.({ skuNo, goodsNo, buyCounts,channelId: liveId ? liveId! : ''  })
    } else if (openType === 'shopCart') {
      await api['/wechat/mall/shopCart_POST']({ skuNo, goodsNo, buyCounts, channelId: liveId ? liveId! : '' })
      toast?.message({ message: '加入购物车成功' })
      props.onAddCart?.()
      handleClose()
    }
  }

  /**
   * 处理弹窗sku变化
   */
  const onSkuChange = (va, sku) => {
    setSkuValues(va)
    setSelectSku(sku || {})
    setBuyCounts(1)
  }

  /**
   * 打开弹窗
   *
   * goodsSku数量
   *  只有一个
   *    存在选中sku => 直接购买
   *    不存在选中su => 弹窗选择
   *  大于一个
   *    弹窗选择
   *
   * @param {GoodsVO} goods
   * @param {OpenType} [openType='buy']
   * @return {*}
   */
  async function handleOpen(goods: GoodsVO, openType: OpenType = 'buy') {
    const { goodsSkuDetailList = [] } = goods
    await checkUserStatus.check()

    // 是否是单sku
    // 单SKU也要弹窗，不然单SKU无法购买多个。
    // if (goodsSkuDetailList.length === 1 && openType !== 'open') {
    //   const sku = props.type === 'list' ? goodsSkuDetailList[0] : selectSku

    //   if (sku.skuNo) {
    //     const { stock, activityStock } = sku

    //     const resetStock = activityStock ?? stock
    //     if (!resetStock) {
    //       toast?.message({ message: '库存不足', mask: true })
    //     } else {
    //       return handleSingleSkuBuy(goods, sku, openType)
    //     }
    //   }
    // }

    // 如果商品列表。清空选中sku重新计算选中sku
    if (props.type === 'list') {
      setSkuValues([])
      setSelectSku({})
    }

    setGoodsDetail({ ...goods })
    setVisible(true)
  }

  /**
   * 关闭弹窗
   */
  function handleClose() {
    if (visible) {
      resetState()
      setVisible(false)
    }
  }

  /**
   * 验证sku信息
   */
  function validSku() {
    if (!selectSku.skuNo) {
      toast?.message({ message: '请选择sku', mask: true })
      return false
    }
    if (!buyCounts) {
      toast?.message({ message: '购买数量必须大于0', mask: true })
      return false
    }
    return true
  }

  /**
   * 重置state信息
   */
  function resetState() {
    // setSkuValues([])
    // setSelectSku({})
    setGoodsDetail({})
  }

  return {
    /** 选中的sku */
    selectSku,
    /** 不可购买 */
    cannotBuy,
    /** 打开弹窗 */
    open: handleOpen,
    /** 关闭弹窗 */
    close: handleClose,
    /** 点击购买 */
    onBuy: handleBuy,
    /** 点击加入购物 */
    onAddCart: handlePushCart,
    /** sku弹窗props */
    skuProps: {
      visible,
      good: goodsDetail,
      skuValues,
      buyCounts,
      onSkuChange,
      onCountChange: setBuyCounts,
      onClose: handleClose
    } as IGoodSkuPopupProps
  }
}
