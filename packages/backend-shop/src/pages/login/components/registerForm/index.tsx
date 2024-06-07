import { FC, memo, useState } from 'react'
import { Button, Form, Input, message, Statistic } from 'antd'
import styles from './index.module.less'
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'
import { useForm } from 'antd/lib/form/Form'
import { useHistory } from 'react-router-dom'
import { api } from '~/request'
import { ECodeScene } from '~/enums/ECodeScene'
import { IRegisterFormProps } from './const'
import { encryptPassword } from '../../const'
import { isChinaMobilePhone } from '~/utils/validators'

const { Item } = Form
const { Countdown } = Statistic

const Component: FC<IRegisterFormProps> = (props) => {
  const { scene = ECodeScene.REG } = props
  const history = useHistory()
  const [form] = useForm()
  const [passwordType, setPasswordType] = useState('password')
  const [showCountDown, setShowCountDown] = useState(false)
  const [buttonLoading, setButtonLoading] = useState(false)

  async function handleFinish() {
    const result = await form.validateFields()
    const { mobile, newPassword, code } = result
    const encrypted = encryptPassword(newPassword)

    const updateData = { mobile, password: encrypted, code }
    setButtonLoading(true)
    if (scene === ECodeScene.REG) {
      api['/admin/public/register_POST'](updateData)
        .then(({ data }) => {
          window.localStorage.setItem('Authorization', 'Bearer ' + (data || ''))
          history.replace('/')
        })
        .finally(() => {
          setButtonLoading(false)
        })
    } else {
      api['/admin/public/forgot_POST'](updateData)
        .then(() => {
          message.success('密码修改成功')
          setTimeout(() => {
            props.onLoginClick()
          }, 1000)
        })
        .finally(() => {
          setButtonLoading(false)
        })
    }
  }

  const handleCodeClick = async () => {
    const value = await form.validateFields(['mobile'])
    try {
      setShowCountDown(true)
      await api['/admin/sms/verifyCode_GET']({ ...value, scene })
      message.success('验证码已经发送')
    } catch (error) {
      message.error('验证码发送失败')
      setShowCountDown(false)
    }
  }

  return (
    <div className={styles.registerFormStyle}>
      <h2>{scene === ECodeScene.FORGOT ? '忘记密码' : '注册'}</h2>
      <Form
        labelCol={{ span: 6 }}
        labelAlign="left"
        form={form}
        autoComplete="off"
        onValuesChange={(changedValues) => {
          const { newPassword } = changedValues
          if (newPassword !== undefined) {
            form.setFieldsValue({ newPassword: newPassword.replace(/[\u4e00-\u9fa5]/g, '') })
          }
        }}
      >
        <Item
          label="手机号码"
          name="mobile"
          validateFirst
          rules={[
            { required: true, message: '请输入手机号码' },
            { validator: (_, value) => (isChinaMobilePhone(value) ? Promise.resolve() : Promise.reject(new Error('请输入正确的手机号码'))) }
          ]}
        >
          <Input placeholder="请输入手机号码" size="large" />
        </Item>

        <Item label="短信验证" name="code" rules={[{ required: true, message: '请输入短信验证码' }]}>
          <Input
            placeholder="请输入短信验证码"
            size="large"
            maxLength={8}
            suffix={
              showCountDown ? (
                <Countdown value={Date.now() + 60000} valueStyle={{ fontSize: 14, color: '#cccccc' }} format="ss" onFinish={() => setShowCountDown(false)} />
              ) : (
                <Button type="link" onClick={handleCodeClick}>
                  获取验证码
                </Button>
              )
            }
          />
        </Item>

        {/* google浏览器选中密码后。自动填充离他最近的text类型的切不能为readonly和disabed的输入框。也不能隐藏  */}
        {/* <input type="text" style={{ position: 'absolute', left: 20000 }} /> */}
        {/* 360极速浏览器用户和密码包含在form的情况下。同时包含一个 type="text" 和type="password" 元素且不包含readonly和disabled属性。两个元素可以没有name和id*/}
        {/* <input type="text" style={{ position: 'absolute', left: 20000 }} readOnly /> */}

        <Item
          label={scene === ECodeScene.REG ? '登录密码' : '新密码'}
          name="newPassword"
          validateFirst
          rules={[
            { required: true, message: '请输入密码' },
            {
              required: true,
              pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/,
              message: '字母+数字组合,最少8位'
            }
          ]}
        >
          <Input
            placeholder="请输入密码"
            size="large"
            // type={passwordType}
            maxLength={20}
            // autoComplete="new-password"
            suffix={
              passwordType === 'password' ? (
                <EyeInvisibleOutlined onClick={() => setPasswordType('text')} />
              ) : (
                <EyeOutlined onClick={() => setPasswordType('password')} />
              )
            }
            className={passwordType === 'password' ? 'pwd' : ''}
          />
        </Item>

        <Item>
          <Button type="primary" block size="large" loading={buttonLoading} onClick={handleFinish}>
            {scene === ECodeScene.REG ? '注册' : '确定'}
          </Button>
        </Item>

        <Item>
          <div style={{ textAlign: 'center' }}>
            <Button type="link" onClick={props.onLoginClick}>
              已有账户,去登录
            </Button>
          </div>
        </Item>
      </Form>
    </div>
  )
}

Component.displayName = 'RegisterForm'

const RegisterForm = memo(Component)
export default RegisterForm
