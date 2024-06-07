export interface IDeliveryTabProps<ValueType extends string | number | boolean> {
  activeKey: ValueType

  tabs: IDeliveryTab<ValueType>[]

  onTabChange?(item: IDeliveryTab<ValueType>, index: number): void

  onDisabledTabClick?(item: IDeliveryTab<ValueType>, index: number): void
}

export interface IDeliveryTab<ValueType extends string | number | boolean> {
  label: string

  value: ValueType

  disabled?: boolean
}
