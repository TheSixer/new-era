import { memo, FC } from 'react'
import { Image, View } from '@tarojs/components'
import { IGoodActivityItemProps } from './const'
import styles from './index.module.less'
import classNames from 'classnames'
import { getResizeUrl } from '@wmeimob/tencent-cloud'
import GoodPrice from '../../good/goodPrice'
import MMButton from '@wmeimob/taro-design/src/components/button'
import shopVariable from '@wmeimob/taro-design/src/components/styles/themes/shop.variable'
import { navByLink } from '../../pageModules/utils'
import { EJumpType } from '@wmeimob-modules/decoration-data/src/enums/EJumpType'
import { MMButtonType } from '@wmeimob/taro-design/src/components/button/const'

const imageStyle = { width: 90, height: 90 }

const Component: FC<IGoodActivityItemProps> = (props) => {
  const { data, hasSign = true, buttonText = '去抢购' } = props

  return (
    <View className={classNames(styles.goodActivityItemStyle)}>
      <Image src={data.coverImg! + getResizeUrl(imageStyle)} style={imageStyle} className={styles.goodsImgBox} />

      <View className={styles.rightBox}>
        <View className={classNames(styles.name, 'text-over-flow-2')}>{data.goodsName}</View>

        <View className={styles.priceCont}>
            <GoodPrice className={styles.lh23} value={data.price!} fontSize={[18, shopVariable.fontSizeSm]} />
          {!!data.marketPrice&&<View className={styles.marketPrice}>
            <GoodPrice className={styles.lh17} value={data.marketPrice!} fontSize={shopVariable.fontSizeSm} lineThrough
                       color={shopVariable.fontColorAssistant} />
          </View>}
          <MMButton type={MMButtonType.h5Red} size="mini" style={{ width: 70 }} onClick={() => navByLink(EJumpType.GoodDetail,{ goodsNo: data!.goodsNo })}>
            {buttonText}
          </MMButton>
        </View>
      </View>
    </View>
  )
}

const GoodActivityItem = memo(Component)
export default GoodActivityItem
