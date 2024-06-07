/**
 * @author 后台显示相关工具函数
 */
import { minus } from 'number-precision'

/**
 * 转换数字带两位小数 带逗号
 */
export function numberToMoney(value?: number, unit = '￥'): string {
  if (typeof value !== 'number') {
    return ''
  }
  const positive = Math.abs(value)
  const integer = Math.floor(positive)
  const decimals = minus(positive, integer).toFixed(2)

  return (value >= 0 ? '' : '-') + unit + Math.abs(integer).toLocaleString('zh-Hans-CN', { style: 'decimal' }) + decimals.slice(1)
}
