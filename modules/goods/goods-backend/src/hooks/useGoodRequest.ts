import { api } from '@wmeimob/backend-api/src/request'
import useProTableRequest from '@wmeimob/backend-pro/src/hooks/useProTableRequest'
import { getClassifyValues, setClassifyValues } from '../pages/goodsClassify/const'

/**
 * 表格请求
 * @returns
 */
export default function useGoodRequest() {
  const request = useProTableRequest(async (params: any) => api['/admin/goods_GET'](params), {
    paramsFormat(params) {
      let { classifys, ...rest } = params
      //   处理商品分类
      if (classifys?.length) {
        const classify = getClassifyValues(classifys)
        rest = { ...rest, ...classify }
      }

      rest.selectSortType = 10
      return rest
    },
    dataFormat: (data) => {
      return data.map((it) => {
        return {
          ...it,
          classifys: setClassifyValues(it)
        }
      })
    }
  })

  return request
}
