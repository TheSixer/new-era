import citysJson from './citys'
import { ICity } from './const'
import optionTree from '@wmeimob/utils/src/tree/optionTree'

export function findCity(id: string, citys = citysJson): ICity {
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

export function optionCity() {
  return optionTree(citysJson, { label: 'text', value: 'id' })
}
