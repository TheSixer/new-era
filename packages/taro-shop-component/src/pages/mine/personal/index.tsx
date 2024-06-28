import Taro, { useRouter } from '@tarojs/taro'
import { useRef, FC, memo, useState, useMemo, ReactNode, useEffect } from 'react'
import styles from './index.module.less'
import { PageContainer, useToast } from '@wmeimob/taro-design'
import MMNavigation from '@wmeimob/taro-design/src/components/navigation'
import { Text, View, Button } from '@tarojs/components'
import MMFeild from '@wmeimob/taro-design/src/components/feild'
import MMForm from '@wmeimob/taro-design/src/components/form'
import { IMMFormInstance } from '@wmeimob/taro-design/src/components/form/const'
import { isMobilePhone } from '@wmeimob/utils/src/validate'
import { IFeildProps } from '@wmeimob/taro-design/src/components/feild/const'
import MMDatePicker from '@wmeimob/taro-picker/src/components/datePicker'
import { api } from '@wmeimob/taro-api'
import MMButton from '@wmeimob/taro-design/src/components/button'
import { useSuperLock } from '@wmeimob/utils/src/hooks/useSuperLock'
import dayjs from 'dayjs'
import { useGlobalStore } from '@wmeimob/taro-store'
import { IMMAction } from '@wmeimob/taro-design/src/components/action-sheet/const'
import { isH5 } from '../../../config'
import MMActionSheet from '@wmeimob/taro-design/src/components/action-sheet'
import { upload } from '../../../components/tencent-cloud'
import { assembleResizeUrl } from '@wmeimob/tencent-cloud'
import MMAvatar from '@wmeimob/taro-design/src/components/avatar'
import MyRadio from './components/Radio'
import { EditFilled } from '../../../components/Icons'

const Component: FC = () => {
  const { user, getUserAction } = useGlobalStore()
  const {
    avatarUrl,
    canIUseChooseAvatar,
    showActionSheet,
    actions,
    setShowActionSheet,
    handleSelect,
    handleChooseAvatar
  } = useChangeAvatar()

  const [userInfo, setUser] = useState({
    avatarUrl: user.headImg,
    mobile: user.mobile || '',
    nickName: user.nickName || '',
    gender: Number(user.gender) || 0,
    province: user?.provinceId ? [{
      id: user.provinceId || '',
      text: user.province || ''
    },
    {
      id: user.cityId || '',
      text: user.city || ''
    },
    {
      id: user.areaId || '',
      text: user.area || '' 
    }] : []
  })

  const [changed, setChanged] = useState(false)
  const [showBirth, setShowBirth] = useState(false)
  const [birthday, setBirthday] = useState(user.birthday || '')

  const formRef = useRef<IMMFormInstance>(null)

  const [toast] = useToast()

  const updateInputValue = (data) => {
    setUser((pre) => ({ ...pre, ...data }))
    setChanged(true)
  }

  useEffect(() => {
    avatarUrl && updateInputValue({ avatarUrl })
  }, [avatarUrl])

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
    setChanged(true)
    setBirthday(dayjs(birthday).format('YYYY-MM-DD'))
  }

  /**
   * 点击修改
   *
   */
  const [handleSave, loading] = useSuperLock(async () => {
    if (!birthday) {
      toast?.message('请选择出生日期')
      return
    }
    const values = await formRef.current!.validateFields()
    const [province, city, area] = values.province
    Taro.showLoading({ title: '', mask: true })
    try {
      await api['/wechat/web/member/saveUserInfo_PUT']({
        ...values,
        ...userInfo,
        province: province.text,
        provinceId: province.id,
        city: city.text,
        cityId: city.id,
        area: area?.text || city.text,
        areaId: area?.id,
        birthday
      })
      await getUserAction()
      toast?.success('修改成功')
      setChanged(false)
    } catch (error) {
    }
    Taro.hideLoading()
  })

  const renderChooseAvatar = (avatar: ReactNode) => {
    return canIUseChooseAvatar ? (
      <Button className={styles.chooseAvatar} open-type='chooseAvatar' onChooseAvatar={handleChooseAvatar}>
        {avatar}
      </Button>
    ) : avatar
  }

  return (
    <PageContainer className={styles.authStyle} noPlace>
      <MMNavigation title='个人信息' type="Transparent" />

      <View className={styles.form_container}>
        {renderChooseAvatar(
          <View className={styles.avatar_container}>
            <MMAvatar src={assembleResizeUrl(userInfo.avatarUrl || user.avatarUrl, { width: 50 })} size={50} shape='circle' />
            <View className={styles.avatar_edit}>
              <Text className={styles.avatar_name}>修改头像</Text>
              <EditFilled />
            </View>
          </View>
        )}

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
          <View className={styles.field_container} onClick={() => !user?.birthdayModifiedIs && setShowBirth(true)}>
            <Text className={styles.field_label}>生日（仅可修改一次）</Text>
            <Text className={styles.field__text} style={{ color: !user?.birthdayModifiedIs ? '#fff' : '#A7A9AC' }}>{birthday || '请选择'}</Text>
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
      {
        changed ? (
          <MMButton loading={loading} disabled={loading} block onClick={handleSave} className={styles.form_submit}>
            修改
          </MMButton>
        ) : null
      }
      <View style={{ height: '30px' }} />

      <MMActionSheet visible={showActionSheet} onClosed={() => setShowActionSheet(false)} onSelect={handleSelect}
               actions={actions} />

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

/** 更新头像hook */
function useChangeAvatar() {
  const [avatarUrl, setAvatarUrl] = useState('');
  const [showActionSheet, setShowActionSheet] = useState(false)
  const [actions] = useState<IMMAction[]>([
    { id: 'camera', text: '拍照' },
    { id: 'album', text: '从相机中选择' }
  ])

  // 自 2022 年 10 月 25 日 24 时后用户的昵称、头像获取方式调整
  // https://developers.weixin.qq.com/community/develop/doc/00022c683e8a80b29bed2142b56c01?blockType=1
  const canIUseChooseAvatar = useMemo(() => {
    // h5不支持canIUse api
    if (isH5) return false
    return Taro.canIUse('button.open-type.chooseAvatar')
  }, [])

  const handleSelect = async (action: IMMAction) => {
    setShowActionSheet(false)
    const { tempFilePaths } = await Taro.chooseImage({ count: 1, sourceType: [action.id as any] })
    await uploadAvatar(tempFilePaths)
  }

  const handleChooseAvatar = async (event: { detail: { avatarUrl: string } }) => {
    await uploadAvatar([event.detail.avatarUrl])
  }

  const uploadAvatar = async (imgUrls: string[]) => {
    Taro.showLoading({ title: '', mask: true })
    try {
      const [avatarUrl] = await upload(imgUrls)
      setAvatarUrl(avatarUrl);
    } catch (error) {
    }
    Taro.hideLoading()
  }

  return {
    avatarUrl,
    canIUseChooseAvatar,
    showActionSheet,
    setShowActionSheet,
    actions,
    handleSelect,
    handleChooseAvatar
  }
}
