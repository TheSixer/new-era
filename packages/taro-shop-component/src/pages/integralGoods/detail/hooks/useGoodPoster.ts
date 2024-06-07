import { IMMPosterRef } from '@wmeimob/taro-poster/src/components/poster'
import { useRef } from 'react'
import { isPrd } from '../../../../config'
import { useToast } from '@wmeimob/taro-design/src/layout/pageContainer'
import { api } from '@wmeimob/taro-api'
import { GoodsVO } from '@wmeimob/taro-api'
import { routeNames } from '../../../../routes'
import { EGoodsType } from '@wmeimob/shop-data/goods/enums/EGoodsType'

const posterStyle = { width: 335, height: 510 }

/**
 * 海报生成业务逻辑
 * @param data
 * @returns
 */
export default function useGoodPoster(data: GoodsVO) {
  const posterRef = useRef<IMMPosterRef>(null)

  const [toast] = useToast()

  function getPriceText() {
    const [int = '', dot] = `${data.salePrice}`.split('.')
    const common = { left: 0, top: 0, fontWeight: 'bold', color: '#FF413B' }
    const isIntegralGoods = data.goodsType === EGoodsType.Integral

    // 纯积分
    const integral = [
      { type: 'text', value: `${data.exchangeIntegral}`, style: { ...common, fontSize: 24 } },
      { type: 'text', value: '积分', style: { ...common, top: 8, fontSize: 14 } }
    ]

    // 纯金额
    const price = [
      { type: 'text', value: `¥`, style: { ...common, top: 8, fontSize: 14 } },
      { type: 'text', value: `${int}`, style: { ...common, fontSize: 24 } },
      { type: 'text', value: `.${dot || '00'}`, style: { ...common, top: 9, fontSize: 14 } }
    ]

    // 加号
    const plus = [{ type: 'text', value: ` + `, style: { ...common, top: 9, fontSize: 12 } }]

    // 金额+积分
    const priceAndIntegral = [...price, ...plus, ...integral]

    return [
      // 普通商品
      { hit: !isIntegralGoods, value: price },
      // 积分商品 纯积分
      { hit: isIntegralGoods && !data.salePrice, value: integral },
      // 积分商品 金额+积分
      { hit: isIntegralGoods && data.salePrice, value: priceAndIntegral }
    ].find((item) => item.hit)!.value
  }

  async function draw() {
    toast?.loading('海报生成中...')
    try {
      // 获取小程序二维码
      let { data: qrcode = '' } = await api['/wechat/api/qrCode/getUnlimited_POST']({
        page: routeNames.goodsGoodDetail.slice(1),
        scene: `${data.goodsNo}`,
        version: isPrd ? 'release' : 'trial'
      })

      if (qrcode) {
        qrcode = /^data:image/.test(qrcode) ? qrcode : `data:image/png;base64,${qrcode}`
      }

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
          style: { left: 20, top: 355, width: posterStyle.width - 30, fontSize: 15, color: '#333333', lineHeight: 20, fontWeight: 'bold' }
        },
        {
          type: 'list',
          value: getPriceText() as any,
          style: { left: 20, top: 355 + 20 + 8, fontSize: 24, color: '#FF413B', fontWeight: 'bold' }
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
          style: { left: 116, top: 355 + 20 + 8 + 24 + 20 + 10, fontSize: 12, color: '#999999', lineHeight: 20 }
        },
        {
          type: 'text',
          value: '2.打开微信识别二维码',
          style: { left: 116, top: 355 + 20 + 8 + 24 + 20 + 20 + 10 + 5, fontSize: 12, color: '#999999', lineHeight: 20 }
        },
        {
          type: 'image',
          value: qrcode,
          style: { left: 20, top: 355 + 20 + 8 + 24 + 8, width: 80, height: 80 }
        }
      ])

      await posterRef.current!.getImageSrc()
      posterRef.current!.show()
    } catch (error) {}
    toast?.hideLoading()
  }

  return {
    /** ref */
    posterRef,
    /** 绘制方法 */
    draw,
    /** 画布宽高 */
    posterStyle
  }
}
