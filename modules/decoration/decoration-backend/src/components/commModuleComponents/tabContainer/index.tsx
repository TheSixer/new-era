import { FC, memo, ReactNode } from 'react'
import { Space, Tabs } from 'antd'

interface ITabContainerProps {
  /** 渲染内容设置 */
  renderContent?: ReactNode
  /** 渲染样式设置 */
  renderStyle?: ReactNode
}

const { TabPane } = Tabs

const Component: FC<ITabContainerProps> = (props) => {
  return (
    <div>
      <Tabs defaultActiveKey="1">
        <TabPane tab="内容设置" key="1">
          {props.renderContent}
        </TabPane>
        <TabPane tab="样式设置" key="2">
          <Space direction="vertical" style={{ width: '100%' }}>
            {props.renderStyle}
          </Space>
        </TabPane>
      </Tabs>
    </div>
  )
}

Component.displayName = 'TabContainer'

const TabContainer = memo(Component)
export default TabContainer
