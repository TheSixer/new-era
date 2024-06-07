import Taro, { getCurrentPages, useRouter } from '@tarojs/taro'
import { FC, memo, useMemo } from 'react'
import styles from './index.module.less'
import MMNavigation from '@wmeimob/taro-design/src/components/navigation'
import { PageContainer } from '@wmeimob/taro-design'
import useDecoration from '../../hooks/useDecoration'
import PageModules from '../../components/pageModules'
import MMIconFont from '@wmeimob/taro-design/src/components/icon-font'
import MMIconFontName from '@wmeimob/taro-design/src/components/icon-font/const'
import { routeNames } from '../../routes'

interface IDecorationProps {}

/**
 * 自定义装修页面
 * @returns
 */
const Component: FC<IDecorationProps> = () => {
  const { params = {} } = useRouter()
  const { modules, title } = useDecoration(params.id || params.scene)

  const isOnlyOnePage = useMemo(() => getCurrentPages().length === 1, [])

  const homeButton = isOnlyOnePage ? <MMIconFont value={MMIconFontName.Index} onClick={() => Taro.switchTab({ url: routeNames.tabBarHome })} /> : undefined

  return (
    <PageContainer className={styles.decorationStyle}>
      <MMNavigation title={title} renderLeft={homeButton} />
      <PageModules data={modules} />
    </PageContainer>
  )
}

const Decoration = memo(Component)
export default Decoration
