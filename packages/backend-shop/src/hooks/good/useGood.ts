import useGoodClassifyColumn from './useGoodClassifyColumn'
import useGoodRequest from './useGoodRequest'

/**
 * 商品列表通用hook
 *
 * 提供了一些通用的逻辑或者数据配置
 * @returns
 */
export default function useGood() {
  const [classifyColumn] = useGoodClassifyColumn()
  const { request, dataSource: dataSourceRef, actionRef } = useGoodRequest()

  return {
    actionRef,
    /** 表格请求 */
    request,
    /** 表格数据 */
    dataSourceRef,
    /** 分类列 */
    column: {
      classifyColumn
    }
  }
}
