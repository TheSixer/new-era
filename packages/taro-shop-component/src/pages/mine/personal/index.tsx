import Taro, { useDidShow } from '@tarojs/taro'
import { FC, memo, ReactNode, useMemo, useState } from 'react'
import { Button, View } from '@tarojs/components'
import styles from './index.module.less'
import { IPersonalProps } from './const'
import MMNavigation from '@wmeimob/taro-design/src/components/navigation'
import { routeNames } from '../../../routes'
import useGlobalStore from '../../../globalStore'
import MMCell from '@wmeimob/taro-design/src/components/cell'
import MMActionSheet from '@wmeimob/taro-design/src/components/action-sheet'
import { IMMAction } from '@wmeimob/taro-design/src/components/action-sheet/const'
import { upload } from '../../../components/tencent-cloud'
import { api, UserAddressOutPutDto } from '@wmeimob/taro-api'
import { EGender, MGender } from '@wmeimob/shop-data/src/enums/customer/EGender'
import { PageContainer, useToast } from '@wmeimob/taro-design'
import MMDatePicker from '@wmeimob/taro-picker/src/components/datePicker'
import dayjs from 'dayjs'
import MMAvatar from '@wmeimob/taro-design/src/components/avatar'
import { assembleResizeUrl } from '@wmeimob/tencent-cloud'
import { EAlterType } from '../alter/const'
import { isH5 } from '../../../config'
import getParamsUrl from '@wmeimob/taro-utils/src/getParamsUrl'

const Component: FC<IPersonalProps> = () => {
  const { user, getUserAction } = useGlobalStore()

  const {
    canIUseChooseAvatar,
    showActionSheet,
    actions,
    setShowActionSheet,
    handleSelect,
    handleChooseAvatar
  } = useChangeAvatar()

  const {
    hasGender,
    showGender,
    setShowGender,
    actions: genderActions,
    handleGenderCellClick,
    handleGenderSelect
  } = useChangeGender()

  const { showBirth, setShowBirth, handleBirthChange } = useBirthday()

  // const [addressInfo] = useUserDefaultAddress()

  useDidShow(() => {
    getUserAction()
  })

  const renderChooseAvatar = (avatar: ReactNode) => {
    return canIUseChooseAvatar ? (
      <Button className={styles.chooseAvatar} open-type='chooseAvatar' onChooseAvatar={handleChooseAvatar}>
        <MMCell title='头像' arrow border>
          {avatar}
        </MMCell>
      </Button>
    ) : (
      <MMCell title='头像' arrow border onClick={() => setShowActionSheet(true)}>
        {avatar}
      </MMCell>
    )
  }

  return (
    <PageContainer className={styles.personalStyle}>
      <MMNavigation title='个人信息' />

      <View className={styles.box}>
        {renderChooseAvatar(<MMAvatar src={assembleResizeUrl(user.headImg, { width: 36 })} size={36} shape='circle' />)}

        <MMCell title='昵称' size='large' arrow border onClick={() => Taro.navigateTo({
          url: getParamsUrl(routeNames.mineAlter,
            { type: EAlterType.Name })
        })}>
          <View className={styles.rightTxt}> {user.nickName || ''}</View>
        </MMCell>

        <MMCell
          title='手机号'
          size='large'
          border
          // arrow
          // onClick={() => Taro.navigateTo({ url: routeNames.mineAlter, params: { type: EAlterType.Phone } })}
        >
          <View className={styles.rightTxt}> {user.mobile || ''}</View>
        </MMCell>

        <MMCell
          title='生日'
          size='large'
          border
          arrow={!user.birthday}
          onClick={() => {
            if (!user.birthday) {
              setShowBirth(true)
            }
          }}
        >
          <View className={styles.rightTxt}> {user.birthday || '生日仅可修改一次'}</View>
        </MMCell>

        {/* <MMCell title="性别" style={{ marginTop: '10px' }} valueAlign="right" size="large" arrow={!hasGender} onClick={handleGenderCellClick}>
          <View className={styles.rightTxt}> {MGender[user.gender as any] || '请选择'}</View>
        </MMCell> */}

        <MMCell title='收货地址' style={{ marginTop: '10px' }} arrow size='large'
                onClick={() => Taro.navigateTo({ url: routeNames.mineAddressAddressList })}>
          {/* {addressInfo} */}
        </MMCell>
      </View>

      <MMActionSheet visible={showActionSheet} onClosed={() => setShowActionSheet(false)} onSelect={handleSelect}
                     actions={actions} />

      {/* 性别弹窗 */}
      <MMActionSheet
        visible={showGender}
        title={<View style={{ fontSize: 12, fontWeight: 400, color: '#999999' }}>*选择后不可更改</View>}
        onClosed={() => setShowGender(false)}
        onSelect={handleGenderSelect}
        actions={genderActions}
      />

      <MMDatePicker
        visible={showBirth}
        onVisibleChange={setShowBirth}
        value={dayjs(user.birthday).toDate()}
        maxDate={new Date()}
        onChange={handleBirthChange}
      />
    </PageContainer>
  )
}

