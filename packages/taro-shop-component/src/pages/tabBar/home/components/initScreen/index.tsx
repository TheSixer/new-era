import { Button, ITouchEvent, View } from '@tarojs/components'
import { FC, memo } from 'react'
import styles from './index.module.less'
import CountdownCircle from './components/countdown'
import { navByLink } from '../../../../../components/pageModules/utils'
import { MMOverlay } from '@wmeimob/taro-design'
import { IPopupScreenProps } from './const'

/**
 * 装修首页
 *
 * 配置化首页小程序渲染代码。与自定义装修后台管理页面配合。开箱即用
 * @param {*} props
 * @return {*}
 */
const Component: FC<IPopupScreenProps> = (props) => {
  const { data, onClose } = props

  function handleJump() {
    if (!data?.urlType) {
      return
    }

    navByLink(Number(data.urlType) as any, data.url!)
    onClose()
  }

  const handleClose = (event: ITouchEvent) => {
    onClose()
    event.stopPropagation()
  }

  return (
    <MMOverlay visible={!!data} onClick={onClose}>
      <View className={styles.container}
        style={{ backgroundImage: `url(${data?.imgUrl})` }}
        onClick={handleJump}
      >

        <View className={styles.container_view}>
          <CountdownCircle size={24} duration={4} strokeWidth={1} onComplete={onClose} />

          <Button className={styles.button} onClick={handleClose}>跳过</Button>
        </View>
      </View>
    </MMOverlay>
  )
}

const Home = memo(Component)
export default Home
