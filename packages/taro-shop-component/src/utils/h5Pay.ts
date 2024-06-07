import { api } from '@wmeimob/taro-api'
import { rootUrl } from '../config'
import { routeNames } from '../routes'
import { isIphone } from '@wmeimob/taro-design/src/components/utils'

/**
 * h5支付
 *
 */
export async function h5Pay(orderNo: string) {
  // 获取支付参数
  const res = await api['/wechat/orders/pay/h5/{orderNo}_GET'](orderNo!)
  const { mwebUrl }: any = res.data?.payParam || {}
  const redirectUrl = encodeURIComponent(`${rootUrl}/#${routeNames.orderOrderDetail}?orderNo=${orderNo!}&goHome=1`)
  const linkUrl = mwebUrl + `&redirect_url=${redirectUrl}`
  if (isIphone) {
    // 如果是iOS平台，使用location.href，iOS里面限制了window.open的使用。
    window.location.href = linkUrl
  } else {
    window.open(linkUrl)
  }
}
