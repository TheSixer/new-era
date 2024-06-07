import Taro, { useRouter } from '@tarojs/taro'
import { useRef, FC, memo, useState } from 'react'
import useGlobalStore from '../../globalStore'
import styles from './index.module.less'
import { PageContainer, useToast } from '@wmeimob/taro-design'
import MMNavigation from '@wmeimob/taro-design/src/components/navigation'
import { Text, Image, View } from '@tarojs/components'
import MMCheckbox from '@wmeimob/taro-design/src/components/checkbox'
import { routeNames } from '../../routes'
import MMFeild from '@wmeimob/taro-design/src/components/feild'
import MMForm from '@wmeimob/taro-design/src/components/form'
import { IMMFormInstance } from '@wmeimob/taro-design/src/components/form/const'
import { isMobilePhone } from '@wmeimob/utils/src/validate'
import { IFeildProps } from '@wmeimob/taro-design/src/components/feild/const'
import MMDatePicker from '@wmeimob/taro-picker/src/components/datePicker'
import { api } from '@wmeimob/taro-api'
import MMButton from '@wmeimob/taro-design/src/components/button'
import { useSuperLock } from '@wmeimob/utils/src/hooks/useSuperLock'
import useNewcomer from '../../hooks/user/useNewcomer'
import getParamsUrl from '@wmeimob/taro-utils/src/getParamsUrl'
import MyRadio from './components/Radio'
import SignLogo from './images/sign_logo.png'
import dayjs from 'dayjs'

const Component: FC = () => {
  const { appInfo, getUserAction } = useGlobalStore()
  const { params } = useRouter()
  const [agree, setAgree] = useState(false)
  const [phoneInfo, setPhoneInfo] = useState({
    mobile: '',
    nickname: '',
    gender: 1,
    verificationCode: '',
    addArr: []
  })
  const [showBirth, setShowBirth] = useState(false)
  const [birthday, setBirthday] = useState('')

  const { receiveNewcomerCoupon } = useNewcomer()
  const formRef = useRef<IMMFormInstance>(null)

  const [toast] = useToast()
  const handleClickLogin = () => {
    if (!agree) {
      toast?.message('请勾选同意用户协议和隐私协议')
      return false
    }
    return true
  }
  const updateInputValue = (data) => setPhoneInfo((pre) => ({ ...pre, ...data }))

  const [feildProps] = useState<Partial<IFeildProps>>({
    type: 'number',
    valueAlign: 'right',
    placeholder: '请输入',
    style: { padding: 0, width: '100%', borderBottom: '1px solid #A7A9AC' },
    labelStyle: { width: 60, color: '#A7A9AC' },
    fieldProps: { maxlength: 6, placeholder: '请输入验证码'}
  })

  const mobileFeildProps = {
    rules: [
      {
        required: true,
        validate(_r, value) {
          if (!isMobilePhone(value)) {
            toast?.message('请输入正确的手机号')
            return Promise.reject(new Error('请输入正确的手机号'))
          }
          return Promise.resolve(true)
        }
      }
    ]
  }

  const nicknameFeildProps = {
    rules: [
      {
        required: true,
        validate(_r, value) {
          if (!value) {
            toast?.message('请输入正确的昵称')
            return Promise.reject(new Error('请输入正确的昵称'))
          }
          return Promise.resolve(true)
        }
      }
    ]
  }

  const [cityFeildProps] = useState<Partial<IFeildProps>>({
    rules: [
      {
        required: true,
        message: '请选择城市'
      }
    ]
  })

  const handleBirthChange = () => {
    setBirthday(dayjs(birthday).format('YYYY-MM-DD'))
  }

  /**
   * 点击登录
   *
   */
  const [handleSave, loading] = useSuperLock(async () => {
    if (!handleClickLogin()) {
      return
    }

    const values = await formRef.current!.validateFields()
    const { data } = await api['/wechat/auth/token_GET']({ ...values, type: 1 })
    Taro.setStorageSync('token', data)

    // 同意用户协议
    const { data: agreementTypeList = [] } = await api['/wechat/userAgreement/notAgreeAgreementTypeList_GET']()
    if (agreementTypeList.length) {
      await api['/wechat/userAgreement/userAgreeRecord/agree_PUT']({ agreementTypeList })
    }
    await getUserAction()

    try {
      // 领取失败则直接跳过，不阻断授权流程
      await receiveNewcomerCoupon()
    } catch (error) {
    }

    if (params.redirectUrl) {
      Taro.redirectTo({ url: decodeURIComponent(params.redirectUrl) })
    } else {
      Taro.navigateBack()
    }
  })

  function handleBeforeNavBack() {
    Taro.redirectTo({
      url: routeNames.tabBarHome
    })

    return false
  }

  return (
    <PageContainer className={styles.authStyle} noPlace>
      <MMNavigation title='注册' beforeNavBack={handleBeforeNavBack} />

      <View className={styles.sign_header}>
        <Image src={SignLogo} className={styles.avatar_img} />
        <View className={styles.sign_header__txt}>欢迎注册您的账号</View>
      </View>

      <View className={styles.form_container}>
        <MMForm ref={formRef}>
          <MMFeild
            {...feildProps}
            {...mobileFeildProps}
            className={styles.phone}
            type='mobile'
            label='手机号'
            value={phoneInfo.mobile}
            name='mobile'
            onChange={(mobile) => updateInputValue({ mobile })}
          />
          <MMFeild
            {...feildProps}
            {...nicknameFeildProps}
            className={styles.phone}
            type='custom'
            label='昵称'
            value={phoneInfo.nickname}
            name='nickname'
            onChange={(mobile) => updateInputValue({ mobile })}
          />
          <View className={styles.field_container} onClick={() => setShowBirth(true)}>
            <Text className={styles.field_label}>生日</Text>
            <Text className={styles.field__text}>请选择</Text>
          </View>
          <MMFeild.CityPicker
            {...feildProps}
            {...cityFeildProps}
            label='常住地'
            className={styles.phone}
            value={phoneInfo.addArr}
            placeholder="请选择"
            name='verificationCode'
            labelStyle={{ color: '#A7A9AC' }}
            onChange={(verificationCode) => updateInputValue({ verificationCode })}
          />
          <View className={styles.field_container}>
            <Text className={styles.field_label}>性别</Text>
            
            <MyRadio options={[{ label: '男', value: 1 }, { label: '女', value: 2 }]} value={phoneInfo.gender} onChange={(value) => updateInputValue({ gender: value })} />
          </View>
          <View style={{ height: 10 }} />
        </MMForm>
      </View>
      <View style={{ flex: 1 }} />
      <MMButton loading={loading} block onClick={handleSave} className={styles.form_submit}>
        登录
      </MMButton>
      <View style={{ height: '30px' }} />

      <MMDatePicker
        visible={showBirth}
        onVisibleChange={setShowBirth}
        value={dayjs(birthday).toDate()}
        maxDate={new Date()}
        onChange={handleBirthChange}
      />
      <View className='spacingIphone' />
    </PageContainer>
  )
}

const Auth = memo(Component)
export default Auth
