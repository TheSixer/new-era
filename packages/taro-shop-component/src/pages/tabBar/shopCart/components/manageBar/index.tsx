import { FC, memo } from 'react'
import { View } from '@tarojs/components'
import styles from './index.module.less'
import { IManageBarProps } from './const'
import MMButton from '@wmeimob/taro-design/src/components/button'
import MMCheckbox from '@wmeimob/taro-design/src/components/checkbox'
import { MMButtonType } from '@wmeimob/taro-design/src/components/button/const'

/**
 * 管理栏
 * @param props
 * @returns
 */
const Component: FC<IManageBarProps> = (props) => {
  const { disabled = false, checkAll, handleCheckAll, onAddCollection, onDel } = props

  return (
    <View className={styles.manageBarStyle}>
      <View style={{ flex: '1', height: 21 }}>
        <MMCheckbox value={checkAll} onChange={handleCheckAll}>
          全选
        </MMCheckbox>
      </View>

      <MMButton color="#FF413B" disabled={disabled} ghost style={{ width: 120, marginRight: 15 }} onClick={onAddCollection}>
        移入收藏夹
      </MMButton>

      <MMButton type={MMButtonType.h5Red} disabled={disabled} style={{ width: 88 }} onClick={onDel}>
        删除
      </MMButton>
    </View>
  )
}

const ManageBar = memo(Component)
export default ManageBar
