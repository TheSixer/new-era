import { api } from '@wmeimob/backend-api'
import { PaginationProps } from 'antd'
import { useState } from 'react'
import { useConsumer } from '../context'

export default function useMaterialList() {
  const { dispatch } = useConsumer()
  const [loading, setLoading] = useState(false)
  // 响应式布局为3,4,6 所以12个一页最为合理
  const [pageInfo, setPageInfo] = useState<PaginationProps>({
    current: 1,
    pageSize: 12,
    total: 0,
    showTotal: (total) => `共 ${total} 项`,
    showSizeChanger: false
  })

  async function getList(param: any) {
    setLoading(true)
    try {
      const { data = {} } = await api['/admin/api/mallConfMaterial/queryList_GET'](param)
      setPageInfo({ ...pageInfo, current: param.pageNum, total: data.total })
      dispatch({ type: 'ChangeList', list: data.list || [] })
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    setLoading,
    pageInfo,
    setPageInfo,
    getList
  }
}
