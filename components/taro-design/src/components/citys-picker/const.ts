export interface MMCitysPickerProps {
  /**
   * 是否显示
   */
  visible: boolean

  /**
   * 当前值
   */
  value: MMCitysPickerValue[]

  /**
   * 能选择省，市，区的哪几个
   */
  type?: MMCityType

  /**
   * 点击确定
   */
  onOk: (value: MMCitysPickerValue[]) => void

  /**
   * 点击取消
   *
   * @memberof MMCitysPickerProps
   */
  onCancel: () => void
}

export interface MMCitysPickerState {
  pickerValue: string[]
  pickerData: ICity[][]
}

export interface MMCitysPickerValue {
  id: string
  text: string
}
export interface ICity {
  id: string
  text: string
  children: ICity[]
}

export enum MMCityType {
  Default,
  Provinces,
  Citys,
  Area
}
