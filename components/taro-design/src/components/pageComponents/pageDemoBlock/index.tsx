import { memo, FC } from 'react'
import { IPageDemoBlockProps } from './const'
import styles from './index.module.less'
import MMCard from '~/components/card'

const Component: FC<IPageDemoBlockProps> = props => {
  const { children, ...rest } = props

  return (
    <MMCard {...rest} className={styles.pageDemoBlockStyle}>
      {children}
    </MMCard>
  )
}

const PageDemoBlock = memo(Component)
export default PageDemoBlock
