import { ModalForm, ProFormDatePicker, ProFormDigit, ProFormField, ProFormText } from '@ant-design/pro-form'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable, { ProColumns } from '@ant-design/pro-table'
import { assembleResizeUrl } from '@wmeimob/aliyun'
import mmFormRule from '@wmeimob/form-rules'
import { Button, message } from 'antd'
import dayjs from 'dayjs'
import { FC, memo, useState } from 'react'
import { EJumpType } from '@wmeimob/backend-pro/src/components/jumpType/enums/EJumpType'
import JumpTypeValue from '@wmeimob/backend-pro/src/components/jumpType/jumpTypeValue'
import OperationsColumns from '@wmeimob/backend-pro/src/components/table/operationsColumns'
import StatusSwitchColumn from '@wmeimob/backend-pro/src/components/table/statusSwitchColumn'
import ProFormJumpType from '@wmeimob/backend-pro/src/components/form/proFormJumpType'
import useProTableForm from '@wmeimob/backend-pro/src/hooks/useProTableForm'
import useProTableRequest from '@wmeimob/backend-pro/src/hooks/useProTableRequest'
import { IEditFormValues, IListProps,MJumpType } from './const'
import styles from './index.module.less'
import { PopupAdsDto } from '@wmeimob/backend-api/src/request/data-contracts'
import { api } from '@wmeimob/backend-api'
import MaterialSelect from '../../../../components/material/components/materialSelect'
import { MaterialType } from '../../../../components/material/const'
import { useSuperLock } from '@wmeimob/utils/src/hooks/useSuperLock'

