import { FC, memo, ReactNode, useEffect, useState } from 'react'
import { IAuditModalProps } from './const'
import { ModalForm, ProFormDependency, ProFormDigit, ProFormRadio, ProFormSelect, ProFormTextArea } from '@ant-design/pro-form'
import ProFormInfo from '@wmeimob/backend-pro/src/components/form/proFormInfo'
import { api } from '~/request'
import { AddressOutputDto, RefundAgreeParam } from '@wmeimob/backend-api'
import { message, Space, Typography } from 'antd'
import { ERefundType, MRefundType } from '@wmeimob/shop-data/src/enums/refund/ERefundType'
import { EFreightState } from '~/enums/aftersale/EFreightState'
import { ERefundStatus } from '@wmeimob/shop-data/src/enums/refund/ERefundStatus'

const AGREE = 'agree'
const REFUSE = 'refuse'

const Component: FC<IAuditModalProps> = (props) => {
  const { data = {}, onSuccess, ...modalProps } = props
  const { refundNo, refundType, refundStatus, orderFreightAmount = 0, freightState } = data
  const { addressList } = useAddressListService(modalProps.visible)

  /**
   * 是否渲染退款金额
   * 退款同意 或者 退货退款-商家验货同意
   */
  const isRenderAmount = refundType === ERefundType.Refund || (refundType === ERefundType.Every && refundStatus === ERefundStatus.StoreCheck)

  // 是否可以退运费
  const isRenderFreigthAmount = isRenderAmount && freightState === EFreightState.Can

  // 设置退运费金额
  useEffect(() => {
    if (modalProps.visible && isRenderFreigthAmount) {
      modalProps.form?.setFields([{ name: 'freightAmount', value: orderFreightAmount }])
    }
  }, [modalProps.visible, isRenderFreigthAmount])

  // 默认选中默认收货地址
  useEffect(() => {
    const defaultAddress = addressList.find((item) => [2, 3].includes(item.isDefault!))
    if (defaultAddress) {
      modalProps.form?.setFields([{ name: 'address', value: defaultAddress.id }])
    }
  }, [addressList])

  async function handleFinish(value) {
    const { auditResult, address, refundAmount, storeNote, freightAmount } = value

    try {
      // 不同意
      if (auditResult === REFUSE) {
        if (refundStatus === ERefundStatus.StoreCheck) {
          // 验货不通过
          await api['/admin/refund/checkRefuse_PUT']({ refundAmount: 0, storeNote, refundNo })
        } else if (refundStatus === ERefundStatus.StoreProcess) {
          // 商家处理-拒绝
          await api['/admin/refund/refuse_PUT']({ refundNo, storeNote })
        }
      } else {
        if (refundStatus === ERefundStatus.StoreCheck) {
          // 验货成功
          await api['/admin/refund/checkAgree_PUT']({ freightAmount, refundAmount, refundNo, storeNote })
        } else if (refundStatus === ERefundStatus.StoreProcess) {
          // 同意退款
          let params: RefundAgreeParam = {
            refundNo,
            freightAmount,
            refundAmount,
            storeNote
          }
          if (data.refundType === ERefundType.Every) {
            const addressInfo = addressList.find((it) => it.id === address)!
            const { provinceName, cityName, areaName, mobile, name, singleAddress } = addressInfo
            params = { ...params, provinceName, cityName, areaName, singleAddress, mobile, name }
          }
          await api['/admin/refund/agree_PUT'](params)
        }
      }
      message.success('操作成功')
      onSuccess?.()
      return true
    } catch (error) { }
    return false
  }

  const requireRule = {
    rules: [{ required: true }]
  }
  return (
    <ModalForm {...modalProps} title="售后审核" initialValues={{ auditResult: AGREE }} onFinish={handleFinish}>
      <ProFormInfo
        label="售后信息"
        info={
          <Space>
            <span>{data.refundNo}</span>
            <span>{MRefundType[data.refundType!]}</span>
          </Space>
        }
      />

      <ProFormRadio.Group
        label="审核结果"
        name="auditResult"
        options={[
          { label: '同意', value: AGREE },
          { label: '不同意', value: REFUSE }
        ]}
        {...requireRule}
      />

      <ProFormDependency name={['auditResult']}>
        {({ auditResult }, { setFields }) => {
          const isRenderAddress = refundType === ERefundType.Every && refundStatus !== ERefundStatus.StoreCheck

          if (auditResult === REFUSE) {
            return <ProFormTextArea label="备注信息" name="storeNote" {...requireRule} fieldProps={{ maxLength: 200 }} />
          }

          return (
            <>
              {isRenderAmount && (
                <>
                  <ProFormDigit
                    label="退款金额"
                    name="refundAmount"
                    fieldProps={{ max: data.refundAmount, min: 0, precision: 2 }}
                    {...requireRule}
                    extra={`最多可退${data.refundAmount}元`}
                  />

                  {isRenderFreigthAmount && (
                    <ProFormDigit
                      label="退运费金额"
                      name="freightAmount"
                      fieldProps={{ max: orderFreightAmount, min: 0, precision: 2 }}
                      {...requireRule}
                      extra={`订单运费仅可退一次。本次最多可退${orderFreightAmount}元`}
                    />
                  )}
                </>
              )}

              {isRenderAddress && <ProFormSelect label="收货地址" name="address" {...requireRule} options={addressList} />}

              <ProFormTextArea label="备注信息" name="storeNote" fieldProps={{ maxLength: 200, showCount: true }} />
            </>
          )
        }}
      </ProFormDependency>
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
