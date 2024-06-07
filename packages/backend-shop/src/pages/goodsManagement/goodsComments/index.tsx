import PageGoodsComments, { useService } from '@wmeimob-modules/goods-backend/src/pages/goodsComments'
import { apiUrl } from '~/config'
import { downloadStaticFile } from '~/utils/static'

const Component = () => {
  const service = useService({ apiUrl })

  return <PageGoodsComments service={service} onTemplateDownloadClick={() => downloadStaticFile('templates/评价导入模板.xlsx')} />
}

export default Component
