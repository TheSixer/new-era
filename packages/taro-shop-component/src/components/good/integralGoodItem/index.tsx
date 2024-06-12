import { FC, memo, ReactNode } from 'react'
import { View, Image } from '@tarojs/components'
import styles from './index.module.less'
import { getResizeUrl } from '@wmeimob/tencent-cloud'
import classNames from 'classnames'
import { GoodsVO } from '@wmeimob/taro-api'
import GoodsPriceWithIntegral from '@wmeimob-modules/goods-taro/src/components/goodsPriceWithIntegral'

const imgStyle = { width: 110, height: 110 }

export interface IIntegralGoodItemProps {
  /** 商品数据 */
  data: GoodsVO

  buttons?: ReactNode

  onClick?(): void
}

const Component: FC<IIntegralGoodItemProps> = (props) => {
  const { data = {} } = props

  return (
    <View className={styles.goodItemStyle}>
      {/* 封面图 */}

      <View className={styles.good_cover} style={imgStyle} onClick={props.onClick}>
        <Image src={data.coverImg + getResizeUrl(imgStyle)} className={styles.good_cover_img} />
      </View>
      {/* 下部分 */}
      <View className={styles.good_content}>
        {/* 标题 */}
        <View className={classNames(styles.good_title)} onClick={props.onClick}>
          {data.goodsName}
        </View>

        {/* 实际销量 + 虚拟销量 */}
        <View className={styles.sales}>销量：{(data.actualSales || 0) + (data.customStartSales || 0)}</View>

        {/* 底部价格 */}
        <View className={styles.good_footer}>
          <GoodsPriceWithIntegral salePrice={data.salePrice} exchangeIntegral={data.exchangeIntegral} />

          {/* 操作按钮 */}
          <View onClick={(event) => event.stopPropagation()}>{props.buttons}</View>
        </View>
      </View>
    </View>
  )
}

const IntegralGoodItem = memo(Component)
export default IntegralGoodItem
