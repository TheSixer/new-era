import { memo, FC } from 'react'
import { View } from '@tarojs/components'
import { ISubmitBarProps } from './const'
import styles from './index.module.less'
import GoodPrice from '../../../../../components/good/goodPrice'
import MMButton from '@wmeimob/taro-design/src/components/button'
import MMCheckbox from '@wmeimob/taro-design/src/components/checkbox'
import { MMButtonType } from '@wmeimob/taro-design/src/components/button/const'

const Component: FC<ISubmitBarProps> = (props) => {
  const { total = 0, totalCounts = 0, handleBuy, checkAll, handleCheckAll } = props

  const displayCount = totalCounts > 99 ? '99+' : totalCounts

  return (
    <View className={styles.submitBarStyle}>
      <MMCheckbox value={checkAll} onChange={handleCheckAll}>
        全选
      </MMCheckbox>

      <View className={styles.submitBarStyle_countText}>合计:</View>
      <View style={{ flex: 1 }}>
        <GoodPrice color="#ED141F" value={total} />
      </View>

      <MMButton type={MMButtonType.h5Red} disabled={!total} radius={21} style={{ width: 90, padding: 0 }} onClick={handleBuy}>
        结算{!!totalCounts && `(${displayCount})`}
      </MMButton>
    </View>
  )
}

const SubmitBar = memo(Component)
export default SubmitBar
