import Taro, { useRouter } from '@tarojs/taro'
import useGlobalStore from '../../globalStore'
import useNewcomer from '../../hooks/user/useNewcomer'
import { api } from '@wmeimob/taro-api'
import { BaseEventOrig, Button, ButtonProps, Image, Text, View } from '@tarojs/components'
import { PageContainer, useToast } from '@wmeimob/taro-design'
import MMButton from '@wmeimob/taro-design/src/components/button'
import MMCheckbox from '@wmeimob/taro-design/src/components/checkbox'
import MMNavigation from '@wmeimob/taro-design/src/components/navigation'
import { FC, memo, useState } from 'react'
import styles from './index.module.less'
import { routeNames } from '../../routes'
import { EAgreementType } from '../mine/userAgreement/const'
import getParamsUrl from '@wmeimob/taro-utils/src/getParamsUrl'
import LogoImg from './images/logo.png';
import CheckIcon from './images/check.png';
import CheckedIcon from './images/checked.png';

const Component: FC = () => {
  const { appInfo, getUserAction } = useGlobalStore()

  const { receiveNewcomerCoupon } = useNewcomer()
  const { params } = useRouter()

  const [agree, setAgree] = useState(false)

  const [toast] = useToast()

  // 保存手机号
  const handleGetPhoneNumber = async (data: BaseEventOrig<ButtonProps.onGetPhoneNumberEventDetail>) => {
    const { detail } = data

    if (!detail.code && /user deny/.test(detail.errMsg)) {
      return toast?.message('用户拒绝')
    }

    toast?.loading()
    try {
      await onGetPhoneNumber(detail.code!)
    } catch (error) {}
    toast?.hideLoading()
  }

  // 登录点击校验
  const handleClickLogin = () => {
    !agree && Taro.showModal({
      content: '请先阅读并同意《用户协议》《隐私条款》',
      confirmColor: '#BC9B6A',
      success: (res) => {
        if (res.confirm) {
          setAgree(true)
        }
      }
    })
  }

  // 处理获取手机号逻辑
  const onGetPhoneNumber = async (param) => {
    const { data } = await api['/wechat/auth/decodePhone_POST']({ code: param })

    const { code } = await Taro.login()
    const res: any = await api['/wechat/auth/token_GET']({ mobile: data?.phoneNumber, code, type: 0 }, { skipInterceptor: true })
    Taro.setStorageSync('token', res.data.data)

    // try {
    //   // 领取失败则直接跳过，不阻断授权流程
    //   await receiveNewcomerCoupon()
    // } catch (error) {}

    // 同意用户协议
    // const { data: agreementTypeList = [] } = await api['/wechat/userAgreement/notAgreeAgreementTypeList_GET']()
    // if (agreementTypeList.length) {
    //   await api['/wechat/userAgreement/userAgreeRecord/agree_PUT']({ agreementTypeList })
    // }
    // 直接获取用户信息
    const userData = await getUserAction()

    if (!userData.registerIs) {
      Taro.redirectTo({ url: decodeURIComponent(routeNames.webAuth) })
    } else if (params.redirectUrl && params.isTabber === 'true') {
      Taro.switchTab({ url: decodeURIComponent(params.redirectUrl) })
    } else if (params.redirectUrl) {
      Taro.redirectTo({ url: decodeURIComponent(params.redirectUrl) })
    } else {
      Taro.navigateBack()
    }
  }

  return (
    <PageContainer className={styles.authStyle} noPlace>
      <MMNavigation contentStyle={{ color: '#fff', background: 'rgba(0,0,0,0)' }} title="微信授权" />

      <Image className={styles.logo} src={LogoImg} />

      <View className={styles.title}>欢迎登录New Era会员中心</View>
      <View className={styles.subtitle}>请授权手机号登录</View>

      <MMButton className={styles.buttonWrapper} onClick={handleClickLogin}>
        <Text>手机号快捷登录</Text>
        {agree && (
          <Button openType="getPhoneNumber" onGetPhoneNumber={handleGetPhoneNumber} className={styles.button}>
            1
          </Button>
        )}
      </MMButton>

      {/* <View style={{ flex: 1 }} /> */}
      <MMCheckbox
        value={agree}
        onChange={setAgree}
        renderCheck={<Image style={{ width: '26rpx', height: '26rpx' }} src={CheckedIcon} />}
        renderUnCheck={<Image style={{ width: '26rpx', height: '26rpx' }} src={CheckIcon} />}
      >
        <View className={styles.aggreement}>
          我已阅读并同意
          <Text
            className={styles.aggreement_text}
            onClick={(ev) => {
              ev.stopPropagation()
              ev.preventDefault()
              Taro.navigateTo({ url: routeNames.mineUserAgreement })
            }}
          >
            《用户协议》
          </Text>
          及
          <Text
            className={styles.aggreement_text}
            onClick={(ev) => {
              ev.stopPropagation()
              ev.preventDefault()
              Taro.navigateTo({ url: getParamsUrl(routeNames.mineUserAgreement, { type: EAgreementType.Privacy }) })
            }}
          >
            《隐私政策》
          </Text>
        </View>
      </MMCheckbox>

      <View className="spacingIphone" />
    </PageContainer>
  )
}

const Auth = memo(Component)
export default Auth
