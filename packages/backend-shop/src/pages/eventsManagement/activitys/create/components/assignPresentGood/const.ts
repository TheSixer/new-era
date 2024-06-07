import { DrawerProps } from 'antd'

export interface IAssignPresentGoodProps extends DrawerProps {
  value: any[]

  onOk(value: any): void
}
