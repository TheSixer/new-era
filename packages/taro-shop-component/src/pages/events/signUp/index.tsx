import { FC, memo, useEffect, useRef, useState } from "react";
import styles from "./index.module.less";
import MMNavigation from "@wmeimob/taro-design/src/components/navigation";
import { ISignUpProps } from "./const";
import EventItem from "../prefecture/components/eventItem";
import { View, Text, Image, ScrollView } from "@tarojs/components";
import { isMobilePhone } from "@wmeimob/utils/src/validate";
import { MMFeild, MMForm, PageContainer, useToast } from '@wmeimob/taro-design'
import { IFeildProps } from "@wmeimob/taro-design/src/components/feild/const";
import { IMMFormInstance } from "@wmeimob/taro-design/src/components/form/const";
import { ISelectProps } from "@wmeimob/taro-design/src/components/feild/select/const";
import { SelectArrowFilled } from "../../../components/Icons";
import MMCheckbox from "@wmeimob/taro-design/src/components/checkbox";
import { routeNames } from "../../../routes";
import getParamsUrl from "@wmeimob/taro-utils/src/getParamsUrl";
import Taro, { useRouter } from "@tarojs/taro";
import { EAgreementType } from "@wmeimob/shop-data/src/enums/EAgreementType";
import CheckIcon from './images/check.png';
import CheckedIcon from './images/checked.png';
import MMButton from "@wmeimob/taro-design/src/components/button";
import { useSuperLock } from "@wmeimob/utils/src/hooks/useSuperLock";
import { ActivityOutputDto, api } from "@wmeimob/taro-api";
import LoadingView from "../../tabBar/home/components/loadingView";
import { useGlobalStore } from "@wmeimob/taro-store";

