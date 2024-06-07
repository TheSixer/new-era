import { FC, memo, useContext, useMemo } from 'react'
import styles from './index.module.less'
import { DrayData } from '../const'
import { DeleteFilled } from '@ant-design/icons'
import classnames from 'classnames'
import StoreContext from '../store-context'

interface IModuleViewProps extends DrayData {
  /**
   * 是否被激活
   */
  active?: boolean

  /**
   * 点击删除
   */
  onDelete: () => void
}

const Component: FC<IModuleViewProps> = (props) => {
  const { undeletable = false, data, active = false, onDelete } = props
  const { modules } = useContext(StoreContext)

  // 渲染的组件view
  const Component = useMemo(() => {
    return modules.find(({ moduleInfo }) => moduleInfo.type === props.type)?.default ?? null
  }, [props.type])

  // 组件名称
  const name = useMemo(() => modules.find(({ moduleInfo }) => moduleInfo.type === props.type)?.moduleInfo?.cname, [props.type])

  return (
    <div className={classnames(styles.moduleViewStyle, active && styles.active)}>
      {!undeletable && (
        <div className={styles.tagWragger} onClick={(ev) => ev.stopPropagation()}>
          <div className={styles.tag}>
            <span>{name}</span>
            <DeleteFilled className={styles.delete} onClick={onDelete} />
          </div>
        </div>
      )}

      <div>{Component && <Component {...data} />}</div>
    </div>
  )
}

const ModuleView = memo(Component)
export default ModuleView
