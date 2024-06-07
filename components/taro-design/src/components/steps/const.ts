import { createContext } from 'react'

export interface IStepsProps {
  /**
   * 当前步骤对应的索引值
   */
  active: number
}

export interface IStepsContext {
  active: number

  childCount: number
}

export const StepContext = createContext<IStepsContext>(null as any)
