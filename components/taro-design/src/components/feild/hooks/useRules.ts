import { isMobilePhone } from '@wmeimob/utils/src/validate'
import { useState, useMemo } from 'react'
import { IFeildRule, IFeildProps } from '../const'

/**
 * 输入框规则hook
 * @param rules
 * @param type
 * @returns
 */
export default function useRules(rules: IFeildRule[] = [], type?: IFeildProps['type']) {
  const [errorMsg, setErrorMsg] = useState('') // 错误消息

  /**
   * 合并新规则
   */
  const newRules = useMemo(() => {
    switch (type) {
      case 'mobile':
        return rules.concat([
          {
            validate: (__, value) => {
              return isMobilePhone(value) ? Promise.resolve(true) : Promise.reject(new Error('手机号错误'))
            }
          }
        ])
      default:
        return rules
    }
  }, [type, rules])

  /** 校验方法 */
  async function valid<T = any>(inputValue: T, errorMessage = '输入错误') {
    let inValidMsg = ''
    const validResult = await newRules.reduce((result, rule) => {
      return result.then(async isValid => {
        let hasValid = isValid
        if (!hasValid) {
          return hasValid
        }

        const { required: rRequired, message, validate } = rule
        // 有验证方法
        if (validate) {
          try {
            hasValid = await validate(rule, inputValue as any)
          } catch (error) {
            inValidMsg = error.message
            hasValid = false
          }
        }

        if (!hasValid) {
          return hasValid
        }

        // 必填但是没填返回false
        if (rRequired) {
          if (inputValue instanceof Array && !inputValue.length) {
            inValidMsg = message || errorMessage
            hasValid = false
          } else if (['', null, undefined].indexOf(inputValue as any) !== -1) {
            inValidMsg = message || errorMessage
            hasValid = false
          }
        }

        return hasValid
      })
    }, Promise.resolve(true))

    if (inValidMsg) {
      setErrorMsg(inValidMsg)
    }

    if (validResult) {
      return inputValue
    }

    throw inValidMsg
  }

  return {
    errorMsg,
    setErrorMsg,
    valid,
    rules: newRules
  }
}
