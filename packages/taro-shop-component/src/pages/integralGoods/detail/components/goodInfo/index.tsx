import { memo, useMemo, FC } from 'react'
import { View, Image } from '@tarojs/components'
import styles from './index.module.less'
import classNames from 'classnames'
import shareImg from '../../../../../assets/images/goodDetail/share.png'
import { useSetAtom } from 'jotai'
import { showSharePopAtom } from '../../store'
import { GoodsVO } from '@wmeimob/taro-api'
import GoodsPriceWithIntegral from '@wmeimob-modules/goods-taro/src/components/goodsPriceWithIntegral'
interface IGoodInfoProps {
  data: GoodsVO
}

const Component: FC<IGoodInfoProps> = (props) => {
  const { data = {} } = props

  const setShowSharePop = useSetAtom(showSharePopAtom)

  const sales = useMemo(() => (data.actualSales ?? 0) + (data.customStartSales ?? 0), [data.actualSales, data.customStartSales]) // 销量 实际销量 + 虚拟销量

  return (
    <View className={styles.goodInfoStyle}>
      {/*  价格 */}
      <View className={styles.salePriceBox}>
        <GoodsPriceWithIntegral salePrice={data.salePrice!} exchangeIntegral={data.exchangeIntegral} fontSize={[24, 14]} />
        {/* <GoodPrice value={data.salePrice!} fontSize={[24, 14]} /> */}

        {/* <View className={styles.marketPrice}>
          <GoodPrice value={data.marketPrice!} color="#999" fontSize={12} blod={false} lineThrough />
        </View> */}

        <View className={styles.saled}>销量:&nbsp;{sales}</View>
      </View>

      {/* 商品名称 */}
      <View className={styles.goodsNameBox}>
        <View className={classNames(styles.goodsName, 'text-over-flow-2')}>{data.goodsName}</View>

        <View className={styles.share}>
          <Image src={shareImg} style={{ width: 20, height: 20 }} onClick={() => setShowSharePop(true)} />
          <View>分享</View>
        </View>
      </View>
    </View>
  )
}

const GoodInfo = memo(Component)
export default GoodInfo
