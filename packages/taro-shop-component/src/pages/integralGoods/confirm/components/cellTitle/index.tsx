import { memo, ReactNode, FC } from 'react'
import { View } from '@tarojs/components'
import styles from './index.module.less'

interface ICellTitleProps {
  title?: ReactNode
}

const Component: FC<ICellTitleProps> = (props) => {
  const { title } = props

  return <View className={styles.cellTitleStyle}>{title}</View>
}

const CellTitle = memo(Component)
export default CellTitle
