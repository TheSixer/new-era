import { View } from '@tarojs/components'
import styles from './index.module.less'
import { memo, FC } from 'react'
import GoodPrice from '../goodPrice'
import classNames from 'classnames'
import { getImage } from '@wmeimob/aliyun'
import { IGoodsVoWithActivity } from '@wmeimob/taro-api/src/types/goods/IGoodsVoWithActivity'

export interface IGoodCardProps {
  /** 商品数据 */
  data: IGoodsVoWithActivity

  onClick?(): void
}

/**
 * 商品信息卡片
 *
 * @param {*} props
 * @description 商品信息展示卡片。包含商品封面图、商品标题、商品价格等信息
 * @return {*}
 */
const Component: FC<IGoodCardProps> = (props) => {
  const { data } = props

  return (
    <View className={styles.goodCardStyle} onClick={props.onClick}>
      {/* 封面图 */}
      <View className={styles.good_cover}>
        <View className={styles.good_cover_inner} style={{ backgroundImage: `url(${getImage(data.coverImg!, 400)})` }} />
      </View>
      {/* 下部分 */}
      <View className={styles.good_content}>
        {/* 标题 */}
        <View className={styles.good_title}>{data.goodsName}</View>
        {/* 活动 */}
        {!!data.formatActivitiesText?.length && (
          <View className={styles.discountListBox}>
            <View className={classNames(styles.discountList, styles.discountTag)}>
              <View className={styles.block}>{data.formatActivitiesText[0]}</View>
            </View>
          </View>
        )}
        {/* 底部价格 */}
        <View className={styles.good_footer}>
          <View className={styles.good_footer_left}>
            <GoodPrice value={data.salePrice!} />
          </View>
          {!!data.marketPrice && (
            <View className={styles.good_footer_right}>
              <GoodPrice value={data.marketPrice!} color="#999" fontSize={12} blod={false} />
            </View>
          )}
        </View>
      </View>
    </View>
  )
}

const GoodCard = memo(Component)
export default GoodCard
