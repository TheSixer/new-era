import Taro from '@tarojs/taro'
import { useState } from 'react'
import { useDialog, useToast } from '@wmeimob/taro-design'
import { api } from '@wmeimob/taro-api'
import { RefundMasterDto } from '@wmeimob/taro-api'
import { routeNames } from '../../routes'
import getParamsUrl from '@wmeimob/taro-utils/src/getParamsUrl'

interface IUseAfterSaleOption {
  onDeleted?(): void
}

/**
 * 售后通用业务
 */
export default function useAfterSale(refund: RefundMasterDto, options: IUseAfterSaleOption = {}) {
  const dialog = useDialog()
  const [toast] = useToast()
  const [showPop, setShowPop] = useState(false)

  // 删除售后
  function deleteRecord() {
    dialog?.show({
      title: '提示',
      content: '是否确认删除此售后记录？',
      okLoading: true,
      onOk: async () => {
        await api['/wechat/web/refund/delete_GET']({ refundNo: refund.refundNo })
        toast?.message({ message: '删除成功', duration: 1000 }, () => {
          options.onDeleted?.()
        })
      }
    })
  }

  // 查看物流
  function logisticsClick(ite) {
    Taro.navigateTo({
      url: getParamsUrl(routeNames.orderLogistics,
        { expressNo: ite.expressNo, orderNo: ite.refundNo, isRefund: 1 })
    })
  }

  return {
    showPop,
    setShowPop,
    /** 删除物流记录 */
    deleteRecord,
    /** 点击查看物流 */
    logisticsClick
  }
}
