import Taro from '@tarojs/taro'
import { FC, memo, useState } from 'react'
import { View, Text } from '@tarojs/components'
import { IFilterDrawerProps } from './const'
import styles from './index.module.less'
import MMDrawer from '@wmeimob/taro-design/src/components/drawer'
import CheckButtons from '../checkButtons'
import { ICheckButtonsData } from '../checkButtons/const'
import RangeInput from '@wmeimob/taro-design/src/components/range-input'

const Component: FC<IFilterDrawerProps> = (props) => {
  const { ...rest } = props

  const [serviceValues, setServiceValues] = useState(['顺丰物流'])
  const [serviceOptions] = useState<ICheckButtonsData[]>([
    { label: '顺丰物流', value: '顺丰物流' },
    { label: '包邮', value: '包邮' },
    { label: '直降', value: '直降' },
    { label: '官方自营', value: '官方自营' },
    { label: '限时秒杀', value: '限时秒杀' },
    { label: '新品', value: '新品' }
  ])

  const [categoryValues, setCategory] = useState<string[]>([])
  const [chargeValues, setCharge] = useState<string[]>([])

  const [rangeValue, setRangeValue] = useState<string[]>([])

  return (
    <MMDrawer {...rest}>
      <View className={styles.head}>服务/折扣</View>
      <View style={{ marginBottom: 20 }}>
        <CheckButtons value={serviceValues} options={serviceOptions} onChange={(values) => setServiceValues(values)} />
      </View>

      <View className={styles.head}>价格区间</View>
      <View style={{ marginBottom: 20 }}>
        <RangeInput
          value={rangeValue}
          placeholder={['最低价', '最高价']}
          onChange={(data) => {
            console.log(data)
            setRangeValue(data)
          }}
        />
      </View>

      <View className={styles.head}>分类</View>
      <View style={{ marginBottom: 20 }}>
        <CheckButtons
          value={categoryValues}
          options={['个护健康', '五金工具', '厨房电器'].map((label) => ({ label, value: label }))}
          onChange={(values) => setCategory(values)}
        />
      </View>

      <View className={styles.head}>充电方式</View>
      <View style={{ marginBottom: 20 }}>
        <CheckButtons value={chargeValues} options={['USB', '干电池'].map((label) => ({ label, value: label }))} onChange={(values) => setCharge(values)} />
      </View>
    </MMDrawer>
  )
}

const FilterDrawer = memo(Component)
export default FilterDrawer
