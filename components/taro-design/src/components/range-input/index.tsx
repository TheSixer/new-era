import Taro from '@tarojs/taro'
import { FC, memo, useEffect, useMemo, useRef, useState } from 'react'
import { View, Input } from '@tarojs/components'
import { IRangeInputProps } from './const'
import styles from './index.module.less'
import classNames from 'classnames'

/**
 * 数值范围输入框
 *
 * @param {*} props
 * @return {*}
 */
const Component: FC<IRangeInputProps> = (props) => {
  const { value = [], placeholder = '请输入', min = 0 } = props

  const [errorMsg, setErrorMsg] = useState('')
  const placeholders = useMemo(() => (typeof placeholder === 'string' ? [placeholder, placeholder] : placeholder), [placeholder])

  const showError = useMemo(() => !!errorMsg, [errorMsg])
  const innerValueRef = useRef<string[]>([...value])

  useEffect(() => {
    innerValueRef.current = [...value]
  }, [value])

  const handleFocus = () => {
    setErrorMsg('')
  }

  const handleMinBlur = () => {
    const [minValue, maxValue] = innerValueRef.current
    if (!minValue) {
      return props.onChange?.([minValue, maxValue])
    }

    const mValue = parseFloat(minValue)
    if (mValue < min) {
      setErrorMsg(`值不能小于${min}`)
    } else {
      return props.onChange?.([minValue, maxValue])
    }
  }

  const handleMaxBlur = () => {
    const [minValue, maxValue] = innerValueRef.current
    if (!maxValue) {
      return props.onChange?.([minValue, maxValue])
    }

    const mValue = parseFloat(maxValue)
    if (minValue && Number(minValue) > mValue) {
      setErrorMsg(`值不能小于${minValue}`)
    } else {
      return props.onChange?.([minValue, maxValue])
    }
  }

  return (
    <View className={styles.rangeInputStyle}>
      <View className={styles.inputContent}>
        <Input
          value={(value[0] as string) || ''}
          type="digit"
          placeholder={placeholders[0]}
          placeholderStyle="color:#999999;"
          className={classNames(styles.input, showError && styles.error)}
          onInput={(ev) => {
            innerValueRef.current[0] = ev.detail.value || ''
          }}
          onFocus={handleFocus}
          onBlur={handleMinBlur}
        />

        <View className={classNames(styles.line, showError && styles.error)} />

        <Input
          value={(value[1] as string) || ''}
          type="digit"
          placeholder={placeholders[1]}
          placeholderStyle="color:#999999;"
          className={classNames(styles.input, showError && styles.error)}
          onInput={(ev) => {
            innerValueRef.current[1] = ev.detail.value || ''
          }}
          onFocus={handleFocus}
          onBlur={handleMaxBlur}
        />
      </View>

      {showError && <View className={styles.rangeInput_error}>{errorMsg}</View>}
    </View>
  )
}

const RangeInput = memo(Component)
export default RangeInput
