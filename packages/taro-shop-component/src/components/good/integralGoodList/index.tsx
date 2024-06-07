import { View } from '@tarojs/components'
import styles from './index.module.less'
import IntegralGoodItem from '../integralGoodItem'
import { memo, FC } from 'react'
import classNames from 'classnames'
import MMButton from '@wmeimob/taro-design/src/components/button'
import { GoodsVO } from '@wmeimob/taro-api'
import { EGoodListType } from '../goodList/const'
import { MMButtonType } from '@wmeimob/taro-design/src/components/button/const'

const { Grid } = EGoodListType

interface IGoodListProps<DataType = any> {
  /** 商品列表 */
  list: GoodsVO[]
  /** 类型 */
  type?: EGoodListType

  /** 点击 */
  onClick?(data: DataType, index: number): void

  /** 直接购买 */
  onBuy(goods: GoodsVO): void
}

const Component: FC<IGoodListProps> = (props) => {
  const { list = [], type = Grid } = props

  function renderButtons(item: GoodsVO) {
    const isSingleSku = item.goodsSkuDetailList?.length === 1

    return (
      <MMButton
        size="tiny"
        // type="primary"
        type={MMButtonType.h5Red}
        style={{ width: 60 }}
        onClick={(ev) => {
          ev.stopPropagation()
          ev.preventDefault()
          props.onBuy(item)
        }}
      >
        {isSingleSku ? '立即兑换' : '选规格'}
      </MMButton>
    )
  }

  return (
    <View className={classNames(styles.goodListStyle, styles.item)}>
      {list.map((item, index) => {
        return (
          <View key={`${item.id || ''}${index}`} className={styles.goodItem}>
            <IntegralGoodItem data={item} buttons={renderButtons(item)} onClick={() => props.onClick?.(item, index)} />
          </View>
        )
      })}
    </View>
  )
}

const IntegralGoodList = memo(Component)
export default IntegralGoodList
