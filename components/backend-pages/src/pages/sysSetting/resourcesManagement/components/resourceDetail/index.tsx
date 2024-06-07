import { FC, memo, useEffect, useMemo, useState } from 'react'
import { EDetailType, getTreeInfoById, IResourceDetailProps } from './const'
import { Card, Descriptions, Space, Button, message, Modal, Typography } from 'antd'
import ResourceDetailForm from '../resourceDetailForm'
import { useContainer } from 'unstated-next'
import ResourceManagementContext from '../../context'
import { CopyOutlined } from '@ant-design/icons'
import Clipboard from '@wmeimob/backend-pro/src/components/clipboard'
import UrlList from '../urlList'
import { EResourceType } from '../../const'
import { api } from '@wmeimob/backend-api'
import { ResourceDetailVo, TreeResourceVo } from '@wmeimob/backend-api/src/request/data-contracts'

const Component: FC<IResourceDetailProps> = (props) => {
  const { editData, treeData, setEditData, queryAllData } = useContainer(ResourceManagementContext)

  const [deleteLoading, setDeleteLoading] = useState(false)
  const [detailType, setDetailType] = useState(EDetailType.Init)
  const [resourceInfo, setResourceInfo] = useState<ResourceDetailVo>()
  const isEdit = useMemo(() => [EDetailType.Add, EDetailType.Edit].includes(detailType), [detailType])

  const hasChildren = useMemo(() => editData && editData.children && !!editData.children.length, [editData])

  const parentInfo = useMemo<TreeResourceVo>(() => {
    return editData && editData.parentId ? getTreeInfoById(treeData, editData.parentId).item : {}
  }, [editData, treeData])

  useEffect(() => {
    if (editData) {
      setDetailType(editData.id ? EDetailType.Init : EDetailType.Add)
      if (editData.id) {
        getListInfo(editData.id as any)
      } else {
        setResourceInfo(undefined)
      }
    }
  }, [editData])

  const getListInfo = async (id: string) => {
    const { data = {} } = await api['/admin/api/sysResource/detail/{resource-id}_GET'](id as any)
    setResourceInfo(data)
  }

  // 删除
  const handleDelete = () => {
    Modal.confirm({
      title: '删除',
      content: `确认删除${editData!.title}?`,
      onOk: async () => {
        setDeleteLoading(true)
        try {
          await api[`/admin/api/sysResource/{id}_DELETE`](editData!.id!)
          message.success('删除成功')

          setEditData(undefined)
          queryAllData()
        } catch (error) {}
        setDeleteLoading(false)
      }
    })
  }

  const handleURLChange = async (data: ResourceDetailVo) => {
    await api['/admin/api/sysResource/resourceUpdate/{id}_PUT'](data.id!, data)
    await getListInfo(data.id as any)
  }

  return !editData ? null : (
    <Card size="small">
      {isEdit ? (
        <ResourceDetailForm
          onCancel={() => {
            if (detailType === EDetailType.Add) {
              setEditData(undefined)
            }
            setDetailType(EDetailType.Init)
          }}
        />
      ) : (
        <Descriptions
          title={editData.title}
          bordered
          column={1}
          size="small"
          extra={
            <Space>
              <Button type="primary" onClick={() => setDetailType(EDetailType.Edit)}>
                编辑
              </Button>
              <Button danger ghost disabled={hasChildren} loading={deleteLoading} onClick={handleDelete}>
                删除
              </Button>
            </Space>
          }
        >
          <Descriptions.Item label="父级资源">{parentInfo.title || '/'}</Descriptions.Item>
          <Descriptions.Item label="权限CDOE">
            <Space>
              {editData.code}
              <Clipboard text={editData.code!} onSuccess={() => message.success('code复制成功')}>
                <CopyOutlined />
              </Clipboard>
            </Space>
          </Descriptions.Item>
          <Descriptions.Item label="类型">{EResourceType.Operation === editData.type ? '操作资源' : '菜单资源'}</Descriptions.Item>
          <Descriptions.Item label="排序值">{editData.sortNum}</Descriptions.Item>
        </Descriptions>
      )}

      {editData.id && (
        <>
          <Typography.Title level={5} style={{ marginTop: 16 }}>
            关联URL
          </Typography.Title>
          <UrlList list={resourceInfo?.apis || []} onChange={(apis) => handleURLChange({ ...resourceInfo, apis })} />
        </>
      )}
    </Card>
  )
}

Component.displayName = 'ResourceDetail'

const ResourceDetail = memo(Component)
export default ResourceDetail
