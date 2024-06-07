import { FC, memo } from 'react'
import styles from './index.module.less'
import { IShippingModalProps } from './const'
import { message, TimePicker, notification } from 'antd'
import ProForm, { ModalForm, ProFormSelect } from '@ant-design/pro-form'
import dayjs from 'dayjs'
import { api } from '@wmeimob/backend-api'

const Component: FC<IShippingModalProps> = (props) => {
  const { modalProps, data = [] } = props

  async function getRider() {
    const { data = {} } = await api['/admin/rider/usableList_GET']({ pageSize: 100 })
    const { list = [] } = data
    return list.map((item) => ({ ...item, label: item.name, value: item.id }))
  }

  async function onFinish(formData: any) {
    try {
      const response = (await api['/admin/shipping/shipping/batch_POST'](
        {
          ...formData,
          orderNoList: data.map((item) => item.orderNo!),
          deliveryTime: formData.deliveryTime.join(',')
        },
        { skipInterceptor: 'response' }
      )) as any
      if (response.data.code !== 0) {
        notification.open({
          message: response.data.msg,
          duration: null
        })
        props.onFinish(false)
      } else {
        message.success('发货成功')
        props.onFinish(true)
      }
      return true
    } catch (error) {}
    return false
  }

  return (
    <ModalForm
      {...modalProps}
      title="预计送达时间"
      layout="horizontal"
      labelCol={{ style: { width: 120 } }}
      wrapperCol={{ span: 8 }}
      onFinish={onFinish}
      className={styles.shippingModalStyle}
    >
      <ProForm.Item label="预计送达时间" name="deliveryTime" rules={[{ required: true }]}>
        <TimePicker.RangePicker
          placeholder={['开始时间', '最晚时间']}
          format="HH:mm"
          disabledTime={() => ({
            disabledHours: () => {
              const hour = dayjs().hour()
              return [...Array(24)].map((_, index) => index).filter((item) => item < hour)
            },
            disabledMinutes: (hour) => {
              const day = dayjs()
              const minute = day.minute()
              return hour === day.hour() ? [...Array(60)].map((_, index) => index).filter((item) => item < minute) : []
            }
          })}
        />
      </ProForm.Item>

      <ProFormSelect label="骑手姓名" name="riderId" request={getRider} rules={[{ required: true }]} />
    </ModalForm>
  )
}

Component.displayName = 'ShippingModal'

const ShippingModal = memo(Component)
export default ShippingModal
