import ProFormRichText from '@wmeimob/backend-pro/src/components/form/proFormRichText'
import { ESettingKey } from '@wmeimob/shop-data/src/enums/ESettingKey'
import { Button, Card, Form } from 'antd'
import { FC, memo } from 'react'
import useSettingService from '../../hooks/useSettingService'

interface IProps {
  disabled?: boolean
}

const { recharge_description } = ESettingKey

const Component: FC<IProps> = (props) => {
  const { disabled = false } = props

  const { onFinish, form, loading } = useSettingService({ key: [recharge_description] })

  return (
    <Card
      title="充值说明设置"
      extra={
        !disabled && (
          <Button type="primary" loading={loading} onClick={onFinish}>
            保存
          </Button>
        )
      }
    >
      <Form form={form}>
        <ProFormRichText
          name={recharge_description}
          wrapperCol={{ span: 16 }}
          fieldProps={{
            readonly: disabled,
            toolbarConfig: {
              excludeKeys: [
                'blockquote',
                'group-more-style',
                'bgColor',
                'fontFamily',
                'todo',
                'emotion',
                'insertLink',
                'group-image',
                'group-video',
                'insertTable',
                'codeBlock'
              ]
            }
          }}
        />
      </Form>
    </Card>
  )
}

Component.displayName = 'RechargeExplainSetting'

const RechargeExplainSetting = memo(Component)
export default RechargeExplainSetting
