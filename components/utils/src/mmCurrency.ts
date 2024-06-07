import currencyJs, { Options } from 'currency.js'

type ValueType = string | number | undefined

const symbol = '¥'

export const currency = currencyJs

/**
 * 格式化金额
 *
 * @export
 * @param {*} value
 * @return {*}
 */
export default function mmCurrenty(value: ValueType = '', options?: Options) {
  return currencyJs(value, { symbol, ...options }).format()
}

/**
 * 累加
 *
 * @export
 * @param {...any[]} args
 * @return {*}
 */
export function mmAdds(...args: ValueType[]) {
  return args.reduce((total, item) => total.add(item ?? 0), currencyJs(0)).value
}

/**
 * 累减
 *
 * @export
 * @param {...any[]} args
 * @return {*}
 */
export function mmMinus(...args: ValueType[]) {
  return args.reduce((res, item, index) => (index === 0 ? currencyJs(item ?? 0) : res.subtract(item ?? 0)), currencyJs(0)).value
}

/**
 * 累乘
 *
 * @export
 * @param {...ValueType[]} args
 * @return {*}
 */
export function mmTimes(...args: (ValueType | Options)[]) {
  const hadOptions = Object.prototype.toString.call(args[args.length - 1]) === '[object Object]'
  const options = (hadOptions ? args[args.length - 1] : {}) as Options

  return args.reduce((total, item, index) => {
    // 最后一项且为配置项
    if (index === (args.length - 1) && hadOptions) {
      return currencyJs(total, item as Options)
    }

    return (index === 0 ? currencyJs((item ?? 0) as ValueType, options) : total.multiply((item ?? 0) as ValueType))
  }, currencyJs(0)).value
}

/**
 * 累除
 *
 * @export
 * @param {...ValueType[]} args
 * @return {*}
 */
export function mmDivide(...args: (ValueType | Options)[]) {
  const hadOptions = Object.prototype.toString.call(args[args.length - 1]) === '[object Object]'
  const options = (hadOptions ? args[args.length - 1] : {}) as Options

  return args.reduce((total, item, index) => {
    const va = item ?? 0

    if (index === 0) {
      return currencyJs(va as ValueType, options)
    }

    // 最后一项且为配置项
    if (index === (args.length - 1) && hadOptions) {
      return currencyJs(total, item as Options)
    }

    return va === 0 ? currencyJs(0, options) : total.divide(va as ValueType)
  }, currencyJs(0, options)).value
}
