/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
import { BaseEventOrig, Input, View } from '@tarojs/components'
import { InputProps } from '@tarojs/components/types/Input'
import classNames from 'classnames'
import { minus, plus } from 'number-precision'
import { memo, useRef, FC } from 'react'
import MMIconFont from '../icon-font'
import MMIconFontName from '../icon-font/const'
import { IStepperProps } from './const'
import styles from './index.module.less'

const imgStyle = { width: 18, height: 18, lineHeight: '18px' }
const Component: FC<IStepperProps> = (props) => {
  const { value = 0, min, max, step = 1, type = 'number', disabled = false, hiddenInZero = false, inputProps, beforeChange, onChange } = props

  const inputRef = useRef<any>()
  const isDisabledMax = (max !== undefined && value >= max) || disabled
  const isDisabledMin = (min !== undefined && value <= min) || disabled

  const visibleMinsAndInput = !(hiddenInZero && !Number(value))

  const handleMinus = () => {
    if (!isDisabledMin) {
      const newValue = minus(value, step)
      setNumber(newValue)
    }
  }

  const handlePlus = () => {
    if (!isDisabledMax) {
      const newValue = plus(value, step)
      setNumber(newValue)
    }
  }

  async function setNumber(newValue: number) {
    if (min !== undefined && newValue < min) {
      newValue = min
    }
    if (max !== undefined && newValue > max) {
      newValue = max
    }

    if (beforeChange) {
      const result = await beforeChange?.(newValue)
      if (!result && inputRef.current) {
        inputRef.current.value = value
        return
      }
    }

    inputRef.current.value = newValue
    onChange?.(newValue)
  }

  function handleBlur(event: BaseEventOrig<InputProps.inputValueEventDetail>) {
    let number = Number(event.detail.value)
    number = Number.isNaN(number) ? value : number
    if (value !== number) {
      setNumber(number)
    }
  }

  function renderPlus() {
    return (
      <View className={props.renderPlus ? '' : styles.icon} onClick={handlePlus}>
        {props.renderPlus ? (
          props.renderPlus(isDisabledMax)
        ) : (
          <MMIconFont
            value={MMIconFontName.Addition}
            size={18}
            style={{ ...imgStyle, transform: 'scale(0.7)' }}
            color={isDisabledMax ? '#cccccc' : '#333333'}
          />
        )}
      </View>
    )
  }

  function renderMinus() {
    return (
      <View className={props.renderMinus ? '' : styles.icon} onClick={handleMinus}>
        {props.renderMinus ? (
          props.renderMinus(isDisabledMin)
        ) : (
          <MMIconFont value={MMIconFontName.Lessen} size={18} style={imgStyle} color={isDisabledMin ? '#cccccc' : '#333333'} />
        )}
      </View>
    )
  }

  const isCustomRender = props.renderPlus || props.renderMinus

  return (
    <View className={classNames(styles.stepperStyle, isCustomRender && styles.stepperStyle__custom)}>
      {visibleMinsAndInput && (
        <>
          {renderMinus()}

          <View className={styles.stepperStyle_input}>
            <Input
              {...inputProps}
              disabled={disabled}
              ref={inputRef}
              value={value as any}
              type={type}
              onBlur={handleBlur}
              className={classNames(styles.input, inputProps?.className)}
            />
          </View>
        </>
      )}

      {renderPlus()}
    </View>
  )
}

const MMStepper = memo(Component)
export default MMStepper
