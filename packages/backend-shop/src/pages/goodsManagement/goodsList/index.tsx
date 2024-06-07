import MMGoodsListPage, { useService } from '@wmeimob-modules/goods-backend/src/pages/goodsList'
import { history } from 'umi'
import { routeNames } from '~/routes'
import { useState } from 'react'
import { rootUrl } from '~/config'

export default function Page() {
  const [open,setOpen] = useState(false )
  const [good,setGood] = useState({} )

  const service = useService({
    onEdit: (record) => history.push({ pathname: routeNames.goodsManagementGoodsListGoodsCreate, query: { goodsNo: `${record.goodsNo}` } }),
    onCopy: (record) => history.push({ pathname: routeNames.goodsManagementGoodsListGoodsCreate, query: { goodsNo: `${record.goodsNo}`, type: 'copy' } }),
    onDetail: (record) => history.push({ pathname: routeNames.goodsManagementGoodsListGoodsDetail, query: { goodsNo: `${record.goodsNo}` } }),
    onStock: (record) => history.push({ pathname: routeNames.goodsManagementGoodsListGoodsStock, query: { goodsNo: `${record.goodsNo}` } }),
    onCopyLink: (record) => {
      setGood(record)
      setOpen(true)
    }
  })
  return <MMGoodsListPage service={service} onAdd={() => history.push(routeNames.goodsManagementGoodsListGoodsCreate)} open={open} good={good} setOpen={setOpen} rootUrl={rootUrl}/>
}
