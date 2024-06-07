import Taro from '@tarojs/taro'
import PageClassifies, { useService } from '@wmeimob/taro-pages/src/pages/classifys'
import { FC, memo } from 'react'
import TabBar from '../../../custom-tab-bar/tabBar'
import { api } from '@wmeimob/taro-api'
import { routeNames } from '../../../routes'
import getParamsUrl from '@wmeimob/taro-utils/src/getParamsUrl'

/**
 * 商品分类页面
 * 提供了一个基础分类模板。需要按照数据格式传递参数
 * 如果后台返回数据格式不符合。建议提供一个转换函数将数据转换为组件支持的格式
 * 当然你也可以直接修改组件（不建议）
 *
 * @return {*}
 */
const Component: FC = () => {
  const service = useService({
    request: () => api['/wechat/goods/classify_GET']({})
  })

  return (
    <PageClassifies
      service={service}
      tabBar={<TabBar />}
      onClick={(item) => {
        Taro.navigateTo({ url: getParamsUrl(routeNames.goodsGoodsList, { classifyId: item.value }) })
      }}
    />
  )
}

const Categorys = memo(Component)
export default Categorys
