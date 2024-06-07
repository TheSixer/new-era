import { FC, memo, PropsWithChildren } from 'react'
import styles from './index.module.less'
import { IRequiredStarProps } from './const'

const Component: FC<PropsWithChildren<IRequiredStarProps>> = (props) => {
  return <span className={styles.requiredStarStyle}>{props.children}</span>
}

Component.displayName = 'RequiredStar'

const RequiredStar = memo(Component)
export default RequiredStar
