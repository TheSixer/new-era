import { View } from '@tarojs/components'
import React, { FC, memo, useContext, useEffect, useRef, useState } from 'react'
import fromValueVerification from './fromValueVerification'
import IFromItemProps from './IFromItemProps'
import { fromContext } from './useFromContext'
import * as styles from './styles'

const HTFromItem: FC<IFromItemProps> = memo((props) => {
  const { getValue, setValue, monitor } = useContext(fromContext)
  const [error, setError] = useState()

  const value = getValue(props.dataIndex)

  function onChange(value: any) {
    setValue(props.dataIndex, value)
  }

  const prevVerificationRef = useRef<any>()

  function verification() {
    let message
    props.rule?.find((rule) => {
      message = fromValueVerification(value, props, rule)
      return message
    })
    if (message) {
      setError(message)
      return message
    }
    return setError(undefined)
  }

  monitor.current.add(verification)
  monitor.current.remove(prevVerificationRef.current)
  prevVerificationRef.current = verification

  return (
    <>
      {React.Children.map(props.children, (child) => {
        const { props } = child as any
        return React.cloneElement(child as any, {
          error,
          value: props.value === undefined ? value : props.value,
          onChange: (...asg) => {
            props.onChange?.(...asg)
            return onChange(...asg)
          }
        })
      })}
      <View style={styles.error}>{error}</View>
    </>
  )
})

export default HTFromItem
