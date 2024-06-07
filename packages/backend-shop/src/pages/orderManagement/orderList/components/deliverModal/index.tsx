import { FC, memo, useEffect } from 'react'
import { IDeliverModalProps } from './const'
import { DrawerForm, ProFormDependency, ProFormRadio, ProFormSelect, ProFormSwitch } from '@ant-design/pro-form'
import ProFormInfo from '@wmeimob/backend-pro/src/components/form/proFormInfo'
import ProFormLimitInput from '@wmeimob/backend-pro/src/components/form/proFormLimitInput'
import { api } from '~/request'
import { OrderShipMethodEnum } from '~/enums/EOrder'
import ShippingGoodsTable from '../shippingGoodsTable'
import ProFormItem from '@ant-design/pro-form/lib/components/FormItem'
import useOrderGoodsShipStatus from '~/hooks/order/useOrderGoodsShipStatus'
import { message } from 'antd'
import { ShipInfoParam } from '@wmeimob/backend-api'

const Component: FC<IDeliverModalProps> = (props) => {
  const { modalProps, order } = props

  const { unShippedGoodsNum, shippedGoodsNum } = useOrderGoodsShipStatus(order?.items)

  // 有部分商品已经发货则不允许修改拆包发货
  useEffect(() => {
    if (modalProps.visible && shippedGoodsNum) {
      modalProps.form?.setFieldsValue({
        isSplit: true
      })
    }
  }, [modalProps.visible, shippedGoodsNum])

  const handleFormFinish = async (data) => {
    try {
      const { express, ...rest } = data

      let params: ShipInfoParam = rest

      if (express) {
        params = { ...params, expressCompany: express.label, expressCompanyCode: express.value }
      }
      await api['/admin/shipping/shipping_POST'](params)
      message.success('保存成功')
      props.onFinish()
      return true
    } catch (error) {
      message.error('保存失败')
    }
    return false
  }

  return (
    <DrawerForm {...modalProps} initialValues={{ shippingMethod: 0, isSplit: false }} layout="horizontal" onFinish={handleFormFinish}>
      <ProFormInfo label="订单编号" name="orderNo" />
      <ProFormInfo label="下单时间" name="gmtCreated" />
      <ProFormRadio.Group
        label="发货方式"
        name="shippingMethod"
        options={[
          { label: '商家配送', value: OrderShipMethodEnum.Store },
          { label: '无需物流', value: OrderShipMethodEnum.NoShip }
        ]}
        rules={[{ required: true }]}
      />

      <ProFormDependency name={['shippingMethod']}>
        {({ shippingMethod }) => {
          const disabled = shippingMethod === OrderShipMethodEnum.NoShip
          return disabled ? null : (
            <>
              <ProFormSelect
                label="快递公司"
                name="express"
                request={async () => {
                  const { data = [] } = await api['/admin/mallConfLogisticsCompany/mallExpressCompanyAll_GET']()
                  return data.map((it) => ({ label: it.expressCompany, value: it.expressCompanyCode }))
                }}
                fieldProps={{
                  labelInValue: true
                }}
                rules={[{ required: true }]}
              />

              <ProFormLimitInput
                label="物流单号"
                name="expressNo"
                maxLength={20}
                rules={[{ required: true, pattern: /^[a-zA-Z0-9]+$/, message: '单号格式不正确' }]}
              />
            </>
          )
        }}
      </ProFormDependency>

      <ProFormSwitch label="拆包发货" tooltip={{ title: '将订单中商品分为多个快递进行发货' }} name="isSplit" fieldProps={{ disabled: !!shippedGoodsNum }} />

      <ProFormDependency name={['isSplit']}>
        {({ isSplit }) => {
          return (
            <ProFormItem
              name="shippingItemList"
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  validator: (_v, value) => {
                    if (isSplit && unShippedGoodsNum) {
                      if (!value || !value.length) {
                        return Promise.reject(new Error('请至少勾选一个需要发货的商品'))
                      }
                    }
                    return Promise.resolve(true)
                  }
                }
              ]}
            >
              <ShippingGoodsTable isSplit={isSplit} order={order} />
            </ProFormItem>
          )
        }}
      </ProFormDependency>
    </DrawerForm>
  )
}

Component.displayName = 'DeliverModal'

const DeliverModal = memo(Component)
export default DeliverModal
