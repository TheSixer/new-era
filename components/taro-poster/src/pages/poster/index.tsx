import { View, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import MMNavigation from '@wmeimob/taro-design/src/components/navigation'
import MMButton from '@wmeimob/taro-design/src/components/button'
import MMPoster, { IMMPosterRef } from '../../components/poster'
import { Component, createRef } from 'react'

export default class Index extends Component {
  poster = createRef<IMMPosterRef>()

  state = {
    width: 375,
    height: 300,
    imageSrc: ''
  }

  // componentDidMount() {
  //   this.draw()
  // }

  draw = async () => {
    await this.poster.current!.draw([
      {
        type: 'text',
        value: '靠左的文字',
        style: {
          left: 5,
          top: 5,
          fontSize: 12,
          color: '#000000'
        }
      },
      {
        type: 'text',
        value: '靠右的文字',
        style: {
          top: 5,
          right: 5,
          fontSize: 12,
          color: '#000000'
        }
      },
      {
        type: 'rect',
        style: {
          left: 0,
          top: 240,
          width: 375,
          height: 20,
          borderRadius: 10,
          backgroundColor: 'red'
        }
      },
      {
        type: 'image',
        value: 'https://wmm-mock.oss-cn-shanghai.aliyuncs.com/mock/banner0.png',
        style: {
          width: 100,
          height: 100,
          left: 15,
          top: 30
        }
      },
      {
        type: 'list',
        value: [
          {
            type: 'text',
            value: '列队1',
            style: {
              left: 10,
              top: 9,
              color: '#999999',
              fontSize: 12
            }
          },
          {
            type: 'rect',
            style: {
              left: 10,
              top: 9,
              width: 60,
              height: 12,
              borderRadius: 6,
              backgroundColor: 'red'
            }
          },
          {
            type: 'image',
            value: 'https://wmm-mock.oss-cn-shanghai.aliyuncs.com/mock/banner0.png',
            style: {
              width: 30,
              height: 30,
              left: 10,
              top: 0
            }
          },
          {
            type: 'text',
            value: '列队2',
            style: {
              left: 10,
              top: 9,
              color: '#999999',
              fontSize: 12
            }
          }
        ],
        style: {
          left: 0,
          top: 160
        }
      }
    ])

    const img = await this.poster.current!.getImageSrc()
    this.poster.current!.show()
    this.setState({ imageSrc: img })
  }

  // onClick() {
  //   const { imageSrc } = this.state
  //   if (process.env.TARO_ENV === 'h5') {
  //     Taro.showToast({ icon: 'none', title: '请长按保存' })
  //   }
  //   if (process.env.TARO_ENV === 'weapp') {
  //     Taro.saveImageToPhotosAlbum({
  //       filePath: imageSrc,
  //       success() {
  //         Taro.showToast({ icon: 'none', title: '已保存至手机相册' })
  //       }
  //     })
  //   }
  // }

  render() {
    const { width, height } = this.state

    return (
      <View>
        <MMNavigation title="canvas 海报" />
        <View style={{ width: '300px', margin: '0 auto' }}>
          <MMButton onClick={this.draw}>保存图片</MMButton>
        </View>

        <MMPoster ref={this.poster} canvasStyle={{ width, height }} canvasSetting={{ backgroundColor: '#ffffff' }} />
      </View>
    )
  }
}
