import { FC, memo, useEffect, useState } from 'react'
import styles from './index.module.less'
import { ILoginFormProps } from './const'
import { EyeInvisibleOutlined, EyeOutlined, LockOutlined, UserOutlined } from '@ant-design/icons'
import { api } from '~/request'
import { ECodeScene } from '~/enums/ECodeScene'
import { Input, Button, Form } from 'antd'
import { defaultPwd, defaultAccount, isPrd } from '~/config'
import { encryptPassword } from '../../const'
import { useModel, history } from 'umi'
import { isChinaMobilePhone } from '~/utils/validators'

const { Item, useForm } = Form

const Component: FC<ILoginFormProps> = (props) => {
  const { initialState, setInitialState } = useModel('@@initialState')

  const [form] = useForm()

  const [passwordType, setPasswordType] = useState('password')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!isPrd) {
      const userName = localStorage.getItem('_username')
      const pwd = localStorage.getItem('_pwd')
      form.setFieldsValue({ username: userName || defaultAccount, pwd: pwd || defaultPwd })
    }
  }, [])

  function handleFinish() {
    form.validateFields().then(async ({ username, pwd }) => {
      setLoading(true)
      try {
        if (!isPrd) {
          localStorage.setItem('_username', username)
          localStorage.setItem('_pwd', pwd)
        }
        const encrypted = encryptPassword(pwd)
        const { data = '' } = await api['/admin/public/login_POST']({ username, password: encrypted })
        window.localStorage.setItem('Authorization', data)
        // 更新用户信息
        const user = await initialState!.fetchUserInfo!()
        await setInitialState((pre) => ({ ...pre, ...user }))
        /**
         * FIXME: 这里会出现权限管理账号登录回跳后账号没有回跳页面权限导致出现403
         * 需要解决回跳没有权限自动再重定向操作。现阶段没处理。所以默认全部回首页
         */
        history.push('/')
        // 重定向
        // const { query = {} } = history.location
        // query.redirect ? history.replace(query.redirect as string) : history.push('/home')
      } catch (error) {}

      setLoading(false)
    })
  }

  return (
    <Form
      labelCol={{ span: 6 }}
      labelAlign="left"
      form={form}
      onFinish={handleFinish}
      onValuesChange={(changedValues) => {
        if (changedValues.pwd !== undefined) {
          form.setFieldsValue({ pwd: changedValues.pwd.replace(/[\u4e00-\u9fa5]/g, '') })
        }
      }}
    >
      <Item
        name="username"
        validateFirst
        rules={[
          { required: true, message: '请输入手机号码' },
          { validator: (_, value) => (isChinaMobilePhone(value) ? Promise.resolve() : Promise.reject(new Error('请输入正确的手机号码'))) }
        ]}
      >
        <Input placeholder="请输入手机号码" size="large" prefix={<UserOutlined style={{ color: '#bfbfbf' }} />} />
      </Item>
      <Item name="pwd" rules={[{ required: true, message: '请输入密码' }]}>
        <Input
          placeholder="请输入密码"
          size="large"
          prefix={<LockOutlined style={{ color: '#bfbfbf' }} />}
          // type={passwordType}
          maxLength={20}
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

      <Form.Item noStyle>
        <div className={styles.opeartions}>
          <Button type="link" onClick={() => props.onClick(ECodeScene.FORGOT)}>
            忘记密码?
          </Button>
          {/* <Button type="link" onClick={() => props.onClick(ECodeScene.REG)}>
            前往注册
          </Button> */}
        </div>
      </Form.Item>

      <Item>
        <Button type="primary" block size="large" htmlType="submit" loading={loading}>
          登录
        </Button>
      </Item>
    </Form>
  )
}

Component.displayName = 'LoginForm'

const LoginForm = memo(Component)
export default LoginForm