const Component: FC<IListProps> = (props) => {
  const { request, actionRef } = useProTableRequest((params) =>
    api['/admin/popupAds_GET']({
      ...params,
      expirationTime: params.expirationTime ? dayjs(params.expirationTime).format('YYYY-MM-DD 23:59:59') : undefined
    })
  )

  const editModal = useProTableForm<PopupAdsDto>()

  const [columns] = useState<ProColumns<PopupAdsDto>[]>([
    { title: '弹窗标题', dataIndex: 'title' },
    { title: '弹窗图片', dataIndex: 'imgUrl', valueType: 'image', hideInSearch: true, renderText: (imgUrl) => assembleResizeUrl(imgUrl, { width: 200 }) },
    {
      title: '跳转类型',
      dataIndex: 'urlType',
      width: 90,
      hideInSearch: true,
      render: (_, record) => {
        try {
          return record.url ? MJumpType[JSON.parse(record.url)?.type] : ''
        } catch (error) {}
        return ''
      }
    },
    {
      title: '跳转内容',
      dataIndex: 'url',
      width: 90,
      hideInSearch: true,
      render: (_, record) => {
        try {
          return record.url ? <JumpTypeValue jumpValue={JSON.parse(record.url)} /> : ''
        } catch (error) {}
        return ''
      }
    },
    { title: '优先级', dataIndex: 'sort', hideInSearch: true },
    { title: '到期时间', dataIndex: 'expirationTime', valueType: 'date' },
    { title: '每日展示次数', dataIndex: 'dailyShowNumber', hideInSearch: true },
    {
      title: '显示状态',
      dataIndex: 'show',
      width: 100,
      hideInSearch: true,
      render: (__, record) => {
        const isExpiration = dayjs(record.expirationTime).isBefore(dayjs())
        return (
          !isExpiration && (
            <StatusSwitchColumn
              checked={record.show}
              checkedChildren="显示"
              unCheckedChildren="隐藏"
              onSwitch={async (status) => {
                try {
                  await api['/admin/popupAds/{id}/show_PUT'](record.id!, { show: status })
                  actionRef.current?.reload()
                  message.success('切换成功')
                } catch (error) {}
              }}
            />
          )
        )
      }
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 200,
      render: (_, record) => {
        return (
          <OperationsColumns
            operations={[
              {
                id: 'del',
                onClick: async () => {
                  try {
                    await api['/admin/popupAds/{id}_DELETE'](record.id!)
                    actionRef.current?.reload()
                  } catch (error) {}
                }
              },

              {
                id: 'edit',
                text: (
                  <a
                    onClick={() => {
                      editModal.modalProps.form.setFieldsValue({
                        ...record,
                        expirationTime: dayjs(record.expirationTime).format('YYYY-MM-DD'),
                        url: record.url ? JSON.parse(record.url) : { type: EJumpType.None, content: {} }
                      })
                      editModal.setEditData(record)
                      editModal.setVisible(true)
                    }}
                  >
                    编辑
                  </a>
                )
              }
            ]}
          />
        )
      }
    }
  ])

  const [handleFormFinish] = useSuperLock(async (values: IEditFormValues) => {
    try {
      const isAdd = !editModal.editData?.id
      const params = {
        ...values,
        show: editModal.editData?.show ?? false,
        url: JSON.stringify(values.url),
        expirationTime: `${values.expirationTime} 23:59:59`
      }

      if (isAdd) {
        await api['/admin/popupAds_POST'](params)
        message.success('新增成功')
      } else {
        await api['/admin/popupAds/{id}_PUT'](editModal.editData!.id!, params)
        message.success('修改成功')
      }

      editModal.setVisible(false)
      editModal.setEditData(undefined)
      actionRef.current?.reload()

      return true
    } catch (error) {}

    return false
  })

  return (
    <PageContainer className={styles.deptManagementStyle}>
      <ProTable
        actionRef={actionRef}
        rowKey="id"
        columns={columns}
        request={request}
        search={{
          defaultCollapsed: false,
          labelWidth: 'auto',
          optionRender: (searchConfig, formProps, dom) => [
            ...dom,
            <Button
              type="primary"
              key="add"
              onClick={() => {
                editModal.modalProps.form.resetFields()
                editModal.setEditData({})
                editModal.setVisible(true)
              }}
            >
              新增弹窗
            </Button>
          ]
        }}
      />

      <ModalForm
        {...(editModal.modalProps as any)}
        width={600}
        title={editModal.editData?.id?'编辑':'新增'}
        layout="horizontal"
        labelCol={{ span: 6 }}
        initialValues={{ url: { type: EJumpType.None, content: {} } }}
        onFinish={handleFormFinish}
      >
        <ProFormText width="md" label="弹窗标题" placeholder="请输入弹窗标题" name="title" fieldProps={{ maxLength: 35 }} rules={mmFormRule.required} />

        <ProFormJumpType width="md" label="跳转内容" name="url" />

        <ProFormDigit
          width="md"
          label="优先级"
          placeholder="请选择优先级"
          name="sort"
          fieldProps={{ precision: 0, min: 1, max: 9999 }}
          rules={mmFormRule.required}
          extra="数值越大越优先弹出"
        />

        <ProFormDatePicker
          width="md"
          label="到期时间"
          placeholder="请选择到期时间"
          name="expirationTime"
          rules={mmFormRule.required}
          fieldProps={{
            disabledDate: (current) => current && current < dayjs().subtract(1, 'day').endOf('day')
          }}
        />

        <ProFormDigit
          width="md"
          label="每日展示次数"
          placeholder="请输入每日展示次数"
          name="dailyShowNumber"
          fieldProps={{ precision: 0, min: 1, max: 9999 }}
          rules={mmFormRule.required}
        />

        <ProFormField label="弹窗图片" name="imgUrl" rules={mmFormRule.required}>
          <MaterialSelect multiple={false} type={MaterialType.Image} maxLength={1} repeatTip />
        </ProFormField>
      </ModalForm>
    </PageContainer>
  )
}

Component.displayName = 'MMPopupAdsListPage'

const MMPopupAdsListPage = memo(Component)
export default MMPopupAdsListPage
