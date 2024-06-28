import { FC, memo, useEffect, useState } from 'react'
import styles from './index.module.less'
import { ICustomerListProps } from './const'
import { PageContainer } from '@ant-design/pro-layout'
import { Button, Card, Col, Form, Input, Modal, Row, Select, Space, Spin, message } from 'antd'
import { ActivityOrderOutputDto, ActivitySeatInfoDto, api } from '@wmeimob/backend-api'
import useQuery from '~/hooks/useQuery'
import ProTable, { ProColumns } from '@ant-design/pro-table'
import useProTableRequest from '@wmeimob/backend-pro/src/hooks/useProTableRequest'
import { MActivityStatus, OActivityStatus } from '~/enums/event/EActivity'
import { useSuperLock } from '@wmeimob/utils/src/hooks/useSuperLock'
import dayjs from 'dayjs'
import classNames from 'classnames'

const Component: FC<ICustomerListProps> = (props) => {
  const [form] = Form.useForm()
  const query = useQuery()
  const activityId = query.get('activityId') || ''
  const { unifies } = useBasicService(activityId)
  const { spinning, seats, fetchSeats } = useSeatService()
  const [unifyId, setUnifyId] = useState('')
  
  const [visible, setVisible] = useState(false)

  const [currentSeat, setCurrentSeat] = useState<any>()

  const [value, setValue] = useState<ActivityOrderOutputDto>()
  const onChange = (row: ActivityOrderOutputDto) => {
    setValue(row)
  }

  const handleClick = (seat) => {
    setCurrentSeat(seat)
    setVisible(true)
  }

  useEffect(() => {
    unifies.length && setUnifyId(unifies[0].value)
  }, [unifies])

  useEffect(() => {
    unifyId !== '' && fetchSeats(activityId, unifyId)
  }, [unifyId])

  
  const [handleConfirm, loading] = useSuperLock(async () => {
    
    try {
      await api['/admin/mall/activityOrder/distribution_POST']({
        activityId,
        orderId: value?.id,
        seatId: currentSeat.seatId,
        seatNo: currentSeat.seatNo,
        unifyId: value?.unifyId
      })
      fetchSeats(activityId, unifyId)
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

  const handleChange = (changedValues) => {
    setUnifyId(changedValues)
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
        params={{ activityId, unifyId }}
        request={request}
        rowSelection={{
          selectedRowKeys: value ? [value.id!] : [],
          type: 'radio',
          getCheckboxProps: (record) => ({ disabled: !!record.orderStatus }),
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
            <Select value={unifyId} style={{ width: 200 }} options={unifies} onChange={handleChange} />
          </Form.Item>
        </Form>
      </Card>
      <Card>
      <Spin tip="Loading..." spinning={spinning}>
        <Card style={{ minHeight: 300 }}>
          <Row gutter={[16, 16]}>
            {seats.map((area, index) => (
              <Col className="gutter-row" span={3}  key={index}>
                <div className={classNames(styles.seat, { [styles.disabled]: !!area.userName })} onClick={() => !area.userName && handleClick(area)}>
                  <p className={styles.seatName}>{`${area.areaName}-${area.rowNumber}-${area.seatNo}`}</p>
                  {area.userName && <p className={styles.seatName}>{area.userName}</p>}
                </div>
              </Col>
            ))}
          </Row>
        </Card>
      </Spin>
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

  useEffect(() => {
    activityId && fetchUnifies()
  }, [activityId])

  async function fetchUnifies() {
    const { data = [] } = await api['/admin/mall/activity/queryUnifyList_GET']({ activityId })
    setUnifies(data.map(({ unifyDate, unifyTime, id }) => ({ label: id === 0 ? '统一场次' : `${dayjs(unifyDate).format('YYYY-MM-DD')} ${unifyTime}`, value: id })))
  }

  return { unifies, fetchUnifies }
}

function useSeatService() {
  const [spinning, setSpinning] = useState(false)
  const [seats, setSeats] = useState<ActivitySeatInfoDto[]>([])

  async function fetchSeats(activityId, unifyId) {
    setSpinning(true)
    try {
      const { data: { list = [] } } = await api['/admin/mall/activityOrder/distributionInfo_GET']({ activityId, unifyId })
      setSeats(list)
    } catch (error) {}
    setSpinning(false)
  }

  return { seats, spinning, fetchSeats }
}