const Personal = memo(Component)
export default Personal

/** 更新头像hook */
function useChangeAvatar() {
  const { getUserAction } = useGlobalStore()
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
      await api['/wechat/web/member/saveUserInfo_PUT']({ avatarUrl })
      await getUserAction()
    } catch (error) {
    }
    Taro.hideLoading()
  }

  return {
    canIUseChooseAvatar,
    showActionSheet,
    setShowActionSheet,
    actions,
    handleSelect,
    handleChooseAvatar
  }
}

/** 更新性别hook */
function useChangeGender() {
  const { user, getUserAction } = useGlobalStore()
  const [toast] = useToast()

  const [showGender, setShowGender] = useState(false)
  const [actions] = useState<IMMAction[]>([EGender.Male, EGender.Female].map((it) => ({
    id: `${it}`,
    text: MGender[it]
  })))

  const hasGender = !!user.gender // 是否设置了性别

  // 点击性别cell
  const handleGenderCellClick = () => {
    if (!hasGender) {
      setShowGender(true)
    }
  }

  const handleGenderSelect = async (action: IMMAction) => {
    toast?.loading({ mask: true })
    setShowGender(false)
    try {
      await api['/wechat/web/member/saveUserInfo_PUT']({ gender: action.id })
      await getUserAction()
    } catch (error) {
    }
    toast?.hideLoading()
  }

  return {
    hasGender,

    showGender,
    setShowGender,
    actions,
    handleGenderCellClick,
    handleGenderSelect
  }
}

function useBirthday() {
  const [toast] = useToast()
  const { getUserAction } = useGlobalStore()
  const [showBirth, setShowBirth] = useState(false)

  const handleBirthChange = async (ev: Date) => {
    toast?.loading({ mask: true })
    setShowBirth(false)

    try {
      await api['/wechat/web/member/saveUserInfo_PUT']({ birthday: dayjs(ev).format('YYYY-MM-DD') })
      await getUserAction()
    } catch (error) {
    }
    toast?.hideLoading()
  }

  return {
    showBirth,
    setShowBirth,
    handleBirthChange
  }
}

/**
 * 是否显示默认地址
 * @returns
 */
function useUserDefaultAddress() {
  const [address, setAddress] = useState<UserAddressOutPutDto>()

  const addressInfo = useMemo(() => {
    if (address) {
      const { province = '', district = '', city = '', address: add = '' } = address
      return province + city + district + add
    }
    return undefined
  }, [address])

  async function getDeaultAddress() {
    const { data } = await api['/wechat/mall/address/getDefault_GET']()
    setAddress(data)
  }

  useDidShow(() => {
    getDeaultAddress()
  })

  return [addressInfo]
}
