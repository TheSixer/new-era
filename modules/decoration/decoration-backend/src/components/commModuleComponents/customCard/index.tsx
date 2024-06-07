import classnames from 'classnames'
import { CSSProperties, FC, memo, PropsWithChildren } from 'react'
import styles from './index.module.less'

interface ICustomCardProps {
  title?: string

  className?: any

  style?: CSSProperties
}

/**
 * 简单卡片。
 *
 * 内置卡片组件
 * @param props
 * @returns
 */
const Component: FC<PropsWithChildren<ICustomCardProps>> = (props) => {
  const { title, className, style } = props

  return (
    <div className={classnames(styles.customCard, className)} style={style}>
      {!!title && <div className={styles.card_head}>{title}</div>}
      <div className={styles.card_content}>{props.children}</div>
    </div>
  )
}

Component.displayName = 'CustomCard'

const CustomCard = memo(Component)
export default CustomCard
