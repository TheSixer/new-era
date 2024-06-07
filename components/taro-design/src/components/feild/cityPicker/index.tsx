import Taro from '@tarojs/taro'
import { forwardRef, memo, PropsWithChildren, useMemo, useState } from 'react'
import { View, Text } from '@tarojs/components'
import { ICityPickerProps } from './const'
import FeildContainer from '../container'
import MMCitysPicker from '../../citys-picker'
import { IFeildRef } from '../const'
import useFeildRef from '../hooks/useFeildRef'

const Component = forwardRef<IFeildRef, PropsWithChildren<ICityPickerProps>>((props, ref) => {
  const { value = [], placeholder = '请选择', required, rules = [], onChange } = props
  const [visible, setVisible] = useState(false)

  const { errorMsg, setErrorMsg, valid, showRequired } = useFeildRef({ rules, value, placeholder, required, ref })

  const text = useMemo(() => value.map((it) => it.text || '').join(','), [value])

  return (
    <>
      <FeildContainer
        {...props}
        required={showRequired}
        errorMsg={errorMsg}
        renderProps={
          <View onClick={() => !props.readonly && setVisible(true)} style={{ width: '100%' }}>
            {text || <Text style={{ fontSize: 14, fontWeight: 400, color: '#999999' }}>{placeholder}</Text>}
          </View>
        }
      >
        {props.children}
      </FeildContainer>

      <MMCitysPicker
        value={value}
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={async (data) => {
          setVisible(false)
          await valid(data, placeholder)
          setErrorMsg('')
          onChange?.(data)
        }}
      />
    </>
  )
})

const MMFeildCityPicker = memo(Component)
MMFeildCityPicker.displayName = 'MMFeildCityPicker'
export default MMFeildCityPicker
