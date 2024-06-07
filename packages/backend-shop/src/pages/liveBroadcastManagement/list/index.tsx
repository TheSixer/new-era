import { PageContainer } from '@ant-design/pro-layout'
import { PayAmountRateSetting, ScoreGlobalSetting } from '@wmeimob/backend-pages-shop/src/pages/shopSetting/setting'

import { Card, Space, Tabs } from 'antd'
import { FC, memo } from 'react'
import LivePageList from './components/pageManagement'
import MarketingStatistics from './components/marketingStatistics'
import { ETabType, IPageProps, MTabType } from './const'

const Component: FC<IPageProps> = (props) => {
  const disabled = false

  const tabs = [
    // 页面管理
    {
      key: ETabType.Management,
      modules: (
        <>
          <LivePageList />
        </>
      )
    },

    // 营销统计
    {
      key: ETabType.Statistics,
      modules: (
        <>
          <MarketingStatistics />
        </>
      )
    }
  ]

  return (
    <PageContainer>
      <Card>
        <Tabs defaultActiveKey={ETabType.Management} size='large' type='card'>
          {tabs.map((tab) => (
            <Tabs.TabPane tab={MTabType[tab.key]} key={tab.key}>
              <Space direction='vertical' style={{ width: '100%' }}>
                {tab.modules}
              </Space>
            </Tabs.TabPane>
          ))}
        </Tabs>
      </Card>
    </PageContainer>
  )
}

Component.displayName = 'liveBroadcastManagement'

const liveBroadcast = memo(Component)
export default liveBroadcast
