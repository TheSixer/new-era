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

/** 是否是手机号 */
export const isMobilePhone = (mobile = '') => /^1\d{10}/.test(mobile)

/** 是否是邮箱 */
export const isEmail = (email = '') => /^([\.a-zA-Z0-9_-])+@[\.a-zA-Z0-9_-]+(\.[\.a-zA-Z0-9_-]+)+$/.test(email)
