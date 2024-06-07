export interface ICityValue {
  id: string

  text: string

  children?: ICityData[]
}

export interface ICityData {
  id: string

  text: string

  children: ICityData[]
}
