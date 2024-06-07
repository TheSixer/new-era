import validator from 'validator'

/**
 * 针对validator的增强
 * @param value
 * @returns
 */

/**
 * 是否是中国电话号码
 *
 * @export
 * @param {(string | number)} value
 * @return {*}
 */
export function isChinaMobilePhone(value: string | number) {
  return validator.isMobilePhone(`${value}`, ['zh-CN', 'zh-HK', 'zh-MO', 'zh-TW'])
}
