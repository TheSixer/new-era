import { memo, useMemo, FC } from 'react'
import { View, Image, Text } from '@tarojs/components'
import { IOrderGoodProps } from './const'
import styles from './index.module.less'
import GoodPrice from '../../good/goodPrice'
import { getResizeUrl } from '@wmeimob/tencent-cloud'
// import giveGoodImg from './images/giveGood.png'
import classNames from 'classnames'
import { OrderItemsDTO, OrderItemsVO, RefundItemDto } from '@wmeimob/taro-api'
import GoodsPriceWithIntegral from '@wmeimob-modules/goods-taro/src/components/goodsPriceWithIntegral'
import OrderGoodsTag, { EOrderGoodsTagType } from '../orderGoodsTag'

const imgStyle = { width: 90, height: 90 }
/**
 * 订单商品组件
 * @param props
 * @returns
 */
const Component: FC<IOrderGoodProps> = (props) => {
  const { orderGood, isPresentGood } = useOrderGoodService(props)
  const {color} = props

  const showPrice = props.showPrice || props.showMarketPrice

  // const salePrice = props.showPrice && <GoodPrice value={orderGood.salePrice!} color="#333333" fontSize={13} />
  const salePrice = props.showPrice && (
    <GoodsPriceWithIntegral salePrice={orderGood.salePrice!} exchangeIntegral={orderGood.exchangeIntegral} color={color? color: orderGood.exchangeIntegral?"#282828":"#333333"} fontSize={13} />
  )

  const marketPrice = props.showMarketPrice && <GoodPrice value={orderGood.marketPrice!} color="#949698" fontSize={13} blod={false} lineThrough />

  const price = showPrice && (
    <View className={styles.footer_left}>
      {!isPresentGood && <>{salePrice}&nbsp;&nbsp;</>}

      {(isPresentGood || props.showFreeShipping) && <View className={styles.giveText}><Text>包邮</Text></View>}

      {marketPrice && (
        <>
          &nbsp;&nbsp;
          {marketPrice}
        </>
      )}
    </View>
  )

  return (
    <View className={classNames(styles.orderGoodStyle, props.className)} style={props.style} onClick={props.onClick}>
      {/* 封面图 */}
      <View className={styles.cover}>
        {!!orderGood.orderGoodsTag && <OrderGoodsTag type={orderGood.orderGoodsTag} />}

        <Image src={orderGood.skuImg + getResizeUrl(imgStyle)} className={styles.cover_img} style={imgStyle} />
        {/* 赠品 */}
        {/* {isPresentGood && <Image src={giveGoodImg} className={styles.giveGood} />} */}
      </View>
      {/* 下部分 */}
      <View className={styles.content}>
        {/* 标题 */}
        <View className={classNames(styles.title, 'text-over-flow-2')}>{orderGood.goodsName}</View>
        {/* 副标题 */}
        <View className={styles.subTitle}>{orderGood.skuName?.split((' ')).map((item,index)=>{
          const sku = item.split(':')
          return (<Text key={index}>{sku[0]!}:&nbsp;&nbsp;{sku[1]!}&nbsp;&nbsp;</Text>)
        })}</View>
        <View className={styles.placeholder} />
        <View className={styles.footer}>
          {props.hasOwnProperty('renderPrice') ? props.renderPrice : price}
          {props.showQuantity && <View className={styles.footer_right}>*{orderGood.saleQuantity}</View>}
        </View>
      </View>
    </View>
  )
}

Component.defaultProps = {
  showPrice: true,
  showMarketPrice: true,
  showQuantity: true
}

const OrderGood = memo(Component)
export default OrderGood

/**
 * 组件复用
 * 但是数据有三种格式。这里做一下转换
 */
function useOrderGoodService(props: IOrderGoodProps) {
  const orderGood = useMemo<OrderItemsDTO & { orderGoodsTag?: EOrderGoodsTagType }>(() => {
    const { data = {} } = props

    if (isRefundItemDto(data)) {
      return {
        skuImg: data.skuImg,
        goodsName: data.goodsName,
        skuName: data.model,
        salePrice: data.goodsPrice,
        // marketPrice: data.marketPrice, // 售后用不上该字段
        saleQuantity: data.refundQuantity
      }
    }
    // else if (isOrderItemsVO(data)) {
    //   return {
    //     // orderData.goodsImg 缺字段要换
    //     skuImg: data.skuImg,
    //     goodsName: data.goodsName,
    //     specNames: data.skuName,
    //     skuPrice: data.salePrice,
    //     marketPrice: data.marketPrice,
    //     buyCounts: data.saleQuantity
    //   }
    // }

    return data
  }, [props.data])

  // 是否时赠送商品
  const isPresentGood = isOrderItemsVO(props.data) && !!props.data.gift

  /** 售后数据结构 */
  function isRefundItemDto(data: IOrderGoodProps['data']): data is RefundItemDto {
    return (data as RefundItemDto).refundNo !== undefined
  }

  function isOrderItemsVO(data: IOrderGoodProps['data']): data is OrderItemsVO {
    return (data as OrderItemsVO).orderNo !== undefined
  }

  return {
    orderGood,
    isPresentGood,
    isRefundItemDto,
    isOrderItemsVO
  }
}
