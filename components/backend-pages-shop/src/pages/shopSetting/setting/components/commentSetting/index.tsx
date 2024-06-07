import { ESettingKey } from '@wmeimob/shop-data/src/enums/ESettingKey'
import { Button, Card, Form, Input, Rate } from 'antd'
import { FC, memo } from 'react'
import useSettingService from '../../hooks/useSettingService'
import { defaultFormProps } from '../formProps'
import ItemNumber from '../ItemNumber'
import ItemSwitch from '../itemSwitch'

interface ICommentSettingProps {
  disabled?: boolean
}

const { auto_comment, auto_comment_star, order_auto_comment_time_day, auto_comment_content } = ESettingKey

const Component: FC<ICommentSettingProps> = (props) => {
  const { disabled = false } = props

  const { onFinish, form, loading } = useSettingService({ key: [auto_comment, auto_comment_star, order_auto_comment_time_day, auto_comment_content] })
  return (
    <Card
      title="商品评论设置"
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
          [auto_comment]: true,
          [order_auto_comment_time_day]: 30,
          [auto_comment_star]: 5,
          [auto_comment_content]: ''
        }}
      >
        <Form.Item label="自动评论" name={auto_comment} valuePropName="checked">
          <ItemSwitch disabled={disabled} extra="*开启后买家长时间未评论将自动评论" />
        </Form.Item>

        <Form.Item label="收货后自动评价时间" name={order_auto_comment_time_day}>
          <ItemNumber disabled={disabled} addonAfter="天" extra="*填0则无自动评价" min={0} max={30} precision={0} />
        </Form.Item>

        <Form.Item label="自动评论星级" name={auto_comment_star}>
          <Rate disabled={disabled} />
        </Form.Item>

        <Form.Item label="自动评论内容" name={auto_comment_content} extra="*买家超时未评论，系统默认的评论内容，默认匿名">
          <Input.TextArea disabled={disabled} style={{ width: 500 }} maxLength={80} autoSize={{ minRows: 3, maxRows: 3 }} showCount />
        </Form.Item>
      </Form>
    </Card>
  )
}

const CommentSetting = memo(Component)
export default CommentSetting
