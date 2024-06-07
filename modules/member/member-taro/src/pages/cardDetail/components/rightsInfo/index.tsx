import { View, Image } from '@tarojs/components'
import { FC, memo } from 'react'
import styles from './index.module.less'
import icon_right from '../../images/icon_right.png'
import { MemCardRightsDto } from '@wmeimob/taro-api'
import { MMemberRangeType } from '@wmeimob-modules/member-data/src/enums/EMemberRangeType'
import { mmTimes } from '@wmeimob/utils/src/mmCurrency'

interface IRightsInfoProps {
  data?: MemCardRightsDto[]
}

const Component: FC<IRightsInfoProps> = (props) => {
  const { data = [] } = props

  const { discount = 0, rangeType } = data[0] || {}

  return (
    <View className={styles.rightsInfoStyle}>
      <Image src={icon_right} style={{ width: 40, height: 40 }} />

      <View className={styles.text}>
        {MMemberRangeType[rangeType!]} {mmTimes(discount, 10, { precision: 3 })}折
      </View>
    </View>
  )
}

const RightsInfo = memo(Component)
export default RightsInfo
