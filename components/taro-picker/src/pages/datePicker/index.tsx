import Taro from '@tarojs/taro'
import { FC, memo, useState } from 'react'
import styles from './index.module.less'
import { IHomeProps } from './const'
import MMNavigation from '@wmeimob/taro-design/src/components/navigation'
import { View } from '@tarojs/components'
import MMDatePicker from '~/components/datePicker'
import MMButton from '@wmeimob/taro-design/src/components/button'
import dayjs from 'dayjs'

const Component: FC<IHomeProps> = () => {
  return (
    <View className={styles.homeStyle}>
      <MMNavigation title="基础用法" />
      {/* <CommonPicker /> */}

      <MinMaxPicker />
    </View>
  )
}

const Home = memo(Component)
export default Home

function CommonPicker() {
  const [visible, setVisible] = useState(false)
  const [value, setValue] = useState(dayjs().subtract(1, 'day').toDate())

  return (
    <>
      <MMButton onClick={() => setVisible(true)}>{dayjs(value).format('YYYY-MM-DD')}</MMButton>
      <MMDatePicker visible={visible} value={value} onChange={(va) => setValue(va)} onVisibleChange={setVisible} />
    </>
  )
}

function MinMaxPicker() {
  const [visible, setVisible] = useState(false)
  const [value, setValue] = useState(dayjs().toDate())

  return (
    <>
      <View>设置最大最小日期</View>
      <MMButton onClick={() => setVisible(true)}>{dayjs(value).format('YYYY-MM-DD')}</MMButton>

      <MMDatePicker
        visible={visible}
        value={value}
        onChange={(va) => setValue(va)}
        onVisibleChange={setVisible}
        maxDate={dayjs().add(1, 'year').toDate()}
        minDate={dayjs().subtract(5, 'year').toDate()}
      />
    </>
  )
}
