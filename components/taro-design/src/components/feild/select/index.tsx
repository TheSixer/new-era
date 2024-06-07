import Taro from '@tarojs/taro'
import { forwardRef, memo, useEffect, useMemo, useState } from 'react'
import { Text, View } from '@tarojs/components'
import styles from './index.module.less'
import { ISelectProps } from './const'
import FeildContainer from '../container'
import MMPopup from '../../popup'
import MMCell from '../../cell'
import MMCheckbox from '../../checkbox'
import MMButton from '../../button'
import useFeildRef from '../hooks/useFeildRef'
import { IFeildRef } from '../const'

/**
 *
 * Field 选择框
 * @param props
 * @returns
 */
const Component = forwardRef<IFeildRef, ISelectProps>((props, ref) => {
  const { value, options = [], rules = [], required, placeholder = '请选择', fieldProps, onShowChange } = props
  const [visible, setVisible] = useState(false)
  const [innerValue, setInnerValue] = useState(value)

  const { errorMsg, setErrorMsg, valid, showRequired } = useFeildRef({ rules, value, placeholder, required, ref })

  useEffect(() => {
    setInnerValue(value)
  }, [value])

  const lable = useMemo(() => {
    const name = options.find((sel) => sel.value === value)?.label
    return name
  }, [value])

  return (
    <>
      <FeildContainer
        {...props}
        required={showRequired}
        errorMsg={errorMsg}
        renderProps={
          <View
            onClick={() => {
              !props.readonly && setVisible(true)
              onShowChange?.(true)
            }}
          >
            {lable || <Text className={styles.placeholder}>{placeholder}</Text>}
          </View>
        }
      >
        {props.children}
      </FeildContainer>

      <MMPopup
        {...fieldProps}
        visible={visible}
        title={fieldProps?.title || props.label}
        footer={
          <MMButton
            block
            onClick={() => {
              setVisible(false)
              onShowChange?.(false)
              setErrorMsg('')
              props.onChange?.(innerValue)
            }}
          >
            确定
          </MMButton>
        }
        onClose={() => {
          setVisible(false)
          onShowChange?.(false)
        }}
      >
        {options.map((option) => (
          <View key={option.value} onClick={() => setInnerValue(option.value)}>
            <MMCell
              size="large"
              border
              style={{
                paddingLeft: 0,
                paddingRight: 0
              }}
            >
              <View className={styles.option}>
                <View className={styles.optionsLabel}>{option.label}</View>
                <MMCheckbox value={innerValue === option.value} size={15} />
              </View>
            </MMCell>
          </View>
        ))}
      </MMPopup>
    </>
  )
})

const MMFeildSelect = memo(Component)
MMFeildSelect.displayName = 'MMFeildSelect'
export default MMFeildSelect
