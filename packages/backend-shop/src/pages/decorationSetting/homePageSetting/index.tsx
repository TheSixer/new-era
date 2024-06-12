import React from 'react';
import { Card, Tabs } from 'antd';
import { PageContainer } from '@ant-design/pro-layout'
import styles from './index.module.less';
import EarnPoints from './components/earnPoints';
import Banners from './components/banners';
import Permium from './components/permium';
import KeyStory from './components/keyStory';
import AboutUs from './components/aboutUs';

const items = [
  {
    key: 'BANNER',
    label: 'Banner',
    children: <Banners />
  },
  {
    key: 'MAIN_STORY',
    label: '主推故事',
    children: <KeyStory />
  },
  {
    key: 'PLAY_WITH_POINTS',
    label: '玩转积分',
    children: <EarnPoints />
  },
  {
    key: 'GOODS',
    label: '尖货',
    children: <Permium />
  },
  {
    key: 'BRAND_STORY',
    label: '品牌故事',
    children: <AboutUs />
  }
];

const App: React.FC = () => (
    <PageContainer className={styles.employeeManagementStyle}>
      <Card>
        <Tabs>
            {items.map((item) => (
                <Tabs.TabPane tab={item.label} key={item.key}>
                    {item.children}
                </Tabs.TabPane>
            ))}
        </Tabs>
      </Card>
    </PageContainer>
);

export default App;