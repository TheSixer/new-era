import Taro, { getCurrentPages, useRouter } from '@tarojs/taro'
import { PageContainer } from '@wmeimob/taro-design'
import MMIconFont from '@wmeimob/taro-design/src/components/icon-font'
import MMIconFontName from '@wmeimob/taro-design/src/components/icon-font/const'
import MMNavigation from '@wmeimob/taro-design/src/components/navigation'
import { FC, memo, useMemo } from 'react'
import { routeNames } from '../../../routes'
import GoodsOff from './components/goodsOff'
import { IGoodDetailProps, IRouteParams } from './const'
import GoodDetailContext, { createGoodDetailValue } from './context'
import Detail from './detail'
import styles from './index.module.less'

const Component: FC<IGoodDetailProps> = () => {
  const isOnlyOnePage = useMemo(() => getCurrentPages().length === 1, [])
  const contextValue = createGoodDetailValue()
  const { isOff } = contextValue

  const homeButton = isOnlyOnePage ? <MMIconFont value={MMIconFontName.Index} onClick={() => Taro.switchTab({ url: routeNames.tabBarHome })} /> : undefined

  if (isOff) {
    return (
      <PageContainer className={styles.goodDetailStyle}>
        <MMNavigation title="商品详情" renderLeft={homeButton} />
        <GoodsOff />
      </PageContainer>
    )
  }

  return (
    <PageContainer className={styles.goodDetailStyle} noPlace>
      <GoodDetailContext.Provider value={contextValue}>
        <Detail />
      </GoodDetailContext.Provider>
    </PageContainer>
  )
}

const GoodDetail = memo(Component)
export default GoodDetail
