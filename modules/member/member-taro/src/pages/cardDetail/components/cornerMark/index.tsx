import { View } from '@tarojs/components'
import { EMemberLevel } from '@wmeimob-modules/member-data/src/enums/EMemberLevel'
import { FC, memo } from 'react'
import styles from './index.module.less'

interface ICornerMarkProps {
  active: EMemberLevel
  isFull: boolean
}

const Component: FC<ICornerMarkProps> = (props) => {
  const { active,isFull=false } = props

  return active === EMemberLevel.Unlocked ? null : <View className={`${styles.cornerMarkStyle} ${active !== EMemberLevel.Current && styles.black}`}>{isFull?'已达到此等级':active === EMemberLevel.Current ? '当前等级' : '未解锁'}</View>
}

const CornerMark = memo(Component)
export default CornerMark
