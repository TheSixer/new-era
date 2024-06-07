export interface IShopTabsProps<V extends string | number = string> {
  value: V
  /** tab数据 */
  data: IShopTabsData<V>[]

  onChange?(value: V): void
}

export interface IShopTabsData<V extends string | number = string> {
  /** 标签文本 */
  label: string

  /** 值 */
  value: V
}
