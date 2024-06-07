import { FC, memo, useState } from 'react'
import styles from './index.module.less'
import { ELivePageType, ILiveProps, MLivePageType, OLivePageType } from './const'
import ProTable, { ProColumns } from '@ant-design/pro-table'
import { Button, message } from 'antd'
import OperationsColumns from '@wmeimob/backend-pro/src/components/table/operationsColumns'
import useProTableRequest from '@wmeimob/backend-pro/src/hooks/useProTableRequest'
import { api, LivePage, LivePageInsert } from '~/request'
import useProTableForm from '@wmeimob/backend-pro/src/hooks/useProTableForm'
import { ModalForm, ProFormList, ProFormRadio, ProFormText } from '@ant-design/pro-form'
import mmFormRule, { concatRule } from '@wmeimob/form-rules'
import { useSuperLock } from '@wmeimob/utils/src/hooks/useSuperLock'

const Component: FC<ILiveProps> = (props) => {
  // 默认详情
  const [type, setType] = useState(true)
  const editModal = useProTableForm<LivePage>({
    modalProps: {
      modalProps: {
        afterClose() {
          setType(true)
        }
      }
    }
  })
  const [columns] = useState<ProColumns<LivePage>[]>([
    { title: '页面ID', dataIndex: 'id', hideInSearch: true },
    { title: '页面名称', dataIndex: 'name' },
    { title: '页面类型', dataIndex: 'type', hideInSearch: true, valueType: 'radio', valueEnum: MLivePageType },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 150,
      fixed: 'right',
      render: (_, record) => {
        return (
          <OperationsColumns
            operations={[
              {
                id: 'edit',
                text: (
                  <a
                    onClick={() => {
                      editModal.modalProps.form.setFieldsValue({
                        ...record,
                        liveIds: record.liveIds.map(item => ({ value: item }))
                      })
                      setType(record.type === ELivePageType.List)
                      editModal.setEditData({ ...record, liveIds: record.liveIds.map(item => ({ value: item })) })
                      editModal.setVisible(true)
                    }}
                  >
                    编辑
                  </a>
                )
              },
              {
                id: 'del',
                onClick: async () => {
                  try {
                    await api['/admin/livePage/{id}_DELETE'](record.id!)
                    actionRef.current?.reload()
                  } catch (error) {
                  }
                }
              }
            ]}
          />
        )
      }
    }
  ])

  const { request, actionRef } = useProTableRequest((params) =>
    api['/admin/livePage_GET']({
      ...params
    })
  )

  const handleChangeType = (event) => {
    setType(event.target.value === ELivePageType.List)
    editModal.modalProps.form?.resetFields(['liveIds'])
  }

  const [handleFormFinish] = useSuperLock(async (values: LivePageInsert) => {
    try {
      const isAdd = !editModal.editData?.id
      const params = {
        ...values,
        liveIds: values.liveIds?.map(item => item?.value.trim())
      }
      console.log(params)
      if (isAdd) {
        await api['/admin/livePage_POST'](params)
        message.success('新增成功')
      } else {
        await api['/admin/livePage/{id}_PUT'](editModal.editData!.id!, params)
        message.success('修改成功')
      }

      editModal.setVisible(false)
      editModal.setEditData(undefined)
      actionRef.current?.reload()

      return true
    } catch (error) {
    }

    return false
  })

  return (
    <div className={styles.deptManagementStyle}>
      <ProTable
        actionRef={actionRef}
        rowKey='id'
        columns={columns}
        request={request}
        scroll={{ x: 1000 }}
        search={{
          defaultCollapsed: false,
          labelWidth: 'auto',
          optionRender: (searchConfig, formProps, dom) => [
            ...dom,
            <Button
              type='primary'
              key='add'
              onClick={() => {
                editModal.modalProps.form.resetFields()
                editModal.setEditData({})
                editModal.setVisible(true)
              }}
            >
              新增页面
            </Button>
          ]
        }}
      />

      <ModalForm
        {...(editModal.modalProps as any)}
        width={600}
        title={editModal.editData?.id ? '编辑' : '新增'}
        layout='horizontal'
        labelCol={{ span: 6 }}
        onFinish={handleFormFinish}
        on
      >
        <ProFormText width='md' label='页面名称' placeholder='请输入页面名称' name='name' fieldProps={{ maxLength: 50 }}
                     rules={mmFormRule.required} />
        <ProFormRadio.Group label='页面类型' name='type' options={OLivePageType} fieldProps={{ onChange: handleChangeType }}
                            rules={mmFormRule.required} initialValue={ELivePageType.List} />
        <ProFormList
          label='直播间ID'
          name='liveIds'
          initialValue={[{ value: '' }]}
          copyIconProps={false}
          creatorButtonProps={type ? {
            creatorButtonText: '添加直播间',
            icon: false,
            type: 'default',
            style: { width: 'unset' }
          } : false}
          min={1}
          max={type ? 20 : 1}
        >
          <ProFormText label="ID" placeholder='请输入直播间ID' fieldProps={{ maxLength: 50 }} width='md' name={['value']}
                       rules={concatRule(['required','trim'])} />
        </ProFormList>
      </ModalForm>
    </div>
  )
}

Component.displayName = 'LivePageList'

const LivePageList = memo(Component)
export default LivePageList
