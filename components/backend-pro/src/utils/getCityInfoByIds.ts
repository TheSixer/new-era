import cityData from '../../assets/json/district.json'
import flatTree from '@wmeimob/utils/src/tree/flatTree'

interface IOption {
  /** 省id */
  province?: string | number
  /** 市id */
  city?: string | number
  /** 区id */
  district?: string | number
}

interface IReturn<
  T = {
    label: string
    value: string
  }
> {
  province: T | null
  city: T | null
  district: T | null
}

/**
 * 获取城市信息
 *
 * @export
 * @param {IOption} { province, city, district }
 * @return {*}
 */
export default function getCityInfoById({ province, city, district }: IOption) {
  const map = convertCityTree2Map()

  const provinceData = province ? map[province] : null
  const cityData = city ? map[city] : null
  const districtData = district ? map[district] : null
  return {
    province: provinceData,
    city: cityData,
    district: districtData
  } as IReturn
}

/**
 * 获取城市名称数组
 * @param id
 * @param city
 * @returns
 */
export function getCityNameById(id: string | string[], city: any[] = cityData): string[] {
  const cityIds = typeof id === 'string' ? id.split(',') : id

  const flatCitys = flatTree(city)

  const citys = flatCitys.filter((it) => cityIds.indexOf(it.value) !== -1)

  return citys.map((city) => city.label)
}

function convertCityTree2Map(data: typeof cityData = cityData) {
  return data.reduce((res, { children, label, value, ...rest }) => {
    res[value] = { ...rest, label, value }
    if (children && children.length) {
      res = Object.assign({}, res, convertCityTree2Map(children as any))
    }
    return res
  }, {} as Record<string, any>)
}
