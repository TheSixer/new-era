import { FC, memo, useEffect, useRef } from 'react'
import styles from './index.module.less'
import { IIndexProps } from './const'
import MMNavigation from '@wmeimob/taro-design/src/components/navigation'
import { Button, Image, ScrollView, Text, View } from '@tarojs/components'
import UserHead from './components/userHead'
import icon_vip from './images/icon_vip.png'
import icon_follow from './images/icon_follow.png'
import icon_stores from './images/icon_stores.png'
import icon_exchange_records from './images/icon_exchange_records.png'
import { routeNames } from '../../../routes'
import { PageContainer } from '@wmeimob/taro-design'
import MMBadge from '@wmeimob/taro-design/src/components/badge'
import { isNoStatusBar } from '../../../config'
import TabBar from '../../../custom-tab-bar/tabBar'
import classNames from 'classnames'
import { ArrowDownFilled } from '../../../components/Icons'
import { navByLink } from '../../../components/pageModules/utils'
import { EJumpType } from '@wmeimob-modules/decoration-data/src/enums/EJumpType'
import { useDidShow } from '@tarojs/taro'
import { useGlobalStore } from '@wmeimob/taro-store'
import useGetLocation from '../../../hooks/useGetLocation'

const Component: FC<IIndexProps> = () => {
  const navHeight = useRef(MMNavigation.navigationHeight)
  const { user } = useGlobalStore()

  const orders = [
    { label: '会员权益', img: icon_vip, url: routeNames.orderMyOrder, params: { id: 1 }, num: 0 },
    { label: '兑换记录', img: icon_exchange_records, url: routeNames.orderMyOrder, params: { id: 2 }, num: 0 },
    { label: '门店查询', img: icon_stores, url: routeNames.orderMyOrder, params: { id: 3 }, num: 0 },
    { label: '跟随我们', img: icon_follow, url: routeNames.orderCommentCenter, num: 0 }
  ];

  useEffect(() => {
    if (user.mobile && !user.registerIs) {
      navByLink(EJumpType.DefaultNav, { url: routeNames.webAuth, params: {} })
    }
  }, [user])

  const jumpClick = (url?: string, params?: object) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    // !user.mobile ? '' : url ? Taro.navigateTo({ url: getParamsUrl(url, params) }) : ''
  }

  // const getOrdersNum = async () => {
  //   const { data = {} } = await api['/wechat/orders/count_GET']({})

  //   const order_ = orders.map((item) => {
  //     const name = EMineOrdersNum[item.label] || ''
  //     return {
  //       ...item,
  //       num: data[name]
  //     }
  //   })
  //   setOrders(order_)
  // }

  useDidShow(() => {
    useGetLocation()
  })

  return (
    <PageContainer isTab className={styles.indexStyle}>
      <View className={classNames(styles.content, isNoStatusBar && styles.content_h5)}>
        <ScrollView className={styles.scroll} scrollY showScrollbar={false} enhanced={true}>
          <MMNavigation contentStyle={{ color: '#fff' }} renderLeft={false} title="个人中心" shadow={false} type="Transparent" place={false} />

          <View className={styles.headerArea} style={{ paddingTop: navHeight.current + 10 }}>
            <UserHead />
          </View>

          <View className={styles.vip_area}>
            <View className={styles.vip_title}>
              <View className={styles.vip_title_text}>帽险先锋</View>
              <View className={styles.vip_title_subtext}>还需消费168元，升级为“玩帽大神”</View>
            </View>
            <View className={styles.vip_info}>
              <View className={styles.vip_points}>
                <Text className={styles.vip_points_text}>0</Text>
                <Text className={styles.vip_points_subtext}>积分</Text>
              </View>
              <View className={styles.vip_points}>
                <Text className={styles.vip_points_text}>0</Text>
                <Text className={styles.vip_points_subtext}>卡券</Text>
              </View>
            </View>
          </View>

          <View className={styles.mine_body}>
            <View className={styles.mine_body__title}>我的服务</View>
            
            <View className={styles.content_area}>
              {/* 订单入口 */}
              <View className={styles.orderCard}>
  
                <View className={styles.row}>
                  {orders.map((item) => (
                    <View key={item.label} className={styles.cell} onClick={() => jumpClick(item.url || '', item.params)}>
                      <View className={styles.cell_img}>
                        {!!item.num && <MMBadge value={item.num} absolute offset={[0, 5]} />}
                        <Image src={item.img} className={styles.orderCard_icon} />
                      </View>
                      <View>{item.label}</View>
                    </View>
                  ))}
                </View>
              </View>

              {/* 活动预约 */}
              <View className={styles.activity_card} onClick={() => {
                navByLink(EJumpType.DefaultNav, { url: routeNames.eventsPrefecture, params: {} })
              }}>
                <View className={styles.activity_card_title}>EVENT RESERVATION</View>
                <View className={styles.activity_card_content}>活动预约</View>
                <View className={styles.activity_card_desc}>
                  <Button className={styles.activity_card_btn} onClick={() => {}}>
                    <Text>立即预约</Text>
                    <ArrowDownFilled style={{ transform: 'rotate(-90deg)' }} />
                  </Button>
                </View>
              </View>

              {/* 我的 */}
              <View className={classNames(styles.activity_card, styles.my_activity_card)} onClick={() => {
                navByLink(EJumpType.DefaultNav, { url: routeNames.mineEventsList, params: {} })
              }}>
                <View className={styles.activity_card_title}>MY RESERVATION</View>
                <View className={styles.activity_card_content}>我的预约</View>
                <View className={styles.activity_card_desc}>
                  <Button className={styles.activity_card_btn} onClick={() => {}}>
                    <Text>查看详情</Text>
                    <ArrowDownFilled style={{ transform: 'rotate(-90deg)' }} />
                  </Button>
                </View>
              </View>

              <View className={styles.footer_area}>
                <View className={styles.footer_area_text}>如有问题，请联系我们：<Text className={styles.footer_area_link}>021-1234567</Text></View>
                <View className={classNames(styles.footer_area_text, styles.footer_area_link)}>隐私协议及服务条款</View>
              </View>

            </View>
          </View>

        </ScrollView>
      </View>
      <TabBar />
    </PageContainer>
  )
}

const Index = memo(Component)
export default Index
