import { FC, memo } from 'react'
import { PageContainer } from '@wmeimob/taro-design'
import MMNavigation from '@wmeimob/taro-design/src/components/navigation'
import { Image, View } from '@tarojs/components'
import styles from './index.module.less'
import empty from './empty.png'

const Component: FC = () => {
  return <PageContainer style={{height: "100%"}} noPlace>
    <MMNavigation title='' shadow={false}/>
    <View className={styles.empty}>
      <View style={{marginTop: 110}}>
        <Image className={styles.img} src={empty}/>
        <View className={styles.con}>403</View>
        <View className={styles.text}>抱歉你无权访问该页面~</View>
      </View>
    </View>
  </PageContainer>
}

const Auth = memo(Component)
export default Auth
