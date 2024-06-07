import { Image, View } from '@tarojs/components'
import MMButton from '@wmeimob/taro-design/src/components/button'
import { FC, memo, ReactNode } from 'react'
import icon_score from '../../images/icon_score.png'
import { ITaskButtonMap } from './const'
import styles from './index.module.less'
import { MMButtonType } from '@wmeimob/taro-design/src/components/button/const'

interface ITaskCardProps {
  /** 完成后是否还能触发点击 */
  isFinishClick?: boolean
  name: ReactNode
  imgUrl?: string
  finish?: boolean
  rewardPoints?: number
  buttonMap: ITaskButtonMap
  onClick?(): void
}

const Component: FC<ITaskCardProps> = (props) => {
  const { name, imgUrl, finish, rewardPoints, buttonMap, isFinishClick } = props

  const noFinish = !finish // 任务未完成

  return (
    <View className={styles.taskCardStyle}>
      <View className={styles.task}>
        <Image src={imgUrl!} style={{ width: 40, height: 40, borderRadius: '50%', overflow: 'hidden' }} />

        <View className={styles.task_content}>
          <View className={styles.task_name}>
            <View>{name}</View>

            <Image src={icon_score} style={{ width: 16, height: 16, margin: '0 2px 0 10px' }} />

            <View className={styles.task_score}>+{rewardPoints}</View>
          </View>
          {buttonMap.description && <View className={styles.task_description}>{buttonMap.description}</View>}
        </View>

        <View>
          <MMButton
            size="small"
            type={!noFinish ? 'failure' : MMButtonType.default}
            onClick={() => {
              (noFinish || isFinishClick) && props.onClick?.()
            }}
          >
            {noFinish ? buttonMap.initText : buttonMap.okText}
          </MMButton>
        </View>
      </View>
    </View>
  )
}

const TaskCard = memo(Component)
export default TaskCard
