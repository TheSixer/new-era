import { Space } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import React from 'react'
import { useModel, history } from 'umi'
import Avatar from './AvatarDropdown'
import styles from './index.less'
import NoticeMenu from '@wmeimob/backend-notice/src/noticeMenu'
import { isDev, systemConfig } from '~/config'
import { routeNames } from '~/routes'
export type SiderTheme = 'light' | 'dark'

const GlobalHeaderRight: React.FC = () => {
  const { initialState } = useModel('@@initialState')

  if (!initialState || !initialState.settings) {
    return null
  }

  const { navTheme, layout } = initialState.settings
  let className = styles.right

  if ((navTheme === 'dark' && layout === 'top') || layout === 'mix') {
    className = `${styles.right}  ${styles.dark}`
  }

  return (
    <Space className={className}>
      {isDev && (
        <span className={styles.action} onClick={() => window.open('https://pro.ant.design/docs/getting-started')}>
          <QuestionCircleOutlined />
        </span>
      )}

      {systemConfig.config.enableNotice && <NoticeMenu onShowAll={() => history.push({ pathname: routeNames.userNotices })} />}

      <Avatar />
    </Space>
  )
}

export default GlobalHeaderRight
