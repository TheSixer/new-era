import { View, Image } from '@tarojs/components'
import { FC, memo } from 'react'
import styles from './index.module.less'
import icon_lock from '../../images/icon_lock.png'

interface ILockMaskProps {}

const Component: FC<ILockMaskProps> = () => {
  return (
    <View className={styles.lockMaskStyle}>
      <Image src={icon_lock} style={{ width: 30, height: 30 }} />
    </View>
  )
}

const LockMask = memo(Component)
export default LockMask
