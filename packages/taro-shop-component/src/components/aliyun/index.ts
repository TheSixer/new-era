import AliYunTaro from '@wmeimob/tencent-cloud/src/taro'
import { api } from '@wmeimob/taro-api'

const { upload } = new AliYunTaro({
  getOssToken: () => api['/wechat/api/oss/info_GET']()
})

export { upload }
