import { View, Swiper, SwiperItem, Image, Button } from '@tarojs/components'
import { memo, useEffect, useRef, useState, FC } from 'react'
import useNewcomer from '../../../hooks/user/useNewcomer'
import { PageContainer } from '@wmeimob/taro-design'
import PopupAds from './components/popupAds'
import usePopupAds from './hooks/usePopupAds'
import styles from './index.module.less'
import useAutoSign from '@wmeimob-modules/task-taro/src/hooks/useAutoSign'
import { systemConfig } from '../../../config'
import TabBar from '../../../custom-tab-bar/tabBar'
import { useGlobalStore } from '@wmeimob/taro-store'
import UserAgreementUpdateDialog, { IUserAgreementUpdateDialogRef } from '../../../components/userAgreementUpdateDialog'
import SignToast from './components/signToast'
import Banner from './components/banner'
import RecommendStory from './components/recommendStory'
import Premium from './components/premium'
import EarnPoints from './components/earnPoints'
import { ArrowDownFilled } from '../../../components/Icons'
import './index.less';
import classNames from 'classnames'
import CustomEarnItem from './components/customEarnItem'
import CustomActivitiesItem from './components/CustomActivitiesItem'
import AboutUs from './components/aboutUs'

interface IHomeProps {}

const images = [
  { src: 'https://ocj-uat.oss-cn-shanghai.aliyuncs.com/uat/938a92ae-df38-700a-bf0b-1c425d370d88.jpg', alt: 'Image 1' },
  { src: 'https://ocj-uat.oss-cn-shanghai.aliyuncs.com/uat/7d30fdf3-72d5-20a4-2e45-c2740baf08e7.jpg', alt: 'Image 2' },
  { src: 'https://ocj-uat.oss-cn-shanghai.aliyuncs.com/uat/a4462a2c-7241-8ba5-fb1e-c5a7265d34ba.jpg', alt: 'Image 3' },
  { src: 'https://ocj-uat.oss-cn-shanghai.aliyuncs.com/dev/e70e75b6-8e21-04a4-75ba-48405cf5f956.jpg', alt: 'Image 4' }
  // 其他图片
];

/**
 * 装修首页
 *
 * 配置化首页小程序渲染代码。与自定义装修后台管理页面配合。开箱即用
 * @param {*} props
 * @return {*}
 */
const Component: FC<IHomeProps> = () => {
  const { user } = useGlobalStore()

  const [current, setCurrent] = useState(4);

  const { toastReceiveNewcomerCouponSuccess } = useNewcomer()

  const popupAds = usePopupAds()

  const autoSignService = useAutoSign()
  const [visible, setVisible] = useState(false)

  const agreementRef = useRef<IUserAgreementUpdateDialogRef>(null)

  async function init() {
    if (user.mobile) {
      try {
        await agreementRef.current!.showUpdateDialog()
        if (systemConfig.config.enableSignTask) {
          const result = await autoSignService.autoSign()
          setVisible(result)
        }

        // systemConfig.config.enableSignTask && ()

        toastReceiveNewcomerCouponSuccess(() => {
          popupAds.run()
        })
      } catch (error) {}
    }
  }

  useEffect(() => {
    init()
  }, [user.mobile])

  return (
    <PageContainer isTab className={styles.homeStyle}>
      <View className={styles.main_content}>
        <Swiper
          className={styles.main_swiper}
          current={current}
          onChange={(event) => setCurrent(event.detail.current)}
          vertical
        >
          <SwiperItem>
            <Banner />
          </SwiperItem>
          <SwiperItem>
            <RecommendStory images={images} style={{height: '670rpx'}} />
          </SwiperItem>
          <SwiperItem>
            <View className={styles.main_swiper_item}>
              <EarnPoints
                title='玩赚积分'
                subTitle='Earn Points'
                style={{height: '328rpx'}}
                renderItem={(item, index) => <CustomEarnItem item={item} index={index} />}
              />

              <EarnPoints
                title='品牌体验'
                subTitle='Activities'
                style={{height: '575rpx'}}
                renderItem={(item, index) => <CustomActivitiesItem item={item} index={index} />}
              />
            </View>
          </SwiperItem>
          <SwiperItem>
            <Premium images={images} />
          </SwiperItem>
          <SwiperItem>
            <AboutUs />
          </SwiperItem>
        </Swiper>

        {
          current === 0 ? (
            <View className={styles.main_navigate} onClick={() => setCurrent((crt) => crt + 1)}>
              <ArrowDownFilled />
            </View>
          ) : null
        }
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

      <PopupAds ad={popupAds.current} onClose={popupAds.handleClose} />

      <UserAgreementUpdateDialog ref={agreementRef} />

      <SignToast setVisible={(type) => setVisible(type)} visible={visible} />
    </PageContainer>
  )
}

const Home = memo(Component)
export default Home
