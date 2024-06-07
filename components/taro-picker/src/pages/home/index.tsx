import Taro from '@tarojs/taro'
import { FC, memo, useState } from 'react'
import styles from './index.module.less'
import { IHomeProps } from './const'
import MMNavigation from '@wmeimob/taro-design/src/components/navigation'
import { View } from '@tarojs/components'
import MMPicker from '~/components/picker'
import MMButton from '@wmeimob/taro-design/src/components/button'

const Component: FC<IHomeProps> = () => {
  return (
    <View className={styles.homeStyle}>
      <MMNavigation title="基础用法" />
      <CommonPicker />
      <MultiPicker />
    </View>
  )
}

const Home = memo(Component)
export default Home

function CommonPicker() {
  const [visible, setVisible] = useState(false)
  const [value, setValue] = useState<string[]>(['周四'])

  const data = ['周一', '周二', '周三', '周四', '周五'].map((label) => ({ label, value: label }))

  return (
    <>
      <MMButton onClick={() => setVisible(true)}>普通选择</MMButton>
      <View>{value.join(',')}</View>
      <MMPicker
        visible={visible}
        value={value}
        data={data}
        onVisibleChange={setVisible}
        onChange={(va, result) => {
          console.log(va)
          setValue(va)
        }}
      />
    </>
  )
}

function MultiPicker() {
  const [visible, setVisible] = useState(false)
  const [value, setValue] = useState(['福建', '厦门'])

  const data = [
    {
      text: '浙江',
      children: [
        {
          text: '杭州',
          children: [{ text: '西湖区' }, { text: '余杭区' }]
        },
        {
          text: '温州',
          children: [{ text: '鹿城区' }, { text: '瓯海区' }]
        }
      ]
    },
    {
      text: '福建',
      children: [
        {
          text: '福州',
          children: [{ text: '鼓楼区' }, { text: '台江区' }]
        },
        {
          text: '厦门',
          children: [{ text: '思明区' }, { text: '海沧区' }]
        }
      ]
    }
  ]

  return (
    <>
      <MMButton onClick={() => setVisible(true)}>城市级联选择</MMButton>
      <View>{value.join(',')}</View>
      <MMPicker
        visible={visible}
        value={value}
        data={data}
        fieldKey={{ label: 'text', value: 'text' }}
        onVisibleChange={setVisible}
        onChange={(va) => {
          setValue(va)
          console.log(va)
        }}
      />
    </>
  )
}
