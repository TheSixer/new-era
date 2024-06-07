import { FC, memo, useState } from 'react'
import styles from './index.module.less'
import { EPageEditType, IDecorationListProps, IMallConf } from './const'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable, { ProColumns } from '@ant-design/pro-table'
import { Button, message } from 'antd'
import { api } from '~/request'
import { history } from 'umi'
import { routeNames } from '~/routes'
import useUpdateDecorationModalForm from '../components/updateDecorationModalForm/useUpdateDecorationModalForm'
import UpdateDecorationModalForm from '../components/updateDecorationModalForm'
import OperationsColumns from '@wmeimob/backend-pro/src/components/table/operationsColumns'
import useProTableRequest from '@wmeimob/backend-pro/src/hooks/useProTableRequest'
import StatusSwitchColumn from '@wmeimob/backend-pro/src/components/table/statusSwitchColumn'
import PreviewPopover from '~/components/pageComponent/previewPopover'
import { ESystemPageHidden } from '~/components/jumpType/enums/ESystemPage'

const isHomePage = (home?: number) => home === 1

const Component: FC<IDecorationListProps> = (props) => {
  const [editType, setEditType] = useState(EPageEditType.Add)
  const [columns] = useState<ProColumns<IMallConf>[]>([
    { title: 'ID', dataIndex: 'id', width: 60, hideInSearch: true },
    { title: '页面名称', dataIndex: 'name' },
    { title: '页面标题', dataIndex: 'title', hideInSearch: true },
    {
      title: '设为首页',
      dataIndex: 'title',
      hideInSearch: true,
      width: 100,
      render: (_, record) => {
        const { homePage } = record
        const checked = isHomePage(homePage)
        return (
          <StatusSwitchColumn
            checked={checked}
            disabled={checked}
            onSwitch={async () => {
              try {
                await api['/admin/mall/page/update_PUT']({ ...record, homePage: checked ? 0 : 1 })
                actionRef.current?.reload()
                message.success('设置成功')
              } catch (error) {}
            }}
          />
        )
      }
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 280,
      render: (_, record) => {
        const { id } = record
        return (
          <OperationsColumns
            operations={[
              { id: 'preview', text: <PreviewPopover scene={`${id}`} page={ESystemPageHidden.Decoration} /> },
              {
                id: 'copy', // 复制
                text: (
                  <a
                    onClick={async () => {
                      const { data = {} } = await api['/admin/mall/page/detail_GET']({ id: record.id as any })
                      const { id, homePage, name, ...rest } = data
                      const copyData = { ...rest, name: '' }
                      modalProps.form.setFieldsValue(copyData)
                      setEditType(EPageEditType.Copy)
                      setEditData(copyData)
                      setVisible(true)
                    }}
                  >
                    复制
                  </a>
                )
              },
              {
                id: 'edit1', // 页面设置
                text: (
                  <a
                    onClick={() => {
                      modalProps.form.setFieldsValue(record)
                      setEditData(record)
                      setEditType(EPageEditType.Edit)
                      setVisible(true)
                    }}
                  >
                    编辑
                  </a>
                )
              },
              {
                id: 'pageSetting', // 页面设置
                text: <a onClick={() => history.push({ pathname: routeNames.decorationSettingDecorationListDetail, query: { id: id as any } })}>页面设置</a>
              },
              {
                id: 'del',
                show: !record.isHomePage,
                onClick: async () => {
                  await api['/admin/mall/page/delete_DELETE']({ id: record.id as any })
                  actionRef.current?.reload()
                }
              }
            ]}
          />
        )
      }
    }
  ])

  const { request, actionRef } = useProTableRequest<IMallConf>(
    (params) => {
      const { name, ...rest } = params
      if (name) {
        rest.condition = name
      }
      return api['/admin/mall/page/query_GET'](rest) as any
    },
    {
      dataFormat: (data) => data.map((item) => ({ ...item, isHomePage: isHomePage(item.homePage) }))
    }
  )

  const { modalProps, editData, setEditData, setVisible } = useUpdateDecorationModalForm<IMallConf>({
    onFinish: async (data) => {
      let saveData = { ...editData, ...data }
      try {
        if (editType === EPageEditType.Edit) {
          await api['/admin/mall/page/update_PUT'](saveData)
          actionRef.current?.reload()
        } else {
          const res = await api['/admin/mall/page/add_POST'](saveData)
          history.push({ pathname: routeNames.decorationSettingDecorationListDetail, query: { id: res.data as any } })
        }

        message.success('操作成功')
        setVisible(false)
      } catch (error) {
        message.error('操作失败')
      }
    }
  })

  return (
    <PageContainer className={styles.decorationListStyle}>
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
              key="out"
              onClick={() => {
                modalProps.form.resetFields()
                setEditType(EPageEditType.Add)
                setVisible(true)
              }}
            >
              新增页面
            </Button>
          ]
        }}
      />

      <UpdateDecorationModalForm
        {...modalProps}
        title={
          {
            [EPageEditType.Add]: '新增页面',
            [EPageEditType.Copy]: '复制页面',
            [EPageEditType.Edit]: '编辑页面'
          }[editType]
        }
      />
    </PageContainer>
  )
}

Component.displayName = 'DecorationList'

const DecorationList = memo(Component)
export default DecorationList
