import { CardProps } from 'antd'

export interface IAssignActivityGoodsProps {
  value: string[]

  cardProps?: CardProps

  disabled?: boolean

  onChange(value: string[]): void
}
