import { FC, memo, useEffect, useMemo, useState } from 'react'
import styles from './index.module.less'
import { IChangePasswordModalProps } from './const'
import { Button, Form, Input, message, Modal, Space } from 'antd'
import { Rule } from 'antd/lib/form'
import { useForm } from 'antd/es/form/Form'
import { api } from '~/request'
import { encryptPassword } from '~/pages/login/const'
import { useHistory } from 'react-router-dom'
import { loginPath } from '~/config'

const { Item } = Form

const Component: FC<IChangePasswordModalProps> = (props) => {
  const { onCancel, onOk, title, ...rest } = props
  const [type, setType] = useState('password')
  const [loading, setLoading] = useState(false)
  const [rules] = useState<Rule[]>([{ required: true }])
  const [form] = useForm()
  const history = useHistory()
  const confirmPasswordRules = useMemo<Rule[]>(
    () => [
      ...rules,
      {
        validator: (_r, value) => {
          const { newPassword } = form.getFieldsValue()
          const isValid = !!value && value === newPassword
          return isValid ? Promise.resolve() : Promise.reject(new Error('密码不一致'))
        }
      }
    ],
    [rules]
  )

  const handeConfirm = async (e) => {
    try {
      const value = await form.validateFields()
      setLoading(true)

      const password = encryptPassword(value.password)
      const newPassword = encryptPassword(value.newPassword)
      await api['/admin/api/sysUser/resetPwd_PUT']({ password, newPassword })
      message.success('修改成功,请重新登录')
      onOk && onOk(e)

      setTimeout(() => {
        window.localStorage.removeItem('Authorization')
        history.push(loginPath)
      }, 1000)
    } catch (error) {}
    setLoading(false)
  }

  useEffect(() => {
    if (props.visible) {
      form.resetFields()
    }
  }, [props.visible])

  return (
    <Modal
      {...rest}
      title="修改密码"
      className={styles.changePasswordModalStyle}
      closable={false}
      footer={
        <Space>
          <Button size="small" type="text" onClick={() => setType((pre) => (pre === 'password' ? 'text' : 'password'))} style={{ fontSize: 12 }}>
            {type === 'password' ? '显示密码' : '隐藏密码'}
          </Button>
          <Button onClick={onCancel}>取消</Button>
          <Button loading={loading} type="primary" onClick={handeConfirm}>
            确定
          </Button>
        </Space>
      }
    >
      <Form form={form} labelCol={{ span: 6 }}>
        <Item label="原密码" name="password" rules={rules}>
          <Input type={type} />
        </Item>
        <Item
          label="新密码"
          name="newPassword"
          rules={[
            ...rules,
            {
              required: true,
              pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/,
              message: '字母+数字组合,最少8位'
            }
          ]}
          validateFirst
        >
          <Input type={type} />
        </Item>
        <Item label="确认新密码" name="confrimPassword" rules={confirmPasswordRules} validateFirst>
          <Input type={type} />
        </Item>
      </Form>
    </Modal>
  )
}

Component.displayName = 'ChangePasswordModal'

const ChangePasswordModal = memo(Component)
export default ChangePasswordModal
