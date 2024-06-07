import { Rule } from 'antd/es/form'

function numberRange(value: number, min: number, max: number) {
  return value >= min && value <= max ? Promise.resolve() : Promise.reject()
}

export const maxLenRule: Rule[] = [{ max: 100 }]

export const numberRule: Rule[] = [
  { required: true, message: '请输入内容' },
  { pattern: /^[+]{0,1}(\d+)$/, message: '请输入正整数' }
]

export const amountRule: Rule[] = [
  { required: true, message: '请输入内容' },
  { pattern: /^\d+(\.\d{1,2})?$/, message: '请输入正确的数字' }
]

export const afterFlowRule: Rule[] = [...numberRule, { validator: (rules, value) => numberRange(value, 1, 365), message: '数字应在1~365之间' }]

export const radioRule: Rule[] = [...numberRule, { validator: (rules, value) => numberRange(value, 1, 99), message: '数字应在1~99之间' }]

export const maxAmountRule: Rule[] = [...amountRule, { validator: (rules, value) => numberRange(value, 0, 99999999), message: '输入数字超出范围' }]

export const maxIntegralRule: Rule[] = [...numberRule, { validator: (rules, value) => numberRange(value, 0, 99999999), message: '输入数字超出范围' }]
