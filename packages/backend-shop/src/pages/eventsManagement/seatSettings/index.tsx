import { FC, memo, useEffect, useState } from 'react'
import styles from './index.module.less'
import { ICustomerListProps } from './const'
import { PageContainer } from '@ant-design/pro-layout'
import { Button, Card, Form, Input, Modal, Select, Space, message } from 'antd'
import { ActivityOrderOutputDto, api } from '@wmeimob/backend-api'
import useQuery from '~/hooks/useQuery'
import ProTable, { ProColumns } from '@ant-design/pro-table'
import useProTableRequest from '@wmeimob/backend-pro/src/hooks/useProTableRequest'
import { MActivityStatus, OActivityStatus } from '~/enums/event/EActivity'
import { useSuperLock } from '@wmeimob/utils/src/hooks/useSuperLock'

const Component: FC<ICustomerListProps> = (props) => {
  const [form] = Form.useForm()
  const query = useQuery()
  const activityId = query.get('activityId') || ''
  const { unifies, seats } = useBasicService(activityId)
  const [visible, setVisible] = useState(false)

  const [currentSeat, setCurrentSeat] = useState<any>()
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  const [value, setValue] = useState<ActivityOrderOutputDto>()
  const onChange = (row: ActivityOrderOutputDto) => {
    setValue(row)
  }

  const handleClick = (seat, index) => {
    setCurrentSeat(seat)
    setCurrentIndex(index)
    setVisible(true)
  }

  
  const [handleConfirm, loading] = useSuperLock(async () => {
    
    try {
      await api['/admin/mall/activityOrder/distribution_POST']({
        activityId,
        orderId: value?.id,
        seatId: currentSeat.areaCode,
        seatNo: currentIndex + 1,
        unifyId: value?.unifyId
      })
      message.success('座位安排成功')
    } catch (error) {
      message.success('座位安排失败')
    }

    setVisible(false)
  })

  const [columns] = useState<ProColumns<ActivityOrderOutputDto>[]>([
    {
      dataIndex: 'searchString',
      hideInTable: true,
      formItemProps: { labelCol: { span: 0 }, colon: false },
      renderFormItem: () => {
        return <Input placeholder="用户名称/手机号/id" maxLength={20} allowClear />
      }
    },
    { title: '用户id', dataIndex: 'id', width: 60,hideInSearch: true },
    { title: '用户昵称', dataIndex: 'nickname', width: 80, hideInSearch: true },
    { title: '用户手机号', dataIndex: 'mobile', width: 100, hideInSearch: true },
    { title: '会员等级', dataIndex: 'openId', width: 80, hideInSearch: true },
    { title: '报名编号', dataIndex: 'id', width: 80, hideInSearch: true },
    {
      title: '状态',
      dataIndex: 'orderStatus',
      valueType: 'select',
      fieldProps: () => ({ options: OActivityStatus }),
      width: 80,
      renderText: (value: number) => MActivityStatus[value]
    },
    { title: '座位区域', dataIndex: 'areaName', width: 80, hideInSearch: true },
    { title: '排号', dataIndex: 'rowNumber', width: 80, hideInSearch: true },
    { title: '座位号', dataIndex: 'seatNo', width: 80, hideInSearch: true }
  ])

  const { request, actionRef } = useProTableRequest((params) => api['/admin/mall/activityOrder/queryList_GET'](params))

  const handleChange = (changedValues, allValues) => {
    console.log(changedValues, allValues)
  }

  /** 弹窗 */
  const modal = (
    <Modal
      visible={visible}
      width={1200}
      title="座位安排"
      onCancel={() => setVisible(false)}
      onOk={handleConfirm}
      confirmLoading={loading}
    >
      <ProTable
        actionRef={actionRef}
        rowKey="id"
        columns={columns}
        request={request}
        rowSelection={{
          selectedRowKeys: value ? [value.id!] : [],
          type: 'radio',
          onChange(_ks, [row]) {
            onChange?.(row)
          }
        }}
        search={{
          defaultCollapsed: false,
          labelWidth: 'auto',
          optionRender: (searchConfig, formProps, dom) => [
            ...dom
          ]
        }}
      />
    </Modal>
  )

  return (
    <PageContainer className={styles.deptManagementStyle}>
      <Card>
        <Form layout="inline" form={form} initialValues={{ layout: 'inline' }}>
          <Form.Item label="活动场次">
            <Select defaultValue="lucy" style={{ width: 200 }} options={unifies} onChange={handleChange} />
          </Form.Item>
        </Form>
      </Card>
      <Card>
        {seats?.map((area) => (
          <Card key={area.areaCode}>
            <Space size={[8, 16]} wrap>
              {new Array(area.seat).fill(null).map((_, index) => (
                <Button
                  style={{ width: 150 }}
                  onClick={() => handleClick(area, index)} key={index}>
                    {`${area.areaName}-${area.rowNumber}-${index + 1}`}
                  </Button>
              ))}
            </Space>
          </Card>
        ))}
      </Card>

      {modal}
    </PageContainer>
  )
}

Component.displayName = 'CustomerList'

const CustomerList = memo(Component)
export default CustomerList

function useBasicService(activityId) {
  const [unifies, setUnifies] = useState<any[]>([])
  const [seats, setSeats] = useState<any[]>([])

  useEffect(() => {
    activityId && fetchUnifies()
  }, [activityId])

  async function fetchUnifies() {
    const { data = [] } = await api['/admin/mall/activity/queryUnifyList_GET']({ activityId })
    setUnifies(data.map(({ unifyDate, unifyTime, id }) => ({ label: `${unifyDate} ${unifyTime}`, value: id })))

    const { data: seatData = [] } = await api['/admin/mall/activity/querySeatList_GET']({ activityId })
    setSeats(seatData)
  }

  return { unifies, seats, fetchUnifies }
}
