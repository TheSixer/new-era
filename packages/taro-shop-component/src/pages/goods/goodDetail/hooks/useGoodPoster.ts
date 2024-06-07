import { IMMPosterRef } from '@wmeimob/taro-poster/src/components/poster'
import { useRef } from 'react'
import { isPrd } from '../../../../config'
import { useToast } from '@wmeimob/taro-design'
import { api } from '@wmeimob/taro-api'
import { GoodsVO } from '@wmeimob/taro-api'
import { routeNames } from '../../../../routes'

/**
 * 海报生成业务逻辑
 * @param data
 * @returns
 */
export default function useGoodPoster(data: GoodsVO) {
  const posterRef = useRef<IMMPosterRef>(null)

  const [toast] = useToast()

  async function getDrawImageSrc() {
    // 获取小程序二维码
    let { data: qrcode = '' } = await api['/wechat/api/qrCode/getUnlimited_POST']({
      page: routeNames.goodsGoodDetail.slice(1),
      scene: `${data.goodsNo}`,
      version: isPrd ? 'release' : 'trial'
    })

    if (qrcode) {
      qrcode = /^data:image/.test(qrcode) ? qrcode : `data:image/png;base64,${qrcode}`
    }

    const [int = '', dot] = `${data.salePrice}`.split('.')

    // 绘制海报
    await posterRef.current!.draw([
      {
        type: 'image',
        value: data.coverImg!,
        style: { left: 0, top: 0, width: 335, height: 335 }
      },
      {
        type: 'text',
        value: data.goodsName!,
        style: { left: 20, top: 355, width: 195, fontSize: 15, color: '#333333', lineHeight: 20, fontWeight: 'bold' }
      },
      {
        type: 'list',
        value: [
          {
            type: 'text',
            value: `¥`,
            style: { left: 0, top: 8, fontSize: 14, fontWeight: 'bold', color: '#FF413B' }
          },
          {
            type: 'text',
            value: `${int}`,
            style: { left: 2, top: 0, fontSize: 24, fontWeight: 'bold', color: '#FF413B' }
          },
          {
            type: 'text',
            value: `.${dot || '00'}`,
            style: { left: 0, top: 9, fontSize: 14, fontWeight: 'bold', color: '#FF413B' }
          }
        ],
        style: { left: 244, top: 360, fontSize: 24, color: '#FF413B', fontWeight: 'bold' }
      },
      // {
      //   type: 'text',
      //   value: `¥${data.salePrice}`,
      //   style: { right: 15, top: 365, fontSize: 24, color: '#F01520', lineHeight: 28, fontWeight: 'bold' }
      // },
      // {
      //   type: 'text',
      //   value: `¥${data.marketPrice}`,
      //   style: { right: 22, top: 378, fontSize: 12, color: '#999999', lineHeight: 28 }
      // },
      {
        type: 'text',
        value: '1.保存图片到相册',
        style: { left: 116, top: 335 + 89, fontSize: 12, color: '#999999', lineHeight: 20 }
      },
      {
        type: 'text',
        value: '2.打开微信识别二维码',
        style: { left: 116, top: 335 + 111, fontSize: 12, color: '#999999', lineHeight: 20 }
      },
      {
        type: 'image',
        value: qrcode,
        style: { left: 20, top: 335 + 68, width: 80, height: 80 }
      }
    ])
    const url = await posterRef.current!.getImageSrc()
    return url
  }

  async function draw() {
    toast?.loading('海报生成中...')
    try {
      await getDrawImageSrc()
      posterRef.current!.show()
    } catch (error) {
      toast?.hideLoading()
    }
    toast?.hideLoading()
  }

  return {
    getDrawImageSrc,
    /** ref */
    posterRef,
    /** 绘制方法 */
    draw,
    /** 画布宽高 */
    posterStyle: { width: 335, height: 495 }
  }
}
