import Taro, { useRouter } from '@tarojs/taro'
import { FC, memo, useEffect, useMemo, useState } from 'react'
import styles from './index.module.less'
import { IGoodsListProps } from './const'
import MMNavigation from '@wmeimob/taro-design/src/components/navigation'
import useMMPullToRefresh from '@wmeimob/taro-design/src/components/pull-to-refresh/useMMPullToRefresh'
import MMEmpty from '@wmeimob/taro-design/src/components/empty'
import MMPullToRefresh from '@wmeimob/taro-design/src/components/pull-to-refresh'
import useActivityGood from '../../../hooks/activity/useActivityGood'
import { PageContainer } from '@wmeimob/taro-design'
import { MMNavigationType } from '@wmeimob/taro-design/src/components/navigation/const'
import { Image, Text, View } from '@tarojs/components'
import iconDiscount from './images/icon_discount.png'
import MMDialog from '@wmeimob/taro-design/src/components/dialog'
import MMRichText from '../../../components/richText'
import { navByLink } from '../../../components/pageModules/utils'
import { EJumpType } from '@wmeimob-modules/decoration-data/src/enums/EJumpType'
import empty from './images/empty.png'
import { MarketingActivityDto, api } from '@wmeimob/taro-api'
import { getActivityFormatText } from '@wmeimob/shop-data/goods/utils/activities'
import { IGoodsVoWithActivity } from '@wmeimob/taro-api/src/types/goods/IGoodsVoWithActivity'
import MasonryList from '../../../components/masonryList'

const Component: FC<IGoodsListProps> = () => {
  const { activity, setModalVisible, discountInfoGroup, pullToRefreshProps, info, jumpToDetail, modalVisible } = useBasicService()

  return (
    <PageContainer className={styles.goodsListStyle} noPlace>
      <MMNavigation type={MMNavigationType.Transparent} title="常规活动列表" />

      <View className={styles.header}>
        <View className={styles.name}>{activity?.activityName}</View>

        {activity?.content && (
          <View className={styles.explain} onClick={() => setModalVisible(true)}>
            规则说明
          </View>
        )}

        <View className="spacing" />
        <View className={styles.desc}>{activity?.description}</View>

        <View className={styles.discount_info}>
          <Image src={iconDiscount} className={styles.discount_icon} />
          {discountInfoGroup && (
            <View className={styles.discount_group}>
              {discountInfoGroup.map((item, idx) => (
                <View key={idx} className={styles.discount_group_item}>
                  {item.text}
                </View>
              ))}
            </View>
          )}
        </View>
      </View>

      <MMPullToRefresh {...pullToRefreshProps} className={styles.list} empty={info.isEmpty && <View className={styles.empty}><MMEmpty src={empty} imgStyle={{width:'160px',height:'160px'}} type="record" text="暂时没有活动" /></View>}>
        <View className={styles.masonryList}>
          <MasonryList data={info.list} onClick={jumpToDetail} />
        </View>
      </MMPullToRefresh>

      <MMDialog title="活动说明" visible={modalVisible} closeable footer={false} onCancel={() => setModalVisible(false)}>
        <View className={styles.explain_detail}>
          <MMRichText html={activity?.content || ''} />
        </View>
      </MMDialog>
    </PageContainer>
  )
}

const GoodsList = memo(Component)
export default GoodsList

function useBasicService() {
  const { params }: { params: { activityNo: string } } = useRouter()

  const [activity, setActivity] = useState<MarketingActivityDto>()
  const [modalVisible, setModalVisible] = useState(false)

  const discountInfoGroup = useMemo(() => {
    if (!activity) return null

    const list = getActivityFormatText(activity)

    return list
  }, [activity])

  const { convertGood } = useActivityGood()

  const [info, pullToRefreshProps] = useMMPullToRefresh<IGoodsVoWithActivity>({
    getData: (queryParams) => api['/wechat/activity/goods_GET']({ activityNo: params.activityNo, ...queryParams }),
    dataFormat(data) {
      return data.map((item) => convertGood(item))
    }
  })

  useEffect(() => {
    api['/wechat/activity/{activityNo}_GET'](params.activityNo).then(({ data }) => setActivity(data))
  }, [])

  const jumpToDetail = (item) => {
    navByLink(EJumpType.GoodDetail,  { goodsNo: item.goodsNo })
    // Taro.navigateTo({ url: routeNames.goodsGoodDetail, params: { goodsNo: item.goodsNo } as IRouteParams })
  }

  return {
    activity,
    setModalVisible,
    discountInfoGroup,
    pullToRefreshProps,
    info,
    jumpToDetail,
    modalVisible
  }
}
