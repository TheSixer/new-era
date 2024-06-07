import { ProFormDigit } from '@ant-design/pro-form'
import { Space } from 'antd'
import { FC, memo } from 'react'
import styles from './index.module.less'

interface ILevelConditionProps {
  index: number

  /** 总行数 */
  count: number

  conditionLabel: string
}

const Component: FC<ILevelConditionProps> = (props) => {
  const { index, conditionLabel, count } = props

  return (
    <Space className={styles.levelConditionStyle}>
      <span>等级{index + 1}</span>

      <ProFormDigit name="valueStart" rules={[{ required: true }]} fieldProps={{ precision: 0, min: 0, max: 99999999, disabled: true }} />

      <span>{`<= ${conditionLabel} <`}</span>

      <ProFormDigit name="valueEnd" rules={[{ required: true }]} fieldProps={{ precision: 0, min: 1, max: 99999999, disabled: index === count - 1 }} />
    </Space>
  )
}

const LevelCondition = memo(Component)
export default LevelCondition
