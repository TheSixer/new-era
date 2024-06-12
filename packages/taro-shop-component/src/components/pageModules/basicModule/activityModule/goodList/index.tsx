import { FC } from 'react'
import { Image, Text, View } from '@tarojs/components'
import { IGoodListProps } from './const'
import styles from './index.module.less'
import classNames from 'classnames'
import MMButton from '@wmeimob/taro-design/src/components/button'
import MMIconFont from '@wmeimob/taro-design/src/components/icon-font'
import MMIconFontName from '@wmeimob/taro-design/src/components/icon-font/const'
import { getResizeUrl } from '@wmeimob/tencent-cloud'
import useActivityGood from '../../../../../hooks/activity/useActivityGood'
import { navByLink } from '../../../utils'
import { EJumpType } from '@wmeimob-modules/decoration-data/src/enums/EJumpType'
import { MMButtonType } from '@wmeimob/taro-design/src/components/button/const'
import GoodsPrice from '@wmeimob-modules/goods-taro/src/components/goodsPrice'

const Component: FC<IGoodListProps> = (props) => {
  const { btnName = '', data = [], createTagKeys = () => [] } = props

  const { convertGood } = useActivityGood()

  return (
    <View className={styles.goodListStyle}>
      {data.map((item,index) => {
        const tags = createTagKeys(item)

        const good = convertGood(item)
        const cover = good.coverImg + getResizeUrl({ width: 95, height: 95 })
        return (
          <View
            key={index}
            className={styles.goodItem}
            onClick={() => navByLink(EJumpType.GoodDetail, { goodsNo: good.goodsNo })}
          >
            <Image src={cover} className={styles.goodCover} />
            <View className={styles.goodContent}>
              <View style={{ minWidth: 0 }}>
                <View className={classNames(styles.goodName, 'textOverflow2')}>{good.goodsName}</View>
                <View>
                  {tags.map((tag) => (
                    <View className={styles.couponLi} key={tag}>
                      {tag}
                    </View>
                  ))}
                </View>
              </View>
              <View className={styles.goodFooter}>
                <GoodsPrice className={styles.lh25} value={good.salePrice!}/>
                <View className={styles.linePrice}>{good.marketPrice && `￥${good.marketPrice}`}</View>
                <View className={styles.btn}>
                  <MMButton type={MMButtonType.h5Red} size="mini">{btnName}</MMButton>
                </View>
              </View>
            </View>
          </View>
        )
      })}
      <View className={styles.more} onClick={props.onMore}>
        <Text style={{ marginRight: '4px' }}>查看更多</Text>
        <MMIconFont value={MMIconFontName.Next} size={12} />
      </View>
    </View>
  )
}

const GoodList = Component
export default GoodList
