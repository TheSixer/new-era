/** 是否是手机号 */
export const isMobilePhone = (mobile = '') => /^1\d{10}/.test(mobile)

/** 是否是邮箱 */
export const isEmail = (email = '') => /^([\.a-zA-Z0-9_-])+@[\.a-zA-Z0-9_-]+(\.[\.a-zA-Z0-9_-]+)+$/.test(email)
