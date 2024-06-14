import { api } from '@wmeimob/taro-api'
import TencentCloudWeb from '@wmeimob/tencent-cloud/src/web'

export const { upload } = new TencentCloudWeb({
  getOssToken: api['/admin/api/oss/info_GET']
})
