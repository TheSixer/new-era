import { FC, memo, ReactNode } from 'react'
import { Space, Switch, SwitchProps, Typography } from 'antd'

interface IItemSwitchProps extends SwitchProps {
  /** 前置文本 */
  before?: ReactNode
  /** 后置文本 */
  after?: ReactNode
  /** 后置提示文本 */
  extra?: string
}

const Component: FC<IItemSwitchProps> = (props) => {
  const { before, after, extra, ...restProps } = props

  return (
    <Space>
      {props.before}

      <Switch {...restProps} />

      {props.after}

      <Typography.Text type="secondary">{props.extra}</Typography.Text>
    </Space>
  )
}

Component.displayName = 'ItemSwitch'

const ItemSwitch = memo(Component)
export default ItemSwitch
