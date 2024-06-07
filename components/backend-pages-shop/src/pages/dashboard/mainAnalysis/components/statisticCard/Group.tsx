import React, { FC, memo, Children } from 'react'
import styles from './index.module.less'

interface IStatisticCardProps {}

const Component: FC<IStatisticCardProps> = (props) => {
  return (
    <div className={styles.statisticCardGroup}>
      {Children.map(props.children, (child: any) => {
        return React.createElement('div', { style: { flex: 1, margin: '0 5px' } }, child)
      })}
    </div>
  )
}

const StatisticCardGroup = memo(Component)
export default StatisticCardGroup
