import { BasicModuleSignEnum } from '@wmeimob-modules/decoration-data/src/enums/BasicModuleSignEnum'
import classNames from 'classnames'
import { CSSProperties, FC, memo, useMemo } from 'react'
import { initContextValue } from '../store-context'
import styles from './index.module.less'

export interface IModuleInfoCardProps {
  /** 类型 */
  type: BasicModuleSignEnum
  /**
   * 文本
   * 修改文本内容或者控制是否显示文本
   */
  text?: string | boolean

  className?: string

  style?: CSSProperties
}

const Component: FC<IModuleInfoCardProps> = (props) => {
  const { type, text = true, className, style } = props

  const { modules } = initContextValue
  const module = useMemo(() => {
    const { moduleInfo } = modules.find(({ moduleInfo }) => moduleInfo.type === type) || {}
    const { cname = '', icon = '' } = moduleInfo || {}
    return {
      text: typeof text === 'boolean' ? (text ? cname : '') : text || cname,
      icon
    }
  }, [text, type])

  return (
    <div className={classNames(styles.moduleInfoCardStyle, className)} style={style}>
      <img draggable="false" src={module.icon} className={styles.img} />
      <div className={styles.moduleInfoCardStyle_text}>{module.text}</div>
    </div>
  )
}

Component.displayName = 'ModuleInfoCard'

const ModuleInfoCard = memo(Component)
export default ModuleInfoCard
