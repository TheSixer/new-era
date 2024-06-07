import { FC, memo, useMemo } from 'react'
import styles from './index.module.less'
import { initTreeResource, IResourcesManagementProps } from './const'
import { Row, Col, Tree, Button, Space, message, Alert } from 'antd'
import ResourceDetail from './components/resourceDetail'
import ResourceManagementContext from './context'
import { useContainer } from 'unstated-next'
import { PageContainer } from '@ant-design/pro-layout'
import Clipboard from '@wmeimob/backend-pro/src/components/clipboard'

function ContainerComponent(props: any) {
  return (
    <ResourceManagementContext.Provider>
      <Component />
    </ResourceManagementContext.Provider>
  )
}

const Component: FC<IResourcesManagementProps> = (props) => {
  const { allCodes, treeData, setEditData } = useContainer(ResourceManagementContext)

  const content = useMemo(
    () => (
      <div>
        <Alert type="warning" showIcon message="注意：改动该数据前，请确认连接的数据库是自己项目的，否则数据会被覆盖或丢失" />
        <br />
        <ol>
          <li>1.资源管理用于配置系统资源权限。一般而言只是作为开发人员配置权限使用。在实际部署中不要开放给客户</li>
          <li>
            2.权限分为<strong>菜单权限</strong>、<strong>操作权限</strong>以及<strong>URL资源权限</strong>。开发人员可以根据项目实际需要进行不同粒度的权限配置
          </li>
          <li>
            3.权限设计为树状结构用于方便分组。权限底层只是资源code集合。前后端都是根据权限code来判定是否有相关权限,【关联URL】是url权限控制。用于后端请求权限控制
          </li>
          <li>
            4.
            <Clipboard text={JSON.stringify(allCodes)} onSuccess={() => message.success('复制成功')}>
              <strong>复制code</strong>
            </Clipboard>
            :点击复制所有权限code
          </li>
        </ol>
      </div>
    ),
    [allCodes]
  )

  return (
    <PageContainer content={content} className={styles.resourcesManagementStyle}>
      <Space style={{ marginBottom: 12 }}>
        <Button type="primary" onClick={() => setEditData(initTreeResource())}>
          新增
        </Button>
      </Space>
      <Row gutter={12}>
        <Col span={8}>
          {!!treeData.length && (
            <Tree
              treeData={treeData}
              defaultExpandAll
              className={styles.tree}
              onSelect={(_sk, info) => {
                const { node } = info
                setEditData((node as any).item)
              }}
            />
          )}
        </Col>
        <Col span={16}>
          <ResourceDetail />
        </Col>
      </Row>
    </PageContainer>
  )
}

Component.displayName = 'MMResourcesManagementPage'

const MMResourcesManagementPage = memo(ContainerComponent)
export default MMResourcesManagementPage
