import React, { memo, FC } from 'react'
import styles from './index.module.less'
import { LeftOutlined, SmallDashOutlined } from '@ant-design/icons'
import StateBar, { IStateBarProps } from '../stateBar'

export interface IPhoneHeaderProps extends IStateBarProps {
  /**
   * 手机宽度.默认375
   */
  width?: number | string
  /**
   *  背景色
   * @default #ffffff
   */
  backgroundColor?: string
  /**
   * 标题
   * @default 店铺首页
   */
  title?: string
}

const PhoneHeader: FC<IPhoneHeaderProps> = (props) => {
  const getHeaderStyle = () => {
    const { width, backgroundColor } = props
    return {
      backgroundColor,
      width: typeof width === 'string' ? width : `${width}px`
    }
  }

  return (
    <div className={styles.phoneHeader} style={getHeaderStyle()}>
      {/* 状态栏 */}
      <StateBar time={props.time} operator={props.operator} showNumber={props.showNumber} />
      <div className={styles.title}>
        <div>
          <LeftOutlined />
        </div>
        <div>{props.title}</div>
        <div>
          <SmallDashOutlined style={{ fontWeight: 'bold' }} />
        </div>
      </div>
    </div>
  )
}

PhoneHeader.defaultProps = {
  width: 375,
  backgroundColor: '#ffffff',
  title: '店铺首页'
}

export default memo(PhoneHeader)
