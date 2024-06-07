import { PageContainer } from '@ant-design/pro-layout'
import ProTable, { ProColumns } from '@ant-design/pro-table'
import { api, CommentsHeadImgOutputDto } from '@wmeimob/backend-api'
import MaterialModal from '@wmeimob/backend-pages/src/components/material'
import { MaterialType } from '@wmeimob/backend-pages/src/components/material/const'
import OperationsColumns from '@wmeimob/backend-pro/src/components/table/operationsColumns'
import useProTableRequest from '@wmeimob/backend-pro/src/hooks/useProTableRequest'
import { useSuperLock } from '@wmeimob/utils/src/hooks/useSuperLock'
import { Button } from 'antd'
import { FC, memo, useState } from 'react'

interface IAvatarManagementProps {
  /** 业务 */
  service: ReturnType<typeof useService>
}

const Component: FC<IAvatarManagementProps> = ({ service }) => {
  return (
    <PageContainer>
      <ProTable
        search={false}
        toolbar={{
          actions: [
            <Button type="primary" key="out" onClick={() => service.setVisible(true)}>
              + 上传头像
            </Button>
          ]
        }}
        actionRef={service.actionRef}
        rowKey="id"
        columns={service.columns}
        request={service.request as any}
      />

      <MaterialModal visible={service.visible} max={100} type={MaterialType.Image} onOk={service.handleOk} onCancel={() => service.setVisible(false)} />
    </PageContainer>
  )
}

const AvatarManagement = memo(Component)
export default AvatarManagement

/**
 * 业务
 * @returns
 */
export function useService() {
  const [visible, setVisible] = useState<boolean>(false)
  const [columns] = useState<ProColumns<CommentsHeadImgOutputDto>[]>([
    {
      title: '头像',
      dataIndex: 'headImg',
      hideInSearch: true,
      valueType: 'image'
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 100,
      render: (_, record) => (
        <OperationsColumns
          operations={[
            {
              id: 'del',
              onClick: async () => {
                await api['/admin/mall/comments/headImg/delete/{id}_DELETE'](record.id!)
                actionRef.current?.reload()
              }
            }
          ]}
        />
      )
    }
  ])

  const { request, actionRef } = useProTableRequest((params) => api['/admin/mall/comments/headImg/list_GET'](params))
  const [handleOk, handleLoading] = useSuperLock(async (value: any) => {
    await api['/admin/mall/comments/headImg/batchAdd_POST'](value)
    setVisible(false)
    actionRef.current?.reload()
  })

  return {
    actionRef,
    columns,
    request,
    visible,
    setVisible,
    handleOk,
    handleLoading
  }
}
