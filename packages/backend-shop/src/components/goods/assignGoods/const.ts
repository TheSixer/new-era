import { CardProps } from 'antd'

export interface IAssignGoodsProps {
  value: string[]

  cardProps?: CardProps

  disabled?: boolean

  onChange(value: string[]): void
}
