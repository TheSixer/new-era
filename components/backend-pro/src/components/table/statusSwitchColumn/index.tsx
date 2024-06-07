import { FC, memo, useState } from 'react'
import { IStatusSwitchColumnProps } from './const'
import { Switch } from 'antd'

/**
 * 状态切换列
 *
 * @param props
 * @returns
 */
const Component: FC<IStatusSwitchColumnProps> = (props) => {
  const { onChange, onSwitch, ...rest } = props
  const [loading, setLoading] = useState(false)

  const handleChange = async (checked: boolean) => {
    setLoading(true)
    try {
      await onSwitch(checked)
    } catch (error) {
      console.error(error)
    }
    setLoading(false)
  }

  return <Switch {...rest} loading={loading} onChange={handleChange} />
}

Component.displayName = 'StatusSwitchColumn'

const StatusSwitchColumn = memo(Component)
export default StatusSwitchColumn
