import { ModalForm, ProFormCheckbox, ProFormDigit, ProFormText } from '@ant-design/pro-form'
import { api } from '@wmeimob/backend-api'
import { RefundReasonOutputDto } from '@wmeimob/backend-api/src/request/data-contracts'
import ProFormLimitInput from '@wmeimob/backend-pro/src/components/form/proFormLimitInput'
import { MRefundScene, ORefundScene } from '@wmeimob/shop-data/src/enums/refund/ERefundScene'
import { Button, Card, Form, message, Modal, Space, Table } from 'antd'
import { ColumnProps } from 'antd/lib/table/Column'
import { FC, memo, useEffect, useMemo, useState } from 'react'

const { useForm } = Form

interface IRefundReasonsSettingProps {
  disabled?: boolean
}

const Component: FC<IRefundReasonsSettingProps> = (props) => {
  const { disabled } = props

  const [dataSource, setDataSource] = useState<RefundReasonOutputDto[]>([])
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [form] = useForm()

  const columns = useMemo(() => {
    const tableColumns: ColumnProps<RefundReasonOutputDto>[] = [
      { title: '售后原因', dataIndex: 'name' },
      {
        title: '适用场景',
        dataIndex: 'type',
        render(_, { type = '' }) {
          return type
            .split(',')
            .map((item) => MRefundScene[item])
            .join(',')
        }
      },
      { title: '排序值', dataIndex: 'sort' }
    ]
    if (!disabled) {
      tableColumns.push({
        title: '操作',
        dataIndex: '_operation',
        render: (value, record) => (
          <Space>
            <Button
              type="link"
              size="small"
              onClick={() => {
                const type = record.type?.split(',')
                setVisible(true)
                form.setFieldsValue({ ...record, type })
              }}
            >
              编辑
            </Button>
            <Button type="link" size="small" onClick={() => handleDelete(record)}>
              删除
            </Button>
          </Space>
        )
      })
    }
    return tableColumns
  }, [dataSource, disabled, form])

  async function loadList() {
    setLoading(true)
    const { data } = await api['/admin/mall/refundReason/queryAll_GET']()
    setDataSource(data || [])
    setLoading(false)
  }

  function handleDelete(rawData: RefundReasonOutputDto) {
    Modal.confirm({
      title: '确认删除本条记录',
      content: `是否要删除售后原因：${rawData.name}，删除后不可恢复`,
      onOk: async () => {
        await api['/admin/mall/refundReason/delete/{id}_DELETE'](rawData.id! as any)
        loadList()
      }
    })
  }

  useEffect(() => {
    loadList()
  }, [])

  return (
    <Card
      title="售后原因设置"
      style={{ width: '100%' }}
      extra={
        !disabled && (
          <Button
            type="primary"
            onClick={() => {
              form.resetFields()
              setVisible(true)
            }}
          >
            添加售后原因
          </Button>
        )
      }
    >
      <Table columns={columns} loading={loading} dataSource={dataSource} rowKey="id" pagination={false} scroll={{ y: 300 }} />

      <ModalForm<RefundReasonOutputDto>
        visible={visible}
        title="售后原因配置"
        form={form}
        onVisibleChange={setVisible}
        onFinish={async (formData) => {
          try {
            let { id, type, ...rest } = formData
            if (Array.isArray(type)) {
              type = type.join(',')
            }

            if (id) {
              await api['/admin/mall/refundReason/update_PUT']({ ...rest, type, id })
              message.success('修改成功')
            } else {
              await api['/admin/mall/refundReason/add_POST']({ ...rest, type })
              message.success('创建成功')
            }

            loadList()
            return true
          } catch (error) {}
          return false
        }}
      >
        <ProFormText name="id" hidden />

        <ProFormLimitInput label="售后原因" name="name" rules={[{ required: true }]} maxLength={48} />

        <ProFormCheckbox.Group label="适用场景" name="type" rules={[{ required: true }]} options={ORefundScene} />

        <ProFormDigit label="排序值" name="sort" rules={[{ required: true }]} fieldProps={{ min: 0, max: 99999, precision: 0 }} />
      </ModalForm>
    </Card>
  )
}

Component.displayName = 'RefundReasonsSetting'

const RefundReasonsSetting = memo(Component)

export default RefundReasonsSetting
