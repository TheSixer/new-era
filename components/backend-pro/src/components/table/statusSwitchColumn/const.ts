import { SwitchProps } from 'antd'

export interface IStatusSwitchColumnProps extends SwitchProps {
  onSwitch(checked: boolean): Promise<any>
}
