import { api } from '@wmeimob/taro-api'
import TencentCloudTaro from '@wmeimob/tencent-cloud/src/taro'

export const { upload } = new TencentCloudTaro({
  getOssToken: () => api['/wechat/api/oss/info_GET']()
})
