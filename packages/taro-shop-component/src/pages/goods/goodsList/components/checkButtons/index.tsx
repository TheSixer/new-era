import Taro from '@tarojs/taro'
import { FC, memo, useCallback } from 'react'
import { View, Text } from '@tarojs/components'
import { ICheckButtonsData, ICheckButtonsProps } from './const'
import styles from './index.module.less'
import classNames from 'classnames'

const Component: FC<ICheckButtonsProps> = (props) => {
  const { value = [], options = [] } = props

  const handleClick = useCallback(
    (option: ICheckButtonsData, index: number) => {
      const isActive = value.indexOf(option.value) !== -1
      let changeValue = [...value]
      changeValue = isActive ? value.filter((it) => it !== option.value) : value.concat(option.value)
      props.onChange?.(changeValue, option, index)
    },
    [value]
  )

  return (
    <View className={styles.checkButtonsStyle}>
      {options.map((option, index) => {
        return (
          <View key={option.value} className={styles.checkButtonsItem} style={{ width: '33.3333%' }}>
            <View className={classNames(styles.item, value.indexOf(option.value) !== -1 && styles.active)} onClick={() => handleClick(option, index)}>
              <Text>{option.label}</Text>
            </View>
          </View>
        )
      })}
    </View>
  )
}

const CheckButtons = memo(Component)
export default CheckButtons
