import { memo, FC } from 'react'
import { View, Image } from '@tarojs/components'
import { IGiveGoodProps } from './const'
import styles from './index.module.less'
import GoodPrice from '../../../../../components/good/goodPrice'
import classnames from 'classnames'
import shopVariable from '@wmeimob/taro-design/src/components/styles/themes/shop.variable'

const Component: FC<IGiveGoodProps> = (props) => {
  const { data } = props

  console.log(data)
  return (
    <View className={styles.giveGoodStyle}>
      <View className={styles.giveConent}>
        <View className={styles.giveGoodImgBox}>
          {/* 要换 */}
          <Image src={data.skuImg!} className={styles.giveGoodImg} />
          <View className={styles.give_sign}>赠品</View>
        </View>
        <View className={styles.giveGoodR}>
          <View>
            <View className={classnames(styles.giveGoodRName, 'text-over-flow-1')}>{data.goodsName}</View>

            <View className={styles.subTitle}>{data.skuName}</View>
          </View>

          {!!data.marketPrice&&<View className={styles.giveGoodRBot}>
            {/*<View className={styles.freeShipping}>包邮</View>*/}
            <GoodPrice value={data.marketPrice!} fontSize={13} color={shopVariable.fontColor} />
          </View>}
        </View>
      </View>

      {/*<View className={styles.giveTip}>{!data.saleQuantity ? '* 很抱歉，赠品已赠完' : '* 赠品数量有限，赠完即止。实际赠送情况以支付订单为准'}</View>*/}
    </View>
  )
}

const GiveGood = memo(Component)
export default GiveGood
