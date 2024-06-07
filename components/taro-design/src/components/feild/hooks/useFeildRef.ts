import { ForwardedRef, useImperativeHandle, useMemo } from 'react'
import { IFeildRef, IFeildRule } from '../const'
import useRules from './useRules'

interface IUseFeildRefOption<T = string> {
  rules: IFeildRule[]
  ref: ForwardedRef<IFeildRef>
  value: T

  required?: boolean

  placeholder?: string
}

export default function useFeildRef<T = string>({ rules: originalRules, ref, value, placeholder, required }: IUseFeildRefOption<T>) {
  const { errorMsg, setErrorMsg, valid, rules } = useRules(originalRules)

  useImperativeHandle(ref, () => ({
    valid: () => valid<T>(value, placeholder),
    getFieldValue: () => value
  }))

  const showRequired = useMemo(() => {
    if (required === false) {
      return required
    }
    return required || (rules || []).some(rule => rule.required)
  }, [required, rules])

  return {
    errorMsg,
    setErrorMsg,
    valid,
    rules,
    showRequired
  }
}
