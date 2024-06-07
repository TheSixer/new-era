export interface ICheckButtonsProps<ValueType extends string | number = string> {
  /** 选中的值 */
  value?: ValueType[]

  /** 选项 */
  options: ICheckButtonsData<ValueType>[]

  /** 选中选项发生变化时 */
  onChange?(values: ValueType[], item: ICheckButtonsData<ValueType>, index: number): void
}

export interface ICheckButtonsData<ValueType extends string | number = string> {
  label: string

  value: ValueType

  [i: string]: any
}
