import { memo, FC } from 'react'
import { View, Text, Button, Image } from '@tarojs/components'
import { IFootOperationProps } from './const'
import styles from './index.module.less'
import MMCustomerServiceButton from '../customerServiceButton'
import classNames from 'classnames'
import { useGlobalStore } from '@wmeimob/taro-store'

const Component: FC<IFootOperationProps> = (props) => {
  const { text, src, cartCount, onClick, className = '' } = props
  const iconStyle = { width: 24, height: 24 }
  const { isLogin } = useGlobalStore()

  return (
    <View onClick={text === '客服' && isLogin ? undefined : () => (onClick ? onClick() : '')} className={classNames(styles.footOperationStyle, className)}>
      {text === '客服' && isLogin && (
        <MMCustomerServiceButton onClick={() => (onClick ? onClick() : '')} style={{ position: 'absolute', width: '100%', height: '100%', opacity: '0' }} />
      )}
      <Image src={src} style={iconStyle} />
      <View>{text}</View>
      {!!cartCount && <View className={styles.num}>{cartCount}</View>}
    </View>
  )
}

const FootOperation = memo(Component)
export default FootOperation
