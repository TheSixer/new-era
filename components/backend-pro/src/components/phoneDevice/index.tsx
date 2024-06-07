import classNames from 'classnames'
import React, { PropsWithChildren } from 'react'
import styles from './index.module.less'
import PhoneHeader, { IPhoneHeaderProps } from './phoneHeader'

interface IPhoneDeviceProps extends IPhoneHeaderProps {
  minHeight?: number
  className?: string
}

/**
 * 手机设备样式组件
 *
 * @param {IPhoneDeviceProps} props
 * @returns
 */
const PhoneDevice: React.FC<PropsWithChildren<IPhoneDeviceProps>> = (props) => {
  const { width = 375, children, ...rest } = props
  return (
    <div className={classNames(styles.phoneDevice, props.className)} style={{ width }}>
      <PhoneHeader {...rest} width={width} showNumber />
      <div className={styles.phoneDevice_body}>{children}</div>
    </div>
  )
}

export default PhoneDevice
