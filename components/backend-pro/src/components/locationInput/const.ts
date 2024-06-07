export interface ILocationInputProps {
  /** 示例： 123.4,678.9 */
  value?: string
  disabled?: boolean
  onChange?(value: string): void
}

/** 选择定位的站点地址 */
export const POSITION_SITE_URL = 'https://lbs.qq.com/getPoint/'

/** 输入的坐标校验 */
export const validatePosition = (position: string) => {
  // 必填校验由外部处理
  if (!position) {
    return Promise.resolve()
  }

  const isStandard = /^\d+(\.?\d+)?,\d+(\.?\d+)?$/.test(position)

  if (!isStandard) {
    return Promise.reject(new Error('请输入正确的坐标位置（经度,纬度 英文逗号分隔），如 121.47051,31.38977'))
  }

  const [longitude, latitude] = position.split(',')
  const longitudeRange = { start: 0, end: 180 }
  const latitudeRange = { start: 0, end: 85 }

  if (Number(longitude) > longitudeRange.end) {
    return Promise.reject(new Error(`经度不能超过 ${longitudeRange.end}，当前填写为 ${longitude}，请检查是否将经纬度填写相反`))
  }

  if (Number(latitude) > latitudeRange.end) {
    return Promise.reject(new Error(`纬度不能超过 ${latitudeRange.end}，当前填写为 ${latitude}，请检查是否将经纬度填写相反`))
  }

  return Promise.resolve()
}
