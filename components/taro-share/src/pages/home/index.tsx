import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { memo, useState } from 'react'
import styles from './index.module.less'
import MMSpace from '@wmeimob/taro-design/src/components/space'
import MMNavigation from '@wmeimob/taro-design/src/components/navigation'
import MMButton from '@wmeimob/taro-design/src/components/button'
import MMCard from '@wmeimob/taro-design/src/components/card'
import MMShare from '~/components/share'
import { IShareOption, IShareProps } from '~/components/share/const'
import heart from './heart.png'

const Component = () => {
  return (
    <View className={styles.homeStyle}>
      <MMNavigation title="基础用法" />

      <Share />
      <View style={{ height: '15px' }} />

      <NoCancelShare />
      <View style={{ height: '15px' }} />

      <ScrollShare />
      <View style={{ height: '15px' }} />
    </View>
  )
}

const Home = memo(Component)
export default Home

function Share() {
  const [options] = useState<IShareOption[]>([
    { key: 'wechat', type: 'wechat', title: '微信分享' },
    { key: 'poster', type: 'poster', title: '生成海报' },
    { key: 'link', type: 'link', title: '生成链接' },
    { key: 'collect', title: '收藏', img: heart }
  ])

  function initShareProps(): Omit<IShareProps, 'options'> {
    return {
      visible: false,
      column: 4
    }
  }

  const [shareProps, setShareProps] = useState(initShareProps)

  const handleClick = (item: IShareOption, index) => {
    Taro.showToast({ icon: 'none', title: `${item.title}` })
    setShareProps((pre) => ({ ...pre, visible: false }))
  }

  return (
    <>
      <MMCard title="默认">
        <MMSpace>
          <MMButton onClick={() => setShareProps((pre) => ({ ...pre, ...initShareProps, visible: true, column: 4 }))}>点击显示</MMButton>

          <MMButton onClick={() => setShareProps((pre) => ({ ...pre, ...initShareProps, visible: true, column: 3 }))}>控制列数</MMButton>
        </MMSpace>
      </MMCard>

      <MMShare
        title="选择分享方式"
        {...shareProps}
        options={options}
        onClose={() => setShareProps((pre) => ({ ...pre, visible: false }))}
        onClick={handleClick}
      />
    </>
  )
}

function NoCancelShare() {
  const [visible, setVisible] = useState(false)
  const [options] = useState<IShareOption[]>([
    { key: 'wechat', type: 'wechat', title: '微信分享' },
    { key: 'poster', type: 'poster', title: '生成海报' },
    { key: 'link', type: 'link', title: '生成链接' },
    { key: 'collect', title: '收藏', img: heart }
  ])

  const handleClick = (item: IShareOption, index) => {
    Taro.showToast({ icon: 'none', title: `${item.title}` })
    setVisible(false)
  }

  return (
    <>
      <MMCard title="不显示取消按钮">
        <MMButton onClick={() => setVisible(true)}>点击显示</MMButton>
      </MMCard>

      <MMShare title="不显示取消" visible={visible} cancel={false} options={options} onClose={() => setVisible(false)} onClick={handleClick} />
    </>
  )
}

function ScrollShare() {
  const [visible, setVisible] = useState(false)
  const [options] = useState<IShareOption[]>([
    { key: 'wechat', type: 'wechat', title: '微信分享' },
    { key: 'poster', type: 'poster', title: '生成海报' },
    { key: 'link', type: 'link', title: '生成链接' },
    { key: 'collect', title: '收藏', img: heart },
    { key: 'wechat1', type: 'wechat', title: '微信分享1' },
    { key: 'poster2', type: 'poster', title: '生成海报1' },
    { key: 'link3', type: 'link', title: '生成链接2' },
    { key: 'collect4', title: '收藏', img: heart }
  ])

  const handleClick = (item: IShareOption, index) => {
    Taro.showToast({ icon: 'none', title: `${item.title}` })
    setVisible(false)
  }

  return (
    <>
      <MMCard title="内容滚动">
        <MMButton onClick={() => setVisible(true)}>点击显示</MMButton>
      </MMCard>

      <MMShare title="不显示取消" visible={visible} scroll options={options} onClose={() => setVisible(false)} onClick={handleClick} />
    </>
  )
}
