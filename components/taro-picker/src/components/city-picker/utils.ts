import { ICityData } from './const'
import optionTree from '@wmeimob/utils/src/tree/optionTree'

export function findCity(id: string, citys: ICityData[]): ICityData {
  let city
  citys.find((value) => {
    if (value.id === id) {
      city = value
    } else if (value.children) {
      city = findCity(id, value.children)
    }
    return city
  })

  return city
}

export function optionCity(citys: ICityData[]) {
  return optionTree(citys, { label: 'text', value: 'id' })
}
