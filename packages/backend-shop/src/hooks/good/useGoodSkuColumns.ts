import { useMemo } from 'react'
import { MMProColumns } from 'MMProType'
import { GoodsSkuDTO, GoodsVO } from '@wmeimob/backend-api'

/**
 * 商品sku表格列
 *
 * 根据商品goodsSpecRelationList计算出sku列信息
 *
 * @export
 * @param {GoodsVO} data
 * @return {*}
 */
export default function useGoodSkuColumns(data: GoodsVO) {
  const { goodsSpecRelationList = [] } = data

  const columns = useMemo(() => {
    return goodsSpecRelationList
      .filter(({ specPid }) => !specPid) // 提取父级计算出表格列数
      .map((item, index) => {
        return {
          dataIndex: item.specId,
          title: item.specName,
          render: (_, { specIds = '' }) => {
            const sid = specIds.split(',')[index]
            const { specName } = goodsSpecRelationList.find((item) => `${item.specId}` === sid) || {}
            return specName
          }
        } as MMProColumns<GoodsSkuDTO>
      })
      .concat([
        { dataIndex: 'skuImg', title: 'sku图片', valueType: 'image', width: 80 },
        { dataIndex: 'skuNo', title: 'sku编码' }
      ])
  }, [data])

  return [columns]
}
