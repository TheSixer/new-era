import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState } from 'react'
import Navigation from '~/components/navigation/index'
import MMButton from '~/components/button'
import styles from './index.module.less'
import MMIconFont from '~/components/icon-font'
import MMIconFontName from '~/components/icon-font/const'

export default function NavigationPage() {
  const [number, setNumber] = useState(0)

  function onClick() {
    setNumber(pre => (pre + 1) % 4)
  }

  return (
    <View>
      {number === 0 && <Navigation title="普通导航普通导航普通导航普通导航普通导航普通导航普通导航普通导航普通导航普通导航普通导航普通导航普通导航普通导航" />}

      {number === 1 && (
        <Navigation
          title="透明的导航"
          type="Transparent"
          renderLeft={
            <View className={styles.back} onClick={() => Taro.navigateBack()}>
              <MMIconFont value={MMIconFontName.Back} style={{ fontSize: 13, fontWeight: 'bold' }} />
            </View>
          }
        />
      )}

      {number === 2 && <Navigation type="Primary" title="主色导航" />}

      {number === 3 && <Navigation title="自定义导航" contentStyle={{ backgroundColor: 'red' }} />}

      <MMButton onClick={onClick} text="导航切换" />
    </View>
  )
}
