import Taro from '@tarojs/taro'
import { memo, PropsWithChildren, cloneElement, FC } from 'react'
import { View, Text } from '@tarojs/components'
import { IStepsProps, StepContext } from './const'
import styles from './index.module.less'
import Step from './step'

/**
 * Steps 步骤条
 * 用于展示操作流程的各个环节，让用户了解当前的操作在整体流程中的位置。
 *
 * @param props
 * @returns
 */
const Component: FC<PropsWithChildren<IStepsProps>> = props => {
  const { active = 0, children } = props

  // const Context = useContext(StepContext)
  const childCount = (children as any)?.length || 0

  return (
    <StepContext.Provider value={{ active, childCount }}>
      <View className={styles.stepsStyle}>{((children as any) || []).map((it, index) => cloneElement(it, { last: index === childCount - 1, index }))}</View>
    </StepContext.Provider>
  )
}

const MMSteps = (memo(Component) as any) as React.MemoExoticComponent<Taro.FC<IStepsProps>> & { Step: typeof Step }

MMSteps.Step = Step
export default MMSteps

export const MMStep = Step
