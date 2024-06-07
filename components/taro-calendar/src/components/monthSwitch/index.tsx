import MMIconFont from '@wmeimob/taro-design/src/components/icon-font'
import MMIconFontName from '@wmeimob/taro-design/src/components/icon-font/const'
import dayjs from 'dayjs'
import { FC, memo } from 'react'
import styles from './index.module.less'
import { View } from '@tarojs/components'

interface IMonthSwitchProps {
  current?: dayjs.Dayjs
  format?: string
  switchMonth?: boolean
  // switchYear?: boolean
  onChange?(value: dayjs.Dayjs): void
}

const Component: FC<IMonthSwitchProps> = (props) => {
  const { current = dayjs(), switchMonth = true, format = 'YYYY年MM月', onChange = () => {} } = props

  const handleChange = (type: 'prevMonth' | 'nextMonth' | 'prevYear' | 'nextYear') => {
    switch (type) {
      case 'prevMonth':
        return onChange(current.subtract(1, 'month'))
      case 'prevYear':
        return onChange(current.subtract(1, 'year'))
      case 'nextMonth':
        return onChange(current.add(1, 'month'))
      case 'nextYear':
        return onChange(current.add(1, 'year'))
    }
  }

  /* const renderDoubleArrow = (isLeft: boolean, onClick: Function) =>
    switchYear ? (
      <View className={classNames(styles.doubleArrow, isLeft && styles.doubleArrow__isLeft)} onClick={() => onClick()}>
        <MMIconFont size={12} value={MMIconFontName.Back} />
        <MMIconFont className={styles.arrow} size={12} value={MMIconFontName.Back} />
      </View>
    ) : null */

  return (
    <View className={styles.monthSwitch}>
      {/* {renderDoubleArrow(false, () => handleChange('prevYear'))} */}

      {switchMonth && (
        <View className={styles.monthArrow} onClick={() => handleChange('prevMonth')}>
          <MMIconFont size={12} value={MMIconFontName.Back} />
        </View>
      )}

      <View className={styles.value}>{current?.format(format)}</View>

      {switchMonth && (
        <View className={styles.monthArrow} onClick={() => handleChange('nextMonth')}>
          <MMIconFont size={12} value={MMIconFontName.Next} />
        </View>
      )}

      {/* {renderDoubleArrow(true, () => handleChange('nextYear'))} */}
    </View>
  )
}

const MMMonthSwitch = memo(Component)
export default MMMonthSwitch
