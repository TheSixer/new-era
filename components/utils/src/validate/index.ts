/** 是否是手机号 */
export const isMobilePhone = (mobile = '') => /^1\d{10}/.test(mobile)

/** 是否是邮箱 */
export const isEmail = (email = '') => /^([\.a-zA-Z0-9_-])+@[\.a-zA-Z0-9_-]+(\.[\.a-zA-Z0-9_-]+)+$/.test(email)

/** 是否是身份证号 */
export const isIdentifyCode = (code = '') => /^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dXx]$/.test(code)
