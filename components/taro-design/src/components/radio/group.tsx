import React, { memo, FC, PropsWithChildren } from 'react'
import { View } from '@tarojs/components'
import { EMMRadioDirection, EMMRadioType, IMMRadioGroupProps, IMMRadioProps } from './const'
import styles from './index.module.less'
import classNames from 'classnames'

const Component: FC<PropsWithChildren<IMMRadioGroupProps>> = (props) => {
  const { value, direction = EMMRadioDirection.vertical, optionType = EMMRadioType.default, allowUnCheck = false, onChange } = props

  return (
    <View
      className={classNames(styles.radioGroupStyle, props.className)}
      style={{ ...props.style, display: direction === EMMRadioDirection.horizontal ? 'flex' : undefined }}
    >
      {React.Children.map(props.children, (child, index) => {
        const { props: childProps = {}, type } = child as any

        return type?.displayName === 'MMRadio'
          ? React.cloneElement(
              child as any,
              {
                checked: value === childProps.value,
                type: optionType,
                size: props.size || childProps.size,
                style: {
                  ...childProps.style,
                  marginLeft: index !== 0 && direction === EMMRadioDirection.horizontal ? 20 : undefined
                },
                onChange: (checked: boolean) => {
                  if (allowUnCheck && childProps.value === value) {
                    onChange?.()
                  } else {
                    onChange?.(childProps.value)
                  }
                  return childProps?.onChange?.(checked)
                }
              } as IMMRadioProps
            )
          : child
      })}
    </View>
  )
}

const MMRadioGroup = memo(Component)
export default MMRadioGroup
