import { View } from '@tarojs/components'
import { memo, FC } from 'react'
import { ICellTitleProps } from './const'
import styles from './index.module.less'

const Component: FC<ICellTitleProps> = (props) => {
  const { title } = props

  return <View className={styles.cellTitleStyle}>{title}</View>
}

const CellTitle = memo(Component)
export default CellTitle
