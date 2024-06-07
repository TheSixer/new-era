import { ModalForm, ProFormDigit } from '@ant-design/pro-form'
import ProTable, { ProColumns } from '@ant-design/pro-table'
import { MTaskReward } from '@wmeimob-modules/task-data/src/enums/ETaskReward'
import { MTaskType } from '@wmeimob-modules/task-data/src/enums/ETaskType'
import { api } from '@wmeimob/backend-api'
import ProFormInfo from '@wmeimob/backend-pro/src/components/form/proFormInfo'
import OperationsColumns from '@wmeimob/backend-pro/src/components/table/operationsColumns'
import StatusSwitchColumn from '@wmeimob/backend-pro/src/components/table/statusSwitchColumn'
import useProTableForm from '@wmeimob/backend-pro/src/hooks/useProTableForm'
import useProTableRequest from '@wmeimob/backend-pro/src/hooks/useProTableRequest'
import ProFormMaterial from '@wmeimob/backend-pages/src/components/form/proFormMaterial'
import { Input, message } from 'antd'
import { FC, memo, useState } from 'react'
import styles from './index.module.less'

interface IFixedTaskTableProps {}

const Component: FC<IFixedTaskTableProps> = (props) => {
  const { columns, request, actionRef, modalProps } = useService()

  return (
    <>
      <ProTable actionRef={actionRef} columns={columns} request={request} rowKey="id" className={styles.fixedTaskTableStyle} />

      <ModalForm {...modalProps} title="编辑任务">
        <ProFormInfo label="任务名称" name="id" hidden />

        <ProFormInfo label="任务名称" name="name" />

        <ProFormMaterial label="任务图标" name="imgUrl" />

        <ProFormDigit label="奖励数值" name="rewardPoints" fieldProps={{ min: 0, max: 9999, precision: 0 }} />
      </ModalForm>
    </>
  )
}

const FixedTaskTable = memo(Component)
export default FixedTaskTable

export function useService() {
  const [columns] = useState<ProColumns[]>([
    {
      title: '任务ID',
      dataIndex: 'id',
      width: 80,
      valueType: 'digit',
      fieldProps:{min:0,max: 9999999999, precision: 0},
      proFieldProps: {
        placeholder: '请输入数字'
      }
    },
    { title: '任务图标', dataIndex: 'imgUrl', valueType: 'avatar', hideInSearch: true, width: 80 },
    { title: '任务名称', dataIndex: 'name' },
    { title: '任务类型', dataIndex: 'type', hideInSearch: true, width: 80, valueEnum: MTaskType },
    { title: '奖励内容', dataIndex: 'rewardType', hideInSearch: true, width: 80, valueEnum: MTaskReward },
    { title: '奖励数值', dataIndex: 'rewardPoints', hideInSearch: true, width: 80 },
    {
      title: '任务状态',
      dataIndex: 'enabled',
      valueType: 'select',
      valueEnum: {
        0: '关闭',
        1: '开启'
      },
      width: 80,
      render: (_value, record) => {
        return <StatusSwitchColumn checked={!!record.enabled} onSwitch={(checked) => handleToggleGoodStaus(checked, record.id!)} />
      }
    },
    {
      title: '操作',
      dataIndex: 'ops',
      valueType: 'option',
      width: 80,
      render: (_value, record) => {
        return (
          <OperationsColumns
            operations={[
              {
                id: 'edit',
                onClick: () => {
                  setShowModal({ ...record })
                }
              }
            ]}
          />
        )
      }
    }
  ])

  const { request, actionRef } = useProTableRequest((params) => {
    return api['/admin/mall/userTaskConfig_GET'](params)
  })

  const { modalProps, setShowModal, setVisible } = useProTableForm({
    modalProps: {
      onFinish: async (values: any) => {
        try {
          const { id, imgUrl, rewardPoints } = values
          await api['/admin/mall/userTaskConfig/{id}_PUT'](id, { rewardPoints, imgUrl })
          message.success('修改成功')

          setVisible(false)
          actionRef.current?.reload()
        } catch (error) {
          message.error('出错了')
          return false
        }
        return true
      }
    }
  })

  // 处理切换
  async function handleToggleGoodStaus(status: boolean, id: number) {
    try {
      await api['/admin/mall/userTaskConfig/{id}_PUT'](id, { enabled: !!status })
      actionRef.current?.reload()
      message.success('切换成功')
    } catch (error) {}
  }

  return { columns, request, actionRef, modalProps }
}
