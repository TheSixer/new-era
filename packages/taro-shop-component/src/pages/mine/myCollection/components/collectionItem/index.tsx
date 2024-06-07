import { memo, useMemo, FC } from 'react'
import { Image, View } from '@tarojs/components'
import { ICollectionItemProps } from './const'
import styles from './index.module.less'
import GoodPrice from '../../../../../components/good/goodPrice'
import MMSwipeCell from '@wmeimob/taro-design/src/components/swipeCell'
import { ISwipeCellButton } from '@wmeimob/taro-design/src/components/swipeCell/const'
import { ECollectionStatus } from '../../../../../enums/goods/ECollectionStatus'
import { navByLink } from '../../../../../components/pageModules/utils'
import { EJumpType } from '@wmeimob-modules/decoration-data/src/enums/EJumpType'
import { useDialog } from '@wmeimob/taro-design'

const Component: FC<ICollectionItemProps> = (props) => {
  const { data } = props

  const sliderButtons = useMemo<ISwipeCellButton[]>(() => [{ text: '删除', backgroundColor: '#F11D28' }], [])

  const lose = data.status === ECollectionStatus.Lose

  const dialog = useDialog()

  // const sales = useMemo(() => (data.actualSales ?? 0) + (data.customStartSales ?? 0), [data.actualSales, data.customStartSales]) // 销量 实际销量 + 虚拟销量

  return (
    <MMSwipeCell
      sliderButtons={sliderButtons}
      disabled={false}
      beforeClose={async () => {
        dialog?.show(
          {
            content: '确定删除？',
            okLoading: true,
            onOk: async () => {
              await props.onDelete?.()
            },
            onCancel() {
              return false
            }
          }
        )
        return false
      }}
    >
      <View
        className={styles.collectionItemStyle}
        onClick={() => !lose && navByLink(EJumpType.GoodDetail,{ goodsNo: data.relationalNo } )}
      >
        {/* Taro.navigateTo({ url: routeNames.goodsGoodDetail, params: { goodsNo: data.relationalNo } */}
        <View className={styles.imageWrapper}>
          <Image className={styles.productImage} src={data.coverImg!} />
          {lose && <View className={styles.loseStyle}>已失效</View>}
        </View>

        <View className={styles.productBaseInfo}>
          <View className={styles.name}>{data.goodsName}</View>

          <View className={styles.salesInfo}>
            <View className={styles.price}>
              <GoodPrice value={data.salePrice!} fontSize={[18, 12]} />
            </View>

            {!!data.marketPrice&&<GoodPrice value={data.marketPrice!} fontSize={12} color='#999999' lineThrough />}
            {/* <View className={styles.salesCount}>已售{sales}件</View> */}
          </View>
        </View>
      </View>
    </MMSwipeCell>
  )
}

const CollectionItem = memo(Component)
export default CollectionItem
