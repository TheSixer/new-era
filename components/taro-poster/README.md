# `@wmeimob/taro-poster`

海报生成组件

## Usage

```
import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import MMNavigation from '@wmeimob/taro-design/src/components/navigation'
import { FC, useRef, useState } from 'react'
import goodImg from './good.jpg'
import MMPoster, { IMMPosterRef } from '~/components/poster'
import MMButton from '@wmeimob/taro-design/src/components/button'

const posterStyle = { width: 315, height: 476 }

const Component: FC<any> = () => {
  const { src, poster, draw } = useService()
  return (
    <View>
      <MMNavigation title="分享海报" />

      <MMButton onClick={() => draw()}>生成海报</MMButton>
      <View style={{ textAlign: 'center' }}>{src && <Image src={src} style={posterStyle} />}</View>
      <MMPoster canvasStyle={{ width: 315, height: 476 }} ref={poster} />
    </View>
  )
}

export default Component

function useService() {
  const [src, setSrc] = useState('')
  const poster = useRef<IMMPosterRef>(null)

  async function draw() {
    Taro.showLoading({ title: '加载中', mask: true })

    await poster.current!.draw(
      [
        {
          type: 'image',
          value: goodImg,
          style: {
            width: 315,
            height: 315,
            left: 0,
            top: 0
          }
        },
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
            color: '#F01520',
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
      ],
      {
        backgroundColor: 'white',
        borderRadius: 8
      }
    )

    const img = await poster.current!.getImageSrc()
    setSrc(img)
    Taro.hideLoading()
  }

  return {
    src,
    draw,
    poster
  }
}

```
