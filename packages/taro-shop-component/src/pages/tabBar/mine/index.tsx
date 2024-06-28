import { FC, memo, useEffect, useMemo, useRef } from 'react'
import styles from './index.module.less'
import { IIndexProps } from './const'
import MMNavigation from '@wmeimob/taro-design/src/components/navigation'
import { Button, Image, ScrollView, Text, View } from '@tarojs/components'
import UserHead from './components/userHead'
import icon_reservation from './images/icon_reservation.png'
import icon_order from './images/icon_order.png'
import icon_new from './images/icon_new.png'
import icon_callus from './images/icon_callus.png'
import icon_check from './images/icon_check.png'
import icon_rewards from './images/icon_rewards.png'
import icon_exchange_records from './images/icon_exchange_records.png'
import { routeNames } from '../../../routes'
import { PageContainer } from '@wmeimob/taro-design'
import MMBadge from '@wmeimob/taro-design/src/components/badge'
import TabBar from '../../../custom-tab-bar/tabBar'
import classNames from 'classnames'
import { ArrowDownFilled } from '../../../components/Icons'
import { navByLink } from '../../../components/pageModules/utils'
import { EJumpType } from '@wmeimob-modules/decoration-data/src/enums/EJumpType'
import Taro, { useDidShow } from '@tarojs/taro'
import { useGlobalStore } from '@wmeimob/taro-store'
import useGetLocation from '../../../hooks/useGetLocation'
import getParamsUrl from '@wmeimob/taro-utils/src/getParamsUrl'
import { EAgreementType } from '@wmeimob/shop-data/src/enums/EAgreementType'

const Component: FC<IIndexProps> = () => {
  const navHeight = useRef(MMNavigation.navigationHeight)
  const { user } = useGlobalStore()
  
  useGetLocation()

  const orders = useMemo(() => [
    { label: '我的预约', img: icon_reservation, url: routeNames.mineEventsList, params: {}, num: 0 },
    { label: '我的订单', img: icon_order, url: '', params: { id: 2 }, num: 0 },
    { label: '新品预约', img: icon_new, url: '', params: { id: 3 }, num: 0 },
    { label: '我的奖品', img: icon_rewards, url: '', params: { id: 4 }, num: 0 },
    { label: '兑换记录', img: icon_exchange_records, url: '', params: { id: 5 }, num: 0 },
    { label: '联系我们', img: icon_callus, url: 'call', params: { id: 6 }, num: 0 },
    ...(user.checkUser ? [{ label: '活动核销', img: icon_check, url: routeNames.mineVerifyVerifycode, num: 0 }] : [])
  ], [user]);

  useDidShow(() => {
    if (user.mobile && !user.registerIs) {
      navByLink(EJumpType.DefaultNav, { url: routeNames.webAuth, params: {} })
    }
  })

  const jumpClick = (url?: string, params?: object) => {
    Taro.navigateTo({ url: getParamsUrl(url, params) })
  }

  // 联系我们
  const contactUs = () => {
    Taro.showModal({
      title: '联系我们',
      content: '15001745846',
      confirmText: '拨号',
      success: (res) => {
        if (res.confirm) {
          Taro.makePhoneCall({ phoneNumber: '15001745846' })
        }
      }
    })
  }

  return (
    <PageContainer isTab className={styles.indexStyle}>
      <View className={classNames(styles.content)}>
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
                    <View key={item.label} className={styles.cell} onClick={() => item.url === 'call' ? contactUs() : jumpClick(item.url || '', item.params)}>
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
                  <Button className={styles.activity_card_btn}>
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
                  <Button className={styles.activity_card_btn}>
                    <Text>查看详情</Text>
                    <ArrowDownFilled style={{ transform: 'rotate(-90deg)' }} />
                  </Button>
                </View>
              </View>

              <View className={styles.footer_area}>
                <View className={styles.footer_area_text}>如有问题，请联系我们：<Text className={styles.footer_area_link} onClick={contactUs}>15001745846</Text></View>
                <View className={classNames(styles.footer_area_text, styles.footer_area_link)}>
                  <Text onClick={() => jumpClick(routeNames.mineUserAgreement, { type: EAgreementType.Privacy })}>隐私协议</Text>及
                  <Text onClick={() => jumpClick(routeNames.mineUserAgreement, {})}>服务条款</Text>
                </View>
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
