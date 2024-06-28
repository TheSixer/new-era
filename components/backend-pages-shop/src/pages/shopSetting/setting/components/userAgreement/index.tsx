import ProFormRichText from '@wmeimob/backend-pro/src/components/form/proFormRichText'
import { ESettingKey } from '@wmeimob/shop-data/src/enums/ESettingKey'
import { Button, Card, Form, Space } from 'antd'
import { FC, memo, useMemo } from 'react'
import useSettingService from '../../hooks/useSettingService'
import { defaultFormProps } from '../formProps'
import { EAgreementType } from '@wmeimob/shop-data/src/enums/EAgreementType'

interface IUserAgreementProps {
  disabled?: boolean
  type?: EAgreementType

  onShowLogClick(): void
}

const Component: FC<IUserAgreementProps> = (props) => {
  const { disabled = false, type = EAgreementType.User } = props
  const { user_agreement, privacy_agreement, promise_agreement } = ESettingKey
  const key = {
    [EAgreementType.User]: user_agreement,
    [EAgreementType.Privacy]: privacy_agreement,
    [EAgreementType.Promise]: promise_agreement
  }

  const { onFinish, form, loading } = useSettingService({ key: [key[type]] })

  const title = useMemo(() => (type === EAgreementType.User ? '《用户协议》配置' : type === EAgreementType.Promise ? '《免责承诺书》配置' : '《隐私政策》配置'), [type])

  return (
    <Card
      title={title}
      extra={
        <Space>
          {/* <Button onClick={props.onShowLogClick}>查看记录</Button> */}
          {!disabled && (
            <Button type='primary' loading={loading} onClick={onFinish}>
              保存
            </Button>
          )}
        </Space>
      }
    >
      <Form {...defaultFormProps} form={form}>
        <ProFormRichText name={key[type]} fieldProps={{ readonly: disabled, plain: 'minimalism' }} />
      </Form>
    </Card>
  )
}

const UserAgreement = memo(Component)
export default UserAgreement
