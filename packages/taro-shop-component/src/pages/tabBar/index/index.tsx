import { ScrollView, View } from '@tarojs/components'
import MMNavigation from '@wmeimob/taro-design/src/components/navigation'
import useGradientNav from '@wmeimob/taro-design/src/hooks/useGradientNav'
import { memo, useEffect, useRef, useState, FC } from 'react'
import PageModules from '../../../components/pageModules'
import useDecoration from '../../../hooks/useDecoration'
import useNewcomer from '../../../hooks/user/useNewcomer'
import { PageContainer } from '@wmeimob/taro-design'
import PopupAds from './components/popupAds'
import usePopupAds from './hooks/usePopupAds'
import styles from './index.module.less'
import useAutoSign from '@wmeimob-modules/task-taro/src/hooks/useAutoSign'
import { isNoStatusBar, systemConfig } from '../../../config'
import TabBar from '../../../custom-tab-bar/tabBar'
import { useGlobalStore } from '@wmeimob/taro-store'
import UserAgreementUpdateDialog, { IUserAgreementUpdateDialogRef } from '../../../components/userAgreementUpdateDialog'
import SignToast from './components/signToast'
import { useAtomValue } from 'jotai'
import { frontendSignStatusAtom } from '@wmeimob-modules/task-taro/src/store'
import classNames from 'classnames'

interface IHomeProps {}

/**
 * 装修首页
 *
 * 配置化首页小程序渲染代码。与自定义装修后台管理页面配合。开箱即用
 * @param {*} props
 * @return {*}
 */
const Component: FC<IHomeProps> = () => {
  /**
   * INFO: 这里需要根据接口获取装修页面的配置信息
   * 你也可以参照example.json的格式脱离后端自行配置
   * 也可以只用使用pageModules里面的组件
   */
  const { modules, title } = useDecoration('0')

  const { user } = useGlobalStore()

  const { contentStyle, hanelScroll } = useGradientNav({
    selector: '#selector',
    style: {
      background: [255, 65, 59]
    }
  })

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
        <ScrollView scrollY enhanced showScrollbar={false} style={{ height: '100%' }} onScroll={hanelScroll}>
          <View id="selector" className={classNames(styles.bgView, isNoStatusBar && styles.bgView_h5)}>
            {/* <MMNavigation title={title} renderLeft={false} contentStyle={{ ...contentStyle, color: '#ffffff' }} shadow={false} /> */}

            <PageModules data={modules} />
          </View>
        </ScrollView>
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
