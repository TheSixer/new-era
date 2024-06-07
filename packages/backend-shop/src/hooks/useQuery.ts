import { useState } from 'react'
import { useLocation } from 'umi'

/**
 * 获取路由查询参数
 * @returns
 */
export default function useQuery() {
  const [query] = useState(new URLSearchParams(useLocation().search))
  return query
}
