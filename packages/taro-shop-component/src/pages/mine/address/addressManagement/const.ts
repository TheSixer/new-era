export interface IAddressManagementProps {}

export interface IAddressInfo {
  mobile: string
  name: string
  defaulted: boolean
  address: string
  addArr: { id: string; text: string }[]
}
