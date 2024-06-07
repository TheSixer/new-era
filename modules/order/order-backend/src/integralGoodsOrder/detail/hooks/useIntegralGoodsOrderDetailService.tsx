import { api } from '@wmeimob/backend-api'
import useProTableForm from '@wmeimob/backend-pro/src/hooks/useProTableForm'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import useOrderTypes from '../../list/hooks/useOrderTypes'
import { orderDetailAtom } from '../store'

export function useIntegralGoodsOrderDetailService(options: { orderNo: string }) {
  const { orderNo } = options

  const [loading, setLoading] = useState(true)
  const [detail, setDetail] = useAtom(orderDetailAtom)

  const { orderState } = useOrderTypes(detail.orderStatus)

  async function getDetail(orderNo: string) {
    setLoading(true)
    const { data = {} } = await api['/admin/orders/{orderNo}_GET'](orderNo)
    setDetail(data)
    setLoading(false)
  }

  useEffect(() => {
    getDetail(orderNo)
  }, [])

  const deliverForm = useProTableForm({ title: () => '订单发货' })

  /** 发货 */
  function onShipping() {
    deliverForm.modalProps.form.setFieldsValue(detail)
    deliverForm.setEditData(detail)
    deliverForm.setVisible(true)
  }

  return {
    loading,
    detail,
    orderState,
    deliverForm,
    onShipping
  }
}
