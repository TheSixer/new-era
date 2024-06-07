import { FC, memo, ReactNode } from 'react'
// import styles from './index.module.less'
import { Card, Typography } from 'antd'
import StatisticCardGroup from './Group'

interface IStatisticCardProps {
  title: ReactNode

  value: ReactNode
}

const Component: FC<IStatisticCardProps> = (props) => {
  const { title, value } = props

  return (
    <Card>
      <Typography.Title level={4}>{value}</Typography.Title>
      <Typography.Text type="secondary">{title}</Typography.Text>
    </Card>
  )
}

Component.displayName = 'StatisticCard'

const StatisticCard = memo(Component) as unknown as React.NamedExoticComponent<IStatisticCardProps> & { Group: typeof StatisticCardGroup }
StatisticCard.Group = StatisticCardGroup
export default StatisticCard
