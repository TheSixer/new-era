import { FC, memo, useMemo, useState } from 'react'
import { View, Image, Text } from '@tarojs/components'
import { ISortData, ISortsProps } from './const'
import styles from './index.module.less'
import classNames from 'classnames'
import iconSort from './icon_sort.png'

export { ISortData }
/**
 * 排序组件
 *
 * @param {*} props
 * @return {*}
 */
const Component: FC<ISortsProps> = (props) => {
  const { data = [] } = props

  const [currentItem, setCurrentItem] = useState<any>({ label: '综合', value: 'default' })

  const width = useMemo(() => (!data.length ? '100%' : `${(100 / data.length).toFixed(6)}%`), [data])

  const iconStyle = useMemo(() => {
    return !currentItem || currentItem.sort === 'asc' ? {} : { transform: 'rotate(180deg)' }
  }, [currentItem])

  const handleItemClick = (item: ISortData) => {
    const { value } = item
    let { sort } = item
    let newItem = { ...item }

    // 非首次点击
    if (currentItem) {
      // 点击自己
      if (value === currentItem.value) {
        // 自己如果没有排序。则不管
        if (sort === undefined) {
          return
        }
        // 有排序则倒转
        sort = currentItem.sort === 'asc' ? 'desc' : 'asc'
        newItem = { ...newItem, sort }
      }
    }

    setCurrentItem(newItem)
    props.onSortChange?.(newItem, value, sort)
  }

  return (
    <View className={styles.sortsStyle}>
      {data.map((item) => {
        const { value, label } = item
        const isActive = currentItem?.value === item.value

        return (
          <View
            key={value + label}
            style={{ width }}
            className={classNames(styles.sortItem, isActive && styles.sortItem_active)}
            onClick={() => handleItemClick(item)}
          >
            <Text>{item.label}</Text>
            <View className={styles.iconSort}>
              {!!item.sort && isActive && <Image src={iconSort} className={styles.iconSort} style={isActive ? iconStyle : {}} />}
            </View>
          </View>
        )
      })}
    </View>
  )
}

const Sorts = memo(Component)
export default Sorts
