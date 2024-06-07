import { ESettingKey } from '@wmeimob/shop-data/src/enums/ESettingKey'
import { Button, Card, Checkbox, Form, Space } from 'antd'
import { FC, memo } from 'react'
import { EScoreAutoReset, MScoreAutoReset } from '../../../../../enums/basicSetting/EScoreAutoReset'
import useSettingService from '../../hooks/useSettingService'
import { defaultFormProps } from '../formProps'

const { score_auto_reset } = ESettingKey

interface IProps {
  disabled?: boolean
}

const Component: FC<IProps> = (props) => {
  const { disabled } = props

  const { onFinish, form, loading } = useSettingService({ key: [score_auto_reset] })
  return (
    <Card
      title="全局设置"
      extra={
        !disabled && (
          <Button type="primary" loading={loading} onClick={onFinish}>
            保存
          </Button>
        )
      }
    >
      <Form
        {...defaultFormProps}
        form={form}
        initialValues={{
          [score_auto_reset]: EScoreAutoReset.None
        }}
      >
        {/* <Form.Item label="每日任务积分上限">
        <Space>
          <Form.Item name={'up'} noStyle>
            <ItemNumber addonAfter="积分" />
          </Form.Item>

          <Form.Item name={'enable'} noStyle valuePropName="checked">
            <Switch />
          </Form.Item>
        </Space>
      </Form.Item> */}

        <Form.Item label="过期自动清零" extra="*未选择永久不过期">
          <Space>
            <Form.Item name={score_auto_reset} noStyle valuePropName="checked" normalize={(checked) => Number(checked) || EScoreAutoReset.None}>
              <Checkbox disabled={disabled}>{MScoreAutoReset[EScoreAutoReset.Year]}</Checkbox>
            </Form.Item>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  )
}

Component.displayName = 'ScoreGlobalSetting'

const ScoreGlobalSetting = memo(Component)
export default ScoreGlobalSetting
