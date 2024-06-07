import { MMProColumns } from 'MMProType'
import { useState } from 'react'
import { api } from '~/request'
import { GoodsVO } from '@wmeimob/backend-api'
import convertToTree from '@wmeimob/utils/src/tree/convertToTree'

/**
 * 商品分类表格列
 * @returns
 */
export default function useGoodClassifyColumn() {
  const [classifyColumn] = useState<MMProColumns<GoodsVO>>({
    title: '商品分类',
    dataIndex: 'classifys',
    valueType: 'cascader',
    request: async () => {
      const { data = [] } = await api['/admin/mall/classify/tree_GET']()
      return convertToTree(data, { title: 'name', value: 'id' })
    }
  })

  return [classifyColumn]
}
