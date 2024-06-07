import { memo, FC, forwardRef } from 'react'
import { View, PickerView, PickerViewColumn } from '@tarojs/components'
import { IMMPickerProps, IMMPickerRef, indicatorStyle, PICKER_ITEM_HEIGHT } from './const'
import styles from './index.module.less'
import classNames from 'classnames'
import { usePicker } from './usePicker'

const Component = forwardRef<IMMPickerRef, IMMPickerProps>((props, ref) => {
  const fieldKey = { label: 'label', value: 'value', children: 'children', ...props.fieldKey }

  const { innerList, innerIndex, handleChange } = usePicker(props, fieldKey, ref)

  return (
    <View className={classNames(styles.pickerStyle, props.className)} style={props.style}>
      <PickerView
        value={innerIndex}
        className={styles.mmPickerView}
        indicatorStyle={`height:${PICKER_ITEM_HEIGHT}px;line-height:${PICKER_ITEM_HEIGHT}px;`}
        onChange={handleChange}
      >
        {innerList.map((item, index) => {
          return (
            <PickerViewColumn key={item.id}>
              {item.data.map((it, itemIndex) => (
                <View
                  key={it[fieldKey.value] + index}
                  className={classNames(styles.mmPickerView_view, itemIndex === innerIndex[index] && styles.mmPickerView_view_active)}
                  style={indicatorStyle}
                >
                  {it[fieldKey.label]}
                </View>
              ))}
            </PickerViewColumn>
          )
        })}
      </PickerView>
    </View>
  )
})

const MMPicker = memo(Component)
export default MMPicker
