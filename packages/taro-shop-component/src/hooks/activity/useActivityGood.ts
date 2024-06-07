import { GoodsVO, MarketingActivityGoodsVo } from '@wmeimob/taro-api'

/**
 * 营销活动商品
 * @returns
 */
export default function useActivityGood() {
  /**
   * 转换数据格式
   * 将活动数据转换成普通商品格式
   *
   * @param {MarketingActivityGoodsVo} data
   * @return {*}  {GoodsVO}
   */
  function convertGood(data: MarketingActivityGoodsVo): GoodsVO {
    const { price } = data

    return {
      ...data,
      salePrice: price
    }
  }

  return {
    convertGood
  }
}
