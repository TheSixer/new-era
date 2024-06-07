import { Image, View } from '@tarojs/components'
import GoodPrice from '@wmeimob-modules/goods-taro/src/components/goodsPrice'
import { getResizeUrl } from '@wmeimob/aliyun'
import MMButton from '@wmeimob/taro-design/src/components/button'
import shopVariable from '@wmeimob/taro-design/src/components/styles/themes/shop.variable'
import classNames from 'classnames'
import { memo, ReactNode, FC } from 'react'
import styles from './index.module.less'

import { MarketingActivityGoodsParam } from '@wmeimob/taro-api'
import { MMButtonType } from '@wmeimob/taro-design/src/components/button/const'

interface IGoodActivityItemProps {
  data: MarketingActivityGoodsParam
  buttonText?: ReactNode
  onDetail(): void
}

const imageStyle = { width: 90, height: 90 }

const Component: FC<IGoodActivityItemProps> = (props) => {
  const { data, buttonText = '去抢购' } = props

  return (
    <View className={classNames(styles.goodActivityItemStyle)}>
      <Image src={data.coverImg! + getResizeUrl(imageStyle)} style={imageStyle} className={styles.goodsImgBox} />

      <View className={styles.rightBox}>
        <View className={classNames(styles.name, 'text-over-flow-2')}>{data.goodsName}</View>

        <View className={styles.priceCont}>
          <GoodPrice className={styles.lh25} value={data.price!} fontSize={[18, shopVariable.fontSizeSm]} />

          {!!data.marketPrice&&<View className={styles.marketPrice}>
            <GoodPrice className={styles.lh17} value={data.marketPrice!} fontSize={shopVariable.fontSizeSm} lineThrough
                       color={shopVariable.fontColorAssistant} />
          </View>}

          <MMButton type={MMButtonType.h5Red} size="mini" style={{ width: 68 }} onClick={props.onDetail}>
            {buttonText}
          </MMButton>
        </View>
      </View>
    </View>
  )
}

const GoodActivityItem = memo(Component)
export default GoodActivityItem
