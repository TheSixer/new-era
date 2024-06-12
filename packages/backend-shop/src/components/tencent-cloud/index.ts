import { api } from '~/request'
import TencentCloudWeb from '@wmeimob/tencent-cloud/src/web'

export const { upload } = new TencentCloudWeb({
  getOssToken: api['/admin/api/oss/info_GET']
})
