import { memo, FC } from 'react'
import { View, Textarea, BaseEventOrig } from '@tarojs/components'
import { ITextareaProps } from './const'
import styles from './index.module.less'
import { TextareaProps } from '@tarojs/components/types/Textarea'
import shopVariable from '../styles/themes/shop.variable'

const Component: FC<ITextareaProps> = (props) => {
  const { value = '', maxlength, showLimit = true, height = 80, onChange, ...textAreaProps } = props

  const showLimitTip = showLimit && !!maxlength

  function handleInput(ev: BaseEventOrig<TextareaProps.onInputEventDetail>) {
    let inputValue = ev.detail.value || ''
    if (maxlength && inputValue.length > maxlength) {
      inputValue = inputValue.slice(0, maxlength)
    }
    onChange?.(inputValue)
  }

  return (
    <View className={styles.textareaStyle}>
      <Textarea
        {...textAreaProps}
        value={value}
        maxlength={maxlength}
        onInput={handleInput}
        style={{ height, width: '100%', marginBottom: showLimitTip ? shopVariable.spacing : undefined, ...textAreaProps.style }}
      />

      {showLimitTip && (
        <View className={styles.inputLimit}>
          {value.length}/{maxlength}
        </View>
      )}
    </View>
  )
}

const MMTextarea = memo(Component)
export default MMTextarea
