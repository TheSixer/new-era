import { DrawerProps } from 'antd'

export interface IChooseGoodsDrawerProps extends DrawerProps {
  value: string[]

  onOk(value: string[]): void
}
