import { useState } from 'react'
import MMNavigation from '@wmeimob/taro-design/src/components/navigation'
import { View } from '@tarojs/components'
import DeliveryTab from '../../components/deliveryTab'

export default () => {
  const [index, setIndex] = useState('delivery')

  return (
    <View style={{ paddingTop: 10 }}>
      <MMNavigation title="配送标签页" />
      <DeliveryTab
        activeKey={index}
        tabs={[
          { label: '外卖配送', value: 'delivery' },
          { label: '到店自取', value: 'selfPikced' }
        ]}
        onTabChange={(item) => setIndex(item.value)}
      >
        {index}
      </DeliveryTab>
    </View>
  )
}