const Components:FC<ISignUpProps> = () => {
  const { params } = useRouter()
  const { user } = useGlobalStore()
  const { activityId, unifyId } = params
  const { loading: basicLoading, info, handleConfirm } = useBasicService(activityId)
  const [toast] = useToast()
  const [auth, setAuth] = useState(false)
  const [agree, setAgree] = useState(false)
  const [signInfo, setSignInfo] = useState({
    activityId,
    unifyId,
    cardType: '',
    cardNo: ''
  })

  const formRef = useRef<IMMFormInstance>(null)

  const updateInputValue = (data) => setSignInfo((pre) => ({ ...pre, ...data }))

  const [feildProps] = useState<Partial<IFeildProps>>({
    type: 'number',
    valueAlign: 'left',
    placeholder: '请输入',
    style: {
      paddingLeft: '30rpx',
      width: '100%',
      color: '#fff',
      border: '1px solid #767575',
      borderRadius: '20rpx',
      background: 'rgba(255,255,255,0.1)'
    }
  })

  const [selectProps] = useState<Partial<ISelectProps>>({
    valueAlign: 'left',
    placeholder: '请选择',
    style: {
      paddingLeft: '30rpx',
      width: '100%',
      color: '#fff',
      border: '1px solid #767575',
      borderRadius: '20rpx',
      background: 'rgba(255,255,255,0.1)'
    }
  })

  const nameFeildProps = {
    rules: [
      {
        required: true,
        message: '请输入真实姓名'
      }
    ]
  }

  const mobileFeildProps = {
    disabled: true,
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

  const identityFeildProps = {
    options: [
      { label: '身份证', value: 'ID_CARD' },
      { label: '港澳通行证', value: 'GANG_AO' },
      { label: '护照', value: 'HU_ZHAO' },
      { label: '台胞证', value: 'TAI_BAO' }
    ],
    rules: [
      {
        required: true,
        validate(_r, value) {
          if (!value) {
            toast?.message('请选择您的证件类型')
            return Promise.reject(new Error('请选择您的证件类型'))
          }
          return Promise.resolve(true)
        }
      }
    ]
  }

  const cardNoFeildProps = {
    rules: [
      {
        required: true,
        validate(_r, value) {
          if (!value) {
            toast?.message('请输入您的证件号码')
            return Promise.reject(new Error('请输入您的证件号码'))
          }
          return Promise.resolve(true)
        }
      }
    ]
  }

  /**
   * 点击登录
   *
   */
  const [handleSubmit, loading] = useSuperLock(async () => {
    const values = await formRef.current!.validateFields()
    if (!agree) {
      toast?.message('请同意用户协议')
      return
    }
    if (!auth) {
      toast?.message('请同意授权')
      return
    }
    await api['/wechat/activity/book_POST']({ ...values, activityId, unifyId})

    // // 同意用户协议
    // const { data: agreementTypeList = [] } = await api['/wechat/userAgreement/notAgreeAgreementTypeList_GET']()
    // if (agreementTypeList.length) {
    //   await api['/wechat/userAgreement/userAgreeRecord/agree_PUT']({ agreementTypeList })
    // }
    Taro.navigateBack()
  })

  if (basicLoading) {
    return <LoadingView />
  }

  return (
    <PageContainer className={styles.prefectureStyle} noPlace>
      <ScrollView scrollY enhanced showScrollbar={false} style={{ height: '100%' }}>
        <MMNavigation title='填写个人信息' type="Transparent" />

        <View className={styles.container}>
          {info && <EventItem data={info} single />}

          <MMForm ref={formRef}>
            <View className={styles.form_item}>
              <View className={styles.label}>*真实姓名</View>
              <MMFeild
                {...feildProps}
                {...nameFeildProps}
                className={styles.phone}
                type='custom'
                value={user.realName || user.nickName || ''}
                name='realName'
                onChange={(mobile) => updateInputValue({ mobile })}
              />
            </View>
            <View className={styles.form_item}>
              <View className={styles.label}>*手机号码<Text>(会员专享活动不支持更改手机号码)</Text></View>
              <MMFeild
                {...feildProps}
                {...mobileFeildProps}
                className={styles.phone}
                type='mobile'
                value={user.mobile || ''}
                name='mobile'
                onChange={(mobile) => updateInputValue({ mobile })}
              />
            </View>
            <View className={styles.form_item}>
              <View className={styles.label}>*证件类型</View>
              <MMFeild.Select
                {...selectProps}
                {...identityFeildProps}
                className={styles.phone}
                value={signInfo.cardType}
                name='cardType'
                onChange={(cardType) => updateInputValue({ cardType })}
              />

              <SelectArrowFilled className={styles.select_arrow} />
            </View>
            <View className={styles.form_item}>
              <View className={styles.label}>*证件号码<Text>(用于购买保险)</Text></View>
              <MMFeild
                {...feildProps}
                {...cardNoFeildProps}
                className={styles.phone}
                type='number'
                value={signInfo.cardNo}
                name='cardNo'
                onChange={(cardNo) => updateInputValue({ cardNo })}
              />
            </View>
            <View style={{ height: 10 }} />
            
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

            <MMCheckbox
              value={auth}
              onChange={setAuth}
              className={styles.checkbox}
              renderCheck={<Image style={{ width: '26rpx', height: '26rpx' }} src={CheckedIcon} />}
              renderUnCheck={<Image style={{ width: '26rpx', height: '26rpx' }} src={CheckIcon} />}
            >
              <View className={styles.aggreement} style={{ textDecoration: 'underline' }}>
                我同意NEW ERA在活动中拍摄照片和视频，并在授权平台上发布该照片和视频或进行其他商业性使用。
              </View>
            </MMCheckbox>
            <View style={{ height: 20 }} />
            <MMButton loading={loading} block onClick={handleSubmit} className={styles.form_submit}>
              提交信息
            </MMButton>
            <View style={{ height: 10 }} />
          </MMForm>

        </View>
      </ScrollView>
    </PageContainer>
  );
};

const SignUpPage = memo(Components);
export default SignUpPage;

function useBasicService(activityId) {
  const [loading, setLoading] = useState(false)
  const [info, setInfo] = useState<ActivityOutputDto | null>(null)

  async function getEventInfo(id: string) {
    setLoading(true);
    const { data = {} } = await api['/wechat/activity/detail/{id}_GET'](id)
    setLoading(false);
    setInfo(data)
  }

  useEffect(() => {
    activityId && getEventInfo(activityId)
  }, [activityId])

  function handleConfirm(unifyId: number) {
    Taro.navigateTo({
      url: getParamsUrl(routeNames.eventsSignUp,
        {
          activityId: info?.id,
          unifyId
        })
    })
  }

  return {
    loading,
    info,
    handleConfirm
  }
}