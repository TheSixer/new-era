import Taro, { useRouter } from '@tarojs/taro'
import { useRef, FC, memo, useState } from 'react'
import styles from './index.module.less'
import { PageContainer, useToast } from '@wmeimob/taro-design'
import MMNavigation from '@wmeimob/taro-design/src/components/navigation'
import { Text, Image, View } from '@tarojs/components'
import MMFeild from '@wmeimob/taro-design/src/components/feild'
import MMForm from '@wmeimob/taro-design/src/components/form'
import { IMMFormInstance } from '@wmeimob/taro-design/src/components/form/const'
import { isMobilePhone } from '@wmeimob/utils/src/validate'
import { IFeildProps } from '@wmeimob/taro-design/src/components/feild/const'
import MMDatePicker from '@wmeimob/taro-picker/src/components/datePicker'
import { api } from '@wmeimob/taro-api'
import MMButton from '@wmeimob/taro-design/src/components/button'
import { useSuperLock } from '@wmeimob/utils/src/hooks/useSuperLock'
import MyRadio from './components/Radio'
import SignLogo from './images/sign_logo.png'
import dayjs from 'dayjs'
import { useGlobalStore } from '@wmeimob/taro-store'

const Component: FC = () => {
  const { params } = useRouter()
  const { user, getUserAction } = useGlobalStore()
  const [userInfo, setUser] = useState({
    mobile: user.mobile || '',
    nickName: user.nickName || '',
    gender: 0,
    province: []
  })
  const [showBirth, setShowBirth] = useState(false)
  const [birthday, setBirthday] = useState('')

  const formRef = useRef<IMMFormInstance>(null)

  const [toast] = useToast()

  const updateInputValue = (data) => setUser((pre) => ({ ...pre, ...data }))

  const [feildProps] = useState<Partial<IFeildProps>>({
    valueAlign: 'right',
    placeholder: '请输入',
    style: { padding: 0, color: '#fff', width: '100%', borderBottom: '1px solid #A7A9AC' },
    labelStyle: { width: 60, color: '#A7A9AC' }
  })

  const mobileFeildProps = {
    type:'mobile',
    disabled: !!user.mobile,
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
    type: 'custom',
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

  const cityFeildProps = {
    rules: [
      {
        required: true,
        validate(_r, value) {
          if (!value?.length) {
            toast?.message('请选择常住地')
            return Promise.reject(new Error('请选择常住地'))
          }
          return Promise.resolve(true)
        }
      }
    ]
  }

  const handleBirthChange = (birthday) => {
    setBirthday(dayjs(birthday).format('YYYY-MM-DD'))
  }

  /**
   * 点击登录
   *
   */
  const [handleSave, loading] = useSuperLock(async () => {
    if (!birthday) {
      toast?.message('请选择出生日期')
      return
    }
    const values = await formRef.current!.validateFields()
    const [province, city, area] = values.province
    await api['/wechat/web/member/register_PUT']({
      ...values,
      ...userInfo,
      province: province.text,
      provinceId: province.id,
      city: city.text,
      cityId: city.id,
      area: area.text,
      areaId: area.id,
      birthday
    })
    await getUserAction()

    if (params.redirectUrl) {
      Taro.redirectTo({ url: decodeURIComponent(params.redirectUrl) })
    } else {
      Taro.navigateBack()
    }
  })

  return (
    <PageContainer className={styles.authStyle} noPlace>
      <MMNavigation title='注册' type="Transparent" />

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
            value={userInfo.mobile}
            name='mobile'
            onChange={(mobile) => updateInputValue({ mobile })}
          />
          <MMFeild
            {...feildProps}
            {...nicknameFeildProps}
            className={styles.phone}
            type='custom'
            label='昵称'
            value={userInfo.nickName}
            name='nickName'
            onChange={(nickName) => updateInputValue({ nickName })}
          />
          <View className={styles.field_container} onClick={() => setShowBirth(true)}>
            <Text className={styles.field_label}>生日<Text style={{ color: 'red' }}>*</Text></Text>
            <Text className={styles.field__text}>{birthday || '请选择'}</Text>
          </View>
          <MMFeild.CityPicker
            {...feildProps}
            {...cityFeildProps}
            label='常住地'
            className={styles.phone}
            value={userInfo.province}
            placeholder="请选择"
            name='province'
            labelStyle={{ color: '#A7A9AC' }}
            onChange={(province) => updateInputValue({ province })}
          />
          <View className={styles.field_container}>
            <Text className={styles.field_label}>性别</Text>
            
            <MyRadio options={[{ label: '男', value: 1 }, { label: '女', value: 2 }]} value={userInfo.gender} onChange={(value) => updateInputValue({ gender: value })} />
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
        value={dayjs(birthday || new Date()).toDate()}
        maxDate={new Date()}
        onChange={handleBirthChange}
      />
      <View className='spacingIphone' />
    </PageContainer>
  )
}

const Auth = memo(Component)
export default Auth
