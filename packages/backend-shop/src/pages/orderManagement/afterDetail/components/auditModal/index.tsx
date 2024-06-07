import { FC, memo, ReactNode, useEffect, useMemo, useState } from 'react'
import { IAuditModalProps } from './const'
import { ModalForm, ProFormSelect, ProFormTextArea } from '@ant-design/pro-form'
import { api } from '~/request'
import { AddressOutputDto, RefundAgreeParam } from '@wmeimob/backend-api'
import { message, Space, Typography } from 'antd'
import { ERefundType } from '@wmeimob/shop-data/src/enums/refund/ERefundType'
import { EFreightState } from '~/enums/aftersale/EFreightState'
import { ERefundStatus } from '@wmeimob/shop-data/src/enums/refund/ERefundStatus'
import ProFormInfo from '@wmeimob/backend-pro/src/components/form/proFormInfo'
import mmCurrenty, { mmAdds } from '@wmeimob/utils/src/mmCurrency'
import { systemConfig } from '~/config'
const { config } = systemConfig

const Component: FC<IAuditModalProps> = (props) => {
  const { data = {}, onSuccess, ...modalProps } = props
  const { refundNo, refundType, refundStatus, freightState, refundInfo } = data
  const { addressList } = useAddressListService(modalProps.visible)

  /**
   * 是否渲染退款金额
   * 退款同意 或者 退货退款-商家验货同意
   */
  const isRenderAmount =
    (refundType === ERefundType.Refund && refundStatus === ERefundStatus.StoreProcess) ||
    (refundType === ERefundType.Every && refundStatus === ERefundStatus.StoreCheck)

  // 是否可以退运费
  const isRenderFreigthAmount = isRenderAmount && freightState === EFreightState.Can

  const freightAmount = refundInfo?.freightAmount || 0

  const refundAmount = useMemo(() => {
    const { data = [] } = refundInfo || {}
    return data.reduce((res, item) => mmAdds(res, item.refundAmount || 0), 0)
  }, [refundInfo])

  const refundScore = useMemo(() => {
    const { data = [] } = refundInfo || {}
    return data.reduce((res, item) => mmAdds(res, item.refundScore || 0), 0)
  }, [refundInfo])

  // 默认选中默认收货地址
  useEffect(() => {
    const defaultAddress = addressList.find((item) => [2, 3].includes(item.isDefault!))
    if (defaultAddress) {
      modalProps.form?.setFields([{ name: 'address', value: defaultAddress.id }])
    }
  }, [addressList])

  async function handleFinish(value) {
    const { address, storeNote } = value

    try {
      if (refundStatus === ERefundStatus.StoreCheck) {
        // 验货成功
        await api['/admin/refund/checkAgree_PUT']({ refundNo, storeNote, freightAmount, refundItemList: refundInfo!.data })
      } else if (refundStatus === ERefundStatus.StoreProcess) {
        // 同意退款
        let params: RefundAgreeParam = { refundNo, storeNote }
        if (data.refundType === ERefundType.Every) {
          const addressInfo = addressList.find((it) => it.id === address)!
          const { provinceName, cityName, areaName, mobile, name, singleAddress } = addressInfo
          params = { ...params, provinceName, cityName, areaName, singleAddress, mobile, name }
        } else if (data.refundType === ERefundType.Refund) {
          params = { ...params, freightAmount, refundItemList: refundInfo!.data }
        }
        await api['/admin/refund/agree_PUT'](params)
      }
      message.success('操作成功')
      onSuccess?.()
      return true
    } catch (error) {}
    return false
  }

  const isRenderAddress = refundType === ERefundType.Every && refundStatus !== ERefundStatus.StoreCheck

  return (
    <ModalForm {...modalProps} layout="horizontal" title="审核-同意" labelCol={{ span: 4 }} onFinish={handleFinish}>
      <ProFormInfo label="审核结果" info="同意" />

      {isRenderAmount && (
        <ProFormInfo
          label="退款金额"
          info={
            <Space size={15}>
              <span>{mmCurrenty(refundAmount)}</span>

              {isRenderFreigthAmount && !!freightAmount && (
                <>
                  <span>退运费金额:</span>
                  <span>{mmCurrenty(freightAmount)}</span>
                </>
              )}

              {config.enableScore && !!refundScore && (
                <>
                  <span>退积分:</span>
                  <span>{refundScore}</span>
                </>
              )}
            </Space>
          }
        />
      )}

      {isRenderAddress && (
        <>
          <ProFormInfo label="说明" info="确认后进入待退货状态，用户退货后确认退款金额。" />

          <ProFormSelect label="收货地址" name="address" rules={[{ required: true }]} options={addressList} />
        </>
      )}

      <ProFormTextArea label="备注信息" name="storeNote" fieldProps={{ maxLength: 200, showCount: true }} />
    </ModalForm>
  )
}

Component.displayName = 'AuditModal'

const AuditModal = memo(Component)
export default AuditModal

/** 收货地址业务 */
function useAddressListService(visible: boolean = false) {
  const [addressList, setAddressList] = useState<(AddressOutputDto & { label: ReactNode; value: any })[]>([])

  const getAdressList = async () => {
    const { data = [] } = await api['/admin/mall/address/queryListAll_GET']({})
    const addressListOptions = data.map((it) => {
      const { name, mobile, provinceName = '', cityName = '', areaName = '', singleAddress = '' } = it
      const label = (
        <Space>
          <Typography.Text type="secondary">{name}</Typography.Text>
          <Typography.Text type="secondary">{mobile}</Typography.Text>
          <span>{provinceName + cityName + areaName + singleAddress}</span>
        </Space>
      )

      return { ...it, label, value: it.id }
    })
    setAddressList(addressListOptions)
  }

  useEffect(() => {
    if (visible) {
      getAdressList()
    }
  }, [visible])

  return {
    addressList
  }
}
