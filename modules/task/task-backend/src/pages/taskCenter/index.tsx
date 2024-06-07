import { PageContainer } from '@ant-design/pro-layout'
import { FC, memo, useState } from 'react'
import { Card, Tabs } from 'antd'
import styles from './index.module.less'
import FixedTaskTable from './components/fixedTaskTable'
import SignTask from './components/signTask'
import { TaskContext } from '../../store'
import { getGlobalData } from '@wmeimob/backend-store'

interface ITaskCenterProps {}

const Component: FC<ITaskCenterProps> = (props) => {
  // const {} = props

  const [items] = useState([
    {
      label: '固定任务',
      key: 'fixedTask',
      children: <FixedTaskTable />
    },
    ...(getGlobalData('systemConfig').config.enableSignTask
      ? [
          {
            label: '签到任务',
            key: 'signTask',
            children: <SignTask />
          }
        ]
      : [])
  ])

  const [contextValue] = useState({ upload: getGlobalData('upload') })

  return (
    <PageContainer className={styles.taskCenterStyle}>
      <TaskContext.Provider value={contextValue}>
        <Card>
          <Tabs>
            {items.map((item) => (
              <Tabs.TabPane key={item.key} tabKey={item.key} tab={item.label}>
                {item.children}
              </Tabs.TabPane>
            ))}
          </Tabs>
        </Card>
      </TaskContext.Provider>
    </PageContainer>
  )
}

const PageTaskCenter = memo(Component)
export default PageTaskCenter
