import { forwardRef, memo, useMemo, useRef } from 'react'
import { Input, BaseEventOrig, View, Image } from '@tarojs/components'
import { IFeildProps, IFeildRef } from './const'
import { InputProps } from '@tarojs/components/types/Input'
import styles from './index.module.less'
import icon_delete from './images/icon_delete.png'
import FeildContainer from './container'
import MMFeildSelect from './select'
import MMFeildSwitch from './switch'
import MMFeildCityPicker from './cityPicker'
import MMFeildTextArea from './textArea'
import useFeildRef from './hooks/useFeildRef'

/**
 *
 * Field 输入框
 * 用户可以在文本框内输入或编辑文字。
 * @param props
 * @returns
 */
const Component = forwardRef<IFeildRef, IFeildProps>((props, ref) => {
  const { label = '', value, type, rules: pRules = [], allowClear = false, placeholder, fieldProps, readonly = false, required, onChange } = props

  const innerValue = useRef(value as string)
  innerValue.current = `${value}`

  const inputPlaceholder = useMemo(() => placeholder || fieldProps?.placeholder || `请输入${label}`, [placeholder, label, fieldProps?.placeholder]) // 输入框placeholer

  const { errorMsg, setErrorMsg, valid, showRequired } = useFeildRef({ rules: pRules, placeholder: inputPlaceholder, value, required, ref })

  const memoInputProps = useMemo<InputProps>(() => {
    const fProps = fieldProps || {}
    const inputType = fProps.type ?? (type ? { money: 'text', mobile: 'number' }[type] || type : undefined)

    return {
      ...fieldProps,
      type: inputType,
      placeholderStyle: 'color:#999999;font-size:14px;font-weight:400;' + (fProps.placeholderStyle || ''),
      maxlength: type === 'mobile' ? 11 : fProps.maxlength
    }
  }, [fieldProps, type])

  const handleFocus = () => {
    if (errorMsg) {
      setErrorMsg('')
    }
  }

  const handleBlur = async (ev: BaseEventOrig<InputProps.inputValueEventDetail>) => {
    const inputValue = handleValue(ev.detail.value || '')
    memoInputProps.onBlur?.(ev)
    await valid(inputValue, inputPlaceholder)
  }

  function handleValue(val = '') {
    const inputValue = val.trim()
    innerValue.current = inputValue
    onChange?.(inputValue)
    return inputValue
  }

  const innerInput = (
    <View className={styles.innerInput}>
      <Input
        {...memoInputProps}
        value={innerValue.current as any}
        disabled={fieldProps?.disabled ?? readonly}
        placeholder={inputPlaceholder}
        // cursor={value.length + 1}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onInput={(ev) => {
          handleValue(ev.detail.value || '')
        }}
        className={styles.innerInput_input}
      />

      {allowClear && !!value && (
        <View className={styles.delete} onClick={() => handleValue('')}>
          <Image src={icon_delete} style={{ width: 16, height: 16 }} />
        </View>
      )}
    </View>
  )

  return (
    <FeildContainer {...props} required={showRequired} errorMsg={errorMsg} renderProps={innerInput}>
      {props.children}
    </FeildContainer>
  )
})

const MMFeild = memo(Component) as unknown as typeof Component & {
  Select: typeof MMFeildSelect
  Switch: typeof MMFeildSwitch
  CityPicker: typeof MMFeildCityPicker
  TextArea: typeof MMFeildTextArea
}

MMFeild.displayName = 'MMFeild'

MMFeild.Select = MMFeildSelect
MMFeild.Switch = MMFeildSwitch
MMFeild.CityPicker = MMFeildCityPicker
MMFeild.TextArea = MMFeildTextArea
export default MMFeild
