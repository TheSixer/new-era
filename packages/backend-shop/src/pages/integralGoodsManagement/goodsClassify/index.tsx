import MMGoodsClassifyPage from '@wmeimob/backend-pages-shop/src/pages/goodsManagement/goodsClassify'
import { upload } from '~/components/tencent-cloud'
import { api } from '~/request'

export default function Page() {
  return (
    <MMGoodsClassifyPage
      upload={upload}
      api={{
        query: () => api['/admin/mall/classify/tree_GET']({ goodsType: 1 }),
        del: api['/admin/mall/classify/delete/{id}_DELETE'],
        add: (data) => api['/admin/mall/classify/add_POST']({ ...data, goodsType: 1 }),
        update: api['/admin/mall/classify/update_PUT'],
        move: api['/admin/mall/classify/move_POST']
      }}
    />
  )
}
