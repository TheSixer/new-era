import { GoodsVO } from '../../request/data-contracts'

/**
 * 扩展了活动相关字段的商品类型
 */
export interface IGoodsVoWithActivity extends GoodsVO {
  /**
   * 根据 GoodsVO.marketingActivityList 格式化出的纯文本
   *
   * @example 满aa减bb
   */
  formatActivitiesText?: string[]
}
