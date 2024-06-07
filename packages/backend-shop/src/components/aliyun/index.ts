import { api } from '~/request'
import AliYunWeb from '@wmeimob/aliyun/src/web'

export const { upload } = new AliYunWeb({
  getOssToken: api['/admin/api/oss/info_GET']
})
