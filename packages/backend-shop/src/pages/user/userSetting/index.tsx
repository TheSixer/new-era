import { FC, memo, useEffect, useState } from 'react'
import styles from './index.module.less'
import { IUserSettingProps } from './const'
import { Card, Tabs, Typography, Form, Input, List } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useModel } from 'umi'
import ChangePasswordModal from '~/components/RightContent/changePasswordModal'

const { TabPane } = Tabs
const { Item: FormItem } = Form
const { Title } = Typography

const Component: FC<IUserSettingProps> = (props) => {
  const { initialState = {} } = useModel('@@initialState')

  const [securityList] = useState([{ id: 'passwrod', title: '账户密码', desc: '当前账户状态：正常' }])
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false)

  const [form] = useForm()

  useEffect(() => {
    form.setFieldsValue(initialState.currentUser)
  }, [initialState.currentUser])

  return (
    <Card className={styles.userSettingStyle}>
      <Tabs tabPosition="left">
        <TabPane tab="基本设置" key="1" className={styles.tabPane}>
          <Title level={4}>基本设置</Title>
          <Form form={form} layout="vertical" className={styles.userForm}>
            <FormItem label="用户名" name="name">
              <Input readOnly />
            </FormItem>
            <FormItem label="邮箱" name="email">
              <Input readOnly />
            </FormItem>
          </Form>
        </TabPane>
        <TabPane tab="安全设置" key="2" className={styles.tabPane}>
          <Title level={4}>安全设置</Title>
          <List
            itemLayout="horizontal"
            dataSource={securityList}
            renderItem={(item) => (
              <List.Item
                extra={
                  <span className={styles.security_change} onClick={() => setShowChangePasswordModal(true)}>
                    修改
                  </span>
                }
              >
                <List.Item.Meta title={item.title} description={item.desc} />
              </List.Item>
            )}
          />
        </TabPane>
      </Tabs>

      <ChangePasswordModal
        visible={showChangePasswordModal}
        onCancel={() => setShowChangePasswordModal(false)}
        onOk={() => setShowChangePasswordModal(false)}
      />
    </Card>
  )
}

Component.displayName = 'UserSetting'

const UserSetting = memo(Component)
export default UserSetting
