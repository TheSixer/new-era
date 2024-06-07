import React, { FC, memo } from 'react'
import { Badge, Dropdown, List, message } from 'antd'
import { BellOutlined } from '@ant-design/icons'
import styles from './index.module.less'
import { INoticeMenuProps } from './const'
import { useUnRead } from '../store'
import { api } from '../request'
import { StationMessageOutputDto } from '../request/data-contracts'

const Component: FC<INoticeMenuProps> = (props) => {
  const { footer } = props
  const { notices, unRead, getUnReadList } = useUnRead()

  const hasMessage = !!unRead

  async function handleClear() {
    try {
      props.onClear?.()
      await api['/notification/api/stationMessage/readAll_PUT']()
      await getUnReadList()
    } catch (error) {
      message.error('清空失败')
    }
  }

  async function handleClick(item: StationMessageOutputDto) {
    props.onClick?.(item)
    // 设置为已读
    if (item.id) {
      await api['/notification/api/stationMessage/read/{id}_PUT'](item.id!)
      await getUnReadList()
    }
  }

  const renderItem =
    props.renderItem ||
    ((item) => (
      <List.Item className={styles.noticeMenuStyle_item}>
        <List.Item.Meta avatar={<BellOutlined />} title={<span>{item.title}</span>} description={<span style={{ fontSize: 12 }}>{item.content}</span>} />
      </List.Item>
    ))

  const overlay = (
    <List
      header={hasMessage && <div>您有{unRead}条未读消息</div>}
      footer={
        footer || (
          <div className={styles.noticeMenuStyle_footer}>
            {hasMessage && (
              <span onClick={handleClear} className={styles.noticeMenuStyle_footer_item}>
                全部已读
              </span>
            )}
            <span onClick={props.onShowAll} className={styles.noticeMenuStyle_footer_item}>
              查看全部
            </span>
          </div>
        )
      }
      bordered
      dataSource={notices.slice(0, 5)}
      style={{ background: '#ffffff' }}
      size="small"
      className={styles.noticeMenuStyle}
      renderItem={(item, index) => <div onClick={() => handleClick(item)}>{renderItem(item, index)}</div>}
    />
  )

  return (
    <Dropdown placement="bottomRight" overlay={overlay} overlayStyle={{ width: '336px' }} getPopupContainer={trigger => trigger.parentElement || document.body}>
      <div style={{ height: '48px', cursor: 'pointer' }}>
        <Badge count={unRead} size="small" className={styles.noticeMenuStyle}>
          <BellOutlined />
        </Badge>
      </div>
    </Dropdown>
  )
}

Component.displayName = 'NoticeMenu'

const NoticeMenu = memo(Component)
export default NoticeMenu
