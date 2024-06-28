import { View, ScrollView } from '@tarojs/components'
import { memo, useEffect, useState, FC } from 'react'
import { PageContainer } from '@wmeimob/taro-design'
import styles from './index.module.less'
import TabBar from '../../../custom-tab-bar/tabBar'
import Banner from './components/banner'
import RecommendStory from './components/recommendStory'
import Premium from './components/premium'
import EarnPoints from './components/earnPoints'
import './index.less';
import CustomEarnItem from './components/customEarnItem'
import CustomActivitiesItem from './components/CustomActivitiesItem'
import AboutUs from './components/aboutUs'
import { ActivityOutputDto, BannerPositionOutputDto, api } from '@wmeimob/taro-api'
import InitScreen from './components/initScreen'
import usePopupScreen from './hooks/usePopupScreen'
import { useDidShow } from '@tarojs/taro'

interface IHomeProps {}

/**
 * 装修首页
 *
 * 配置化首页小程序渲染代码。与自定义装修后台管理页面配合。开箱即用
 * @param {*} props
 * @return {*}
 */
const Component: FC<IHomeProps> = () => {
  const {earnPointsBanners, activities } = useDidShowService()

  const initScreen = usePopupScreen()

  useEffect(() => {
    initScreen.run()
  }, [])

  return (
    <PageContainer isTab className={styles.homeStyle}>
      <ScrollView className={styles.scroll} scrollY showScrollbar={false} enhanced={true}>
        <View className={styles.main_content}>
          <Banner />

          <RecommendStory style={{height: '670rpx'}} />

          <EarnPoints
            title='玩赚积分'
            subTitle='Earn Points'
            style={{height: '328rpx'}}
            data={earnPointsBanners}
            renderItem={(item, index) => <CustomEarnItem item={item} index={index} />}
          />

          <EarnPoints
            title='品牌体验'
            subTitle='Activities'
            style={{height: '575rpx'}}
            data={activities}
            renderItem={(item, index) => <CustomActivitiesItem item={item} index={index} />}
          />

          <Premium />

          <AboutUs />

        </View>

        {/* <View
          style={{
            position: 'fixed',
            top: '50%',
            right: '20px',
            backgroundColor: 'red',
            width: '50px',
            height: '50px',
            zIndex: 2
          }}
          onClick={() => Taro.navigateTo({ url: '/pages/live/index' })}
        >
          点击跳转直播
        </View> */}

        {/* <View
          style={{
            position: 'fixed',
            top: '70%',
            right: '20px',
            backgroundColor: 'red',
            width: '50px',
            height: '50px',
            zIndex: 2
          }}
          onClick={() => Taro.navigateTo({ url: '/pages/customerService/index' })}
        >
          点击跳转客服
        </View> */}

        <TabBar />

        <InitScreen data={initScreen.current} onClose={initScreen.handleClose} />

        {/* <UserAgreementUpdateDialog ref={agreementRef} /> */}

        {/* <SignToast setVisible={(type) => setVisible(type)} visible={visible} /> */}
      </ScrollView>
    </PageContainer>
  )
}

const Home = memo(Component)
export default Home

function useDidShowService() {
  const [loading, setLoading] = useState(false)
  const [earnPointsBanners, setEarnPointsBanners] = useState<BannerPositionOutputDto[]>([])
  const [activities, setActivities] = useState<ActivityOutputDto[]>([])

  useDidShow(() => {
    getBanners()
  });

  /** 获取banners */
  async function getBanners() {
    setLoading(true)
    const [{ data: earnPoints = [] }, { data: activities = [] }] = await Promise.all([
      api['/wechat/mall/banner/queryList_GET']({position: 'PLAY_WITH_POINTS'}),
      api['/wechat/activity/activityAll_GET']({})
    ])

    setEarnPointsBanners(earnPoints)
    setActivities(activities?.filter((item) => item.indexView))
    setLoading(false)
  }

  return {loading, earnPointsBanners, activities}
}
