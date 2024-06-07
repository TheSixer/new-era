import { View } from '@tarojs/components'
import { MMForm, MMFeild } from '@wmeimob/taro-design'
import { IFeildProps } from '@wmeimob/taro-design/src/components/feild/const'
import { IMMFormInstance } from '@wmeimob/taro-design/src/components/form/const'
import { isMobilePhone } from '@wmeimob/utils/src/validate'
import { forwardRef, memo, useState } from 'react'
import MobileCaptcha from '../../../../../components/mobileCaptcha'

interface IChangePhoneProps {
  /** 当前手机号 */
  currentPhone: string

  /** 点击获取验证码 */
  onGetCode(phoneNumver: string): Promise<void>
}

/**
 * 修改手机号组件
 * @param props
 * @returns
 */
const Component = forwardRef<IMMFormInstance, IChangePhoneProps>((props, ref) => {
  const { currentPhone = '' } = props

  const [phoneInfo, setPhoneInfo] = useState({
    currentPhone,
    currentCode: '',
    newPhone: '',
    newCode: ''
  })

  const [feildProps] = useState<Partial<IFeildProps>>({
    label: '验证码',
    type: 'number',
    valueAlign: 'left',
    labelStyle: { width: 90 }
  })

  const [mobileFeildProps] = useState<Partial<IFeildProps>>({
    rules: [
      {
        required: true,
        validate(_r, value) {
          if (!isMobilePhone(value)) {
            return Promise.reject(new Error('请输入正确的手机号'))
          }
          return Promise.resolve(true)
        }
      }
    ]
  })

  const [codeFeildProps] = useState<Partial<IFeildProps>>({
    rules: [
      {
        required: true,
        validate(_r, value) {
          if (value.length !== 4) {
            return Promise.reject(new Error('请输入4位验证码'))
          }
          return Promise.resolve(true)
        }
      }
    ]
  })

  const updateInputValue = (data: Partial<typeof phoneInfo>) => setPhoneInfo((pre) => ({ ...pre, ...data }))

  return (
    <MMForm ref={ref}>
      <MMFeild {...feildProps} {...mobileFeildProps} name="currentPhone" label="当前手机号" readonly value={phoneInfo.currentPhone} />

      <MMFeild
        {...feildProps}
        {...codeFeildProps}
        value={phoneInfo.currentCode}
        name="currentCode"
        onChange={(currentCode) => updateInputValue({ currentCode })}
        suffix={<MobileCaptcha beforeCountDown={() => props.onGetCode(phoneInfo.currentPhone)} />}
      />

      <View style={{ height: 10 }} />

      <MMFeild
        {...feildProps}
        {...mobileFeildProps}
        type="mobile"
        label="新手机号"
        value={phoneInfo.newPhone}
        name="newPhone"
        onChange={(newPhone) => updateInputValue({ newPhone })}
      />

      {/* <MMFeild
            {...feildProps}
            {...codeFeildProps}
            value={phoneInfo.newCode}
            name="newCode"
            onChange={newCode => updateInputValue({ newCode })}
            suffix={<MobileCaptcha beforeCountDown={() => beforeCountDown(phoneInfo.newPhone)} />}
          /> */}
    </MMForm>
  )
})

const ChangePhone = memo(Component)
export default ChangePhone
