/* eslint-disable complexity */
import IHFromItemProps from './IFromItemProps'
import IRule from './IRule'

export default function fromValueVerification(originalValue: any, props: IHFromItemProps, rule: IRule) {
  if (!rule) {
    return
  }

  const { required, message, min, max, type, pattern, transform } = rule
  const { name = '' } = props
  const value = transform?.(originalValue) || originalValue || ''

  if (required && !value) {
    return message || '请输入' + name
  } else if (!required && !value) {
    return
  }

  switch (type) {
    case 'string':
      if (typeof value !== 'string') {
        return '值必须是字符串！'
      }
      break
    case 'number':
      if (Number.isNaN(Number(value))) {
        return '请输入数字'
      }
      break
    case 'integer':
      if (!/^-?[1-9]\d*$/.test(value)) {
        return '请输入整数'
      }
      break
    case 'positiveInteger':
      if (!/^[1-9]\d*$/.test(value)) {
        return '请输入正整数'
      }
      break
    case 'phone':
      if (!/^1\d{10}$/.test(value)) {
        return '请输入正确手机号'
      }
      break
  }

  if (min !== undefined) {
    if (type === 'number' && Number(value) < min) {
      return `请输入大于等于${min}的数字`
    }

    if (value.toString().length < min) {
      return `请输入长度多于${min}的文字`
    }
  }

  if (max !== undefined) {
    if (type === 'number' && Number(value) > max) {
      return `请输入小于等于${max}的数字`
    }

    if (value.toString().length > max) {
      return `请输入长度不多于${max}的文字`
    }
  }

  if (pattern && !pattern?.test(value)) {
    return message || '输入错误！'
  }
}
