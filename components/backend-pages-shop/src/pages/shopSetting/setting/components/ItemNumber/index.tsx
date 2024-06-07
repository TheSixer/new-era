import { FC, memo, ReactNode } from 'react'
import { InputNumberProps, InputNumber, Typography, Space } from 'antd'

interface IItemNumberProps extends InputNumberProps {
  /** 前置文本 */
  before?: ReactNode
  /** 后置文本 */
  after?: ReactNode
  /** 后置提示文本 */
  extra?: string
}

const Component: FC<IItemNumberProps> = (props) => {
  const { before, after, extra, addonAfter, ...inputProps } = props

  return (
    <Space>
      {props.before}

      <InputNumber {...inputProps} addonAfter={<div style={{ width: 32 }}>{addonAfter}</div>} />

      {props.after}

      <Typography.Text type="secondary">{props.extra}</Typography.Text>
    </Space>
  )
}

Component.displayName = 'ItemNumber'

const ItemNumber = memo(Component)
export default ItemNumber
