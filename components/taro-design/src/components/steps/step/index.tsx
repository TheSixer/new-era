import { memo, useContext, FC } from 'react'
import { View } from '@tarojs/components'
import { IStepProps } from './const'
import styles from './index.module.less'
import { StepContext } from '../const'
import classnames from 'classnames'

/**
 * 步骤条
 *
 * @warning 必须配合MMSteps组件使用
 * @param props
 * @returns
 */
const Component: FC<IStepProps> = props => {
  const { title = '' } = props
  const { last, index } = props as any // 这个是Steps父组件提供的。

  const { active } = useContext(StepContext)

  return (
    <View className={classnames(styles.stepStyle, active >= index && styles.active)}>
      {/* 左边点线 */}
      <View className={styles.stepStyle_left}>
        <View className={styles.dot} />
        {!last && <View className={styles.line} />}
      </View>

      <View>
        {/* 标题 */}
        <View className={styles.title}>{title}</View>
        {/* 内容 */}
        <View className={styles.content}>{props.children}</View>
      </View>
    </View>
  )
}

const MMStep = memo(Component)
export default MMStep
