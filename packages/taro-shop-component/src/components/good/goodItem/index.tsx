import { FC, memo } from 'react'
import { View, Image } from '@tarojs/components'
import { IGoodItemProps } from './const'
import styles from './index.module.less'
import GoodPrice from '../goodPrice'
import { getResizeUrl } from '@wmeimob/tencent-cloud'
import classNames from 'classnames'

const imgStyle = { width: 120, height: 120 }

const Component: FC<IGoodItemProps> = (props) => {
  const { data } = props

  return (
    <View className={styles.goodItemStyle} onClick={props.onClick}>
      {/* 封面图 */}

      <View className={styles.good_cover} style={imgStyle}>
        <Image src={data.coverImg + getResizeUrl(imgStyle)} className={styles.good_cover_img} />
      </View>
      {/* 下部分 */}
      <View className={styles.good_content}>
        {/* 标题 */}
        <View className={styles.good_title}>{data.goodsName}</View>

        {/* 活动 */}
        {!!data.formatActivitiesText?.length && (
          <View className={styles.discountListBox}>
            {data.formatActivitiesText.slice(0, 2).map((text, index) => (
              <View key={index} className={classNames(styles.discountList, styles.discountTag)}>
                {text}
              </View>
            ))}
          </View>
        )}

        {/* 底部价格 */}
        <View className={styles.good_footer}>
          <View className={styles.good_footer_left}>
            <GoodPrice value={data.salePrice!} />
          </View>
          {!!data.marketPrice && (
            <View className={styles.good_footer_right}>
              <GoodPrice value={data.marketPrice} color="#999" fontSize={12} blod={false} />
            </View>
          )}
        </View>
      </View>
    </View>
  )
}

const GoodItem = memo(Component)
export default GoodItem
