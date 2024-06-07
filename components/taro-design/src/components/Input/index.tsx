import { Input, View } from '@tarojs/components'
import { InputProps } from '@tarojs/components/types/Input'
import React, { FC, memo } from 'react'

const MMInput: FC<InputProps & { onChange?: (value: string) => void }> = memo((props) => {
  return <Input {...props} onInput={(event) => props.onChange?.(event.detail.value)} />
})

export default MMInput
