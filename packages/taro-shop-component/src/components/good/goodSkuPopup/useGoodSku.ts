import { IMMSkuList, IMMSkuListProps } from '@wmeimob/taro-design/src/components/sku-list'
import { useEffect, useMemo, useState } from 'react'
import { useToast } from '@wmeimob/taro-design'
import { api } from '@wmeimob/taro-api'
import { GoodsSkuStockAndPriceVo, GoodsVO } from '@wmeimob/taro-api'
import { TGoodSku } from './const'
import { useRouter } from '@tarojs/taro'
import { EActivityType } from '@wmeimob/shop-data/src/enums/activity/EActivityType'

const splitIds = (specIds = '') => (specIds ? specIds.split(',').map((it) => parseInt(it, 10)) : [])

export default function useGoodSku(data: GoodsVO, value: number[], onSkuChange: (value: number[], sku?: TGoodSku) => void) {
  const { params }: { params: any } = useRouter()

  const { goodsSpecRelationList = [] } = data
  const goodsSkuDetailList = useMemo(() => {
    // 当商品参加活动时。需要过滤掉为参加活动的sku。
    let skuDetailList = data.goodsSkuDetailList || []
    const activityType = Number(params.activityType)
    const activity = data.marketingActivityList?.find((value) => value.activityType?.toString() === activityType.toString())
    const activityGoods = activity?.marketingActivityGoodsParams?.find((value) => value.goodsNo === data.goodsNo)
    if ((activityType === EActivityType.PreSale || activityType === EActivityType.FlashSale) && activityGoods) {
      const { marketingActivitySkuParams } = activityGoods
      skuDetailList = skuDetailList.filter((value) => marketingActivitySkuParams?.find((val) => val.skuNo === value.skuNo))
    }
    return skuDetailList
  }, [data.goodsSkuDetailList])

  const [sku, setSku] = useState<number[][]>([])
  const [list, setList] = useState<IMMSkuList<number>[]>([])

  const [toast] = useToast()

  // sku实时库存和价格信息map
  const [realTimeSku, setRealTimeSku] = useState<Record<string, GoodsSkuStockAndPriceVo>>({})

  /**
   * 当前选中的sku
   */
  const currentSku = useMemo(() => getCurrentSku(value, data), [value, goodsSkuDetailList])

  /** 当前实时sku */
  const currentRealTimeSku = useMemo(() => {
    return currentSku ? realTimeSku[currentSku.skuNo!] : undefined
  }, [realTimeSku, currentSku])

  /**
   * 当前显示的sku
   * 如果有实时的显示实时的
   * 如果有选中的sku则显示选中的
   * 没有的话默认是第一个sku
   * 都没有的话是个空
   */
  const currentShowSku = useMemo<GoodsSkuStockAndPriceVo>(() => {
    return currentRealTimeSku || currentSku || goodsSkuDetailList[0] || {}
  }, [currentSku, data.goodsSkuDetailList, currentRealTimeSku])

  /** 转换函数 */
  function convertGoodSku() {
    // 处理可用的sku集合
    const skus = goodsSkuDetailList.map(({ specIds }) => splitIds(specIds))
    setSku(skus)

    // 按顺序处理sku信息
    let sequenceSkuIds: Set<number>[] = []
    sequenceSkuIds = skus.reduce((result, item, index) => {
      if (index === 0) {
        item.forEach((it) => result.push(new Set([it])))
      } else {
        item.forEach((it, idx) => result[idx].add(it))
      }
      return result
    }, sequenceSkuIds)

    const specIds = sequenceSkuIds.map((set) => [...set])

    // 转换父级sku数据。
    const specListMap: IMMSkuList<number>[] = specIds.map((sids) => {
      const spec = goodsSpecRelationList.find((it) => it.specId === sids[0])
      const item = goodsSpecRelationList.find((it) => it.specId === spec?.specPid)
      // 保证子级数据顺序
      const items = sids.map((specId) => {
        const goodsSpec = goodsSpecRelationList.find((it) => it.specId === specId)!
        return { id: goodsSpec.specId!, text: goodsSpec.specName! }
      })
      return { title: item?.specName!, items }
    })

    setList(specListMap)

    // // 筛选父级sku
    // if (skus.length) {
    //   const [spids] = skus
    //   // 需要按照spids的顺序进行组合排序
    //   const specListMap: IMMSkuList<number>[] = spids.map((sid) => {
    //     const spec = goodsSpecRelationList.find((it) => it.specId === sid)
    //     const item = goodsSpecRelationList.find((it) => it.specId === spec?.specPid)

    //     const items = goodsSpecRelationList.filter(({ specPid }) => specPid === item?.specId).map((citem) => ({ id: citem.specId!, text: citem.specName! }))
    //     return { title: item?.specName!, items }
    //   })

    //   setList(specListMap)
    // }
  }

  useEffect(() => {
    convertGoodSku()

    // 商品初始的时候默认选中第一个
    if (!value.length && data.goodsSkuDetailList?.length) {
      const values = splitIds(data.goodsSkuDetailList[0].specIds!)
      handleSkuListClick(values)
    }
  }, [data])

  // 监听当前sku并筛选库存信息
  async function getSkuGoodsDetail(skuNo: string) {
    toast?.loading()
    try {
      const { data: skuData = {} } = await api['/wechat/goods/skuStockAndPrice/{skuNo}_GET'](skuNo)
      setRealTimeSku((pre) => ({ ...pre, [skuNo]: skuData }))
      toast?.hideLoading()
      return skuData
    } catch (error) {}
    toast?.hideLoading()
  }

  /** 计算当前sku */
  function getCurrentSku(skuValue: number[], goodVo: GoodsVO) {
    const specIds = skuValue.join(',')
    const { goodsSkuDetailList = [] } = goodVo
    return goodsSkuDetailList.find((it) => it.specIds === specIds)
  }

  /**
   * 处理sku选择发生变化事件
   * @param val
   * @returns
   */
  async function handleSkuListClick(val: number[]) {
    let currentSku = getCurrentSku(val, data)
    // 查实时sku库存
    if (currentSku) {
      const relaSku = await getSkuGoodsDetail(currentSku.skuNo!)
      currentSku = { ...currentSku, ...relaSku }
    }
    onSkuChange?.(val, currentSku)
  }

  const skuProps: IMMSkuListProps<number> = {
    value,
    list,
    sku
  }
  return {
    skuProps,
    currentSku,
    currentShowSku,
    handleSkuListClick
  }
}
