import { FC, memo, useRef, useState } from "react";
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
import Taro from "@tarojs/taro";
import { EAgreementType } from "@wmeimob/shop-data/src/enums/EAgreementType";
import CheckIcon from './images/check.png';
import CheckedIcon from './images/checked.png';
import MMButton from "@wmeimob/taro-design/src/components/button";
import { useSuperLock } from "@wmeimob/utils/src/hooks/useSuperLock";
import { api } from "@wmeimob/taro-api";

const Components:FC<ISignUpProps> = () => {
  const [toast] = useToast()
  const [agree, setAgree] = useState(false)
  const [phoneInfo, setPhoneInfo] = useState({
    realName: '',
    mobile: ''
  })

  const formRef = useRef<IMMFormInstance>(null)

  const updateInputValue = (data) => setPhoneInfo((pre) => ({ ...pre, ...data }))

  const [feildProps] = useState<Partial<IFeildProps>>({
    type: 'number',
    valueAlign: 'left',
    placeholder: '请输入',
    style: {
      paddingLeft: '30rpx',
      width: '100%',
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
      border: '1px solid #767575',
      borderRadius: '20rpx',
      background: 'rgba(255,255,255,0.1)'
    }
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

  const identityFeildProps = {
    options: [
      { label: '身份证', value: '身份证' },
      { label: '护照', value: '护照' },
      { label: '其他', value: '其他' }
    ],
    rules: [
      {
        required: true,
        message: '请选择您的证件类型'
      }
    ]
  }

  /**
   * 点击登录
   *
   */
  const [handleSubmit, loading] = useSuperLock(async () => {
    const values = await formRef.current!.validateFields()
    const { data } = await api['/wechat/auth/token_GET']({ ...values, type: 1 })
    Taro.setStorageSync('token', data)

    // 同意用户协议
    const { data: agreementTypeList = [] } = await api['/wechat/userAgreement/notAgreeAgreementTypeList_GET']()
    if (agreementTypeList.length) {
      await api['/wechat/userAgreement/userAgreeRecord/agree_PUT']({ agreementTypeList })
    }

    try {
      // 领取失败则直接跳过，不阻断授权流程
      // await receiveNewcomerCoupon()
    } catch (error) {
    }

    // if (params.redirectUrl) {
    //   Taro.redirectTo({ url: decodeURIComponent(params.redirectUrl) })
    // } else {
    //   Taro.navigateBack()
    // }
  })

  return (
    <PageContainer className={styles.prefectureStyle} noPlace>
      <ScrollView scrollY enhanced showScrollbar={false} style={{ height: '100%' }}>
        <MMNavigation title='填写个人信息' type="Transparent" />

        <View className={styles.container}>
          <EventItem single />

          <MMForm ref={formRef}>
            <View className={styles.form_item}>
              <View className={styles.label}>*真实姓名</View>
              <MMFeild
                {...feildProps}
                {...mobileFeildProps}
                className={styles.phone}
                type='custom'
                value={phoneInfo.mobile}
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
                value={phoneInfo.mobile}
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
                value={phoneInfo.mobile}
                name='mobile'
                onChange={(mobile) => updateInputValue({ mobile })}
              />
            </View>
            <View className={styles.form_item}>
              <View className={styles.label}>*证件号码<Text>(用于购买保险)</Text></View>
              <MMFeild
                {...feildProps}
                {...mobileFeildProps}
                className={styles.phone}
                type='custom'
                value={phoneInfo.mobile}
                name='mobile'
                onChange={(mobile) => updateInputValue({ mobile })}
              />

              <SelectArrowFilled className={styles.select_arrow} />
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
              value={agree}
              onChange={setAgree}
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