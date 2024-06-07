import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import MMNavigation from '@wmeimob/taro-design/src/components/navigation'
import { FC, useRef, useState } from 'react'
import bg from './bg.jpg'
import MMPoster, { IMMPosterRef } from '~/components/poster'
import MMButton from '@wmeimob/taro-design/src/components/button'

const posterStyle = { width: 315, height: 476 }

const Component: FC<any> = () => {
  const { poster, draw } = useService()
  return (
    <View>
      <MMNavigation title="分享海报" />

      <MMButton onClick={() => draw()}>生成背景海报</MMButton>

      <MMPoster
        ref={poster}
        canvasStyle={posterStyle}
        canvasSetting={{
          // backgroundColor: 'white',
          backgroundImage: bg,
          borderRadius: 8
        }}
      />
    </View>
  )
}

export default Component

function useService() {
  const [src, setSrc] = useState('')
  const poster = useRef<IMMPosterRef>(null)

  async function draw() {
    Taro.showLoading({ title: '加载中', mask: true })

    await poster.current!.draw([
      {
        type: 'text',
        value: '顶诺澳大利亚原产安格斯雪花 家庭组',
        style: {
          left: 15,
          top: 330,
          width: 181,
          fontSize: 14,
          color: '#333333',
          lineHeight: 20,
          fontWeight: 'bold'
        }
      },
      {
        type: 'text',
        value: `¥298.00`,
        style: {
          right: 15,
          top: 325,
          fontSize: 24,
          color: '#FF413B',
          lineHeight: 28,
          fontWeight: 'bold'
        }
      },
      {
        type: 'text',
        value: `¥1000`,
        style: {
          right: 22,
          top: 358,
          fontSize: 12,
          color: '#999999',
          lineHeight: 28
        }
      },
      {
        type: 'text',
        value: '1.保存图片到相册',
        style: {
          left: 90,
          top: 412,
          fontSize: 11,
          color: '#999999',
          lineHeight: 20
        }
      },
      {
        type: 'text',
        value: '2.打开微信识别二维码',
        style: {
          left: 90,
          top: 435,
          fontSize: 11,
          color: '#999999',
          lineHeight: 20
        }
      }
    ])
    const img = await poster.current!.getImageSrc()
    poster.current!.show()
    setSrc(img)
    Taro.hideLoading()
  }

  return {
    src,
    draw,
    poster
  }
}
