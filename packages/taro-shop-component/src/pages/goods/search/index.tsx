import Taro, { useRouter } from '@tarojs/taro'
import { FC, memo, useCallback, useEffect, useRef, useState } from 'react'
import { View } from '@tarojs/components'
import styles from './index.module.less'
import { ISearchProps } from './const'
import MMNavigation from '@wmeimob/taro-design/src/components/navigation'
import { PageContainer } from '@wmeimob/taro-design'
import MMFixHead from '@wmeimob/taro-design/src/components/fix-head'
import MMSearchInput from '@wmeimob/taro-design/src/components/search-input'
import QuickSearch from './components/quickSearch'
import useRecentSearch from './useRecentSearch'
import useMMPullToRefresh from '@wmeimob/taro-design/src/components/pull-to-refresh/useMMPullToRefresh'
import { api } from '@wmeimob/taro-api'
import MMPullToRefresh from '@wmeimob/taro-design/src/components/pull-to-refresh'
import MasonryList from '../../../components/masonryList'
import MMEmpty from '@wmeimob/taro-design/src/components/empty'
import iconEmpty from './images/icon_empty.png'
import HotKeyword from './components/hotKeyword'
import { systemConfig } from '../../../config'
import { navByLink } from '../../../components/pageModules/utils'
import { EJumpType } from '@wmeimob-modules/decoration-data/src/enums/EJumpType'

const { config } = systemConfig

const searchValueLimit = 20 // 20 字符

const Component: FC<ISearchProps> = () => {
  // const [searchValue, setSearchValue] = useState<string>()
  const { params } = useRouter()
  const placeholder = useRef(params.keyword ? decodeURIComponent(params.keyword) : '')

  const [updateSearchValue, setUpdateSearchValue] = useState<number>()
  const searchValue = useRef<string>()

  const [focus, setFocus] = useState(true)

  // 最近搜索
  const [values, dispatch] = useRecentSearch([])

  // 下拉刷新
  const [info, pullToRefreshProps] = useMMPullToRefresh({
    initRequest: false,
    getData: (queryParams) => api['/wechat/goods_POST']({ ...queryParams, goodsName: searchValue.current })
  })

  // const { showFilterDrawer, setShowFilterDrawer } = useFilterDrawer()

  useEffect(() => {
    // 防止进页面就触发
    if (updateSearchValue === undefined) return

    pullToRefreshProps.onRefresh({ clearList: true })
    setFocus(false)
  }, [updateSearchValue])

  function emitSearch(value = '') {
    searchValue.current = value
    setUpdateSearchValue(Date.now())
  }

  // 点击搜索历史
  const handleQuickSearchClick = (value = '') => {
    emitSearch(value)
    dispatch({ type: 'click', value })
  }

  const handleSearch = (value = '') => {
    const _value = value.trim().slice(0, searchValueLimit) || placeholder.current
    placeholder.current = ''
    emitSearch(_value)
    setFocus(false)
    dispatch({ type: 'add', value: _value })
  }

  const jumpToDetail = useCallback((item) => {
    navByLink(EJumpType.GoodDetail, { goodsNo: item.goodsNo })
    // Taro.navigateTo({ url: routeNames.goodsGoodDetail, params: { goodsNo: item.goodsNo } })
  }, [])

  return (
    <PageContainer className={styles.searchStyle} noPlace>
      <MMFixHead>
        <View className={styles.head}>
          <MMNavigation title="搜索" className={styles.boxShadow} />
          <View className={styles.head_search}>
            <MMSearchInput
              defaultValue={searchValue.current}
              focus={focus}
              searchText=""
              onFocus={() => {
                setFocus(true)
              }}
              onSearch={handleSearch}
              placeholder={placeholder.current || '输入商品名称搜索'}
            />
          </View>
        </View>
      </MMFixHead>

      <View className={styles.content}>
        {focus && (
          <View className={styles.searchModule}>
            {/* 历史记录 */}
            <QuickSearch values={values} onClear={() => dispatch({ type: 'empty' })} onClick={handleQuickSearchClick} />

            <View className="spacing" />

            {/* 热词列表 */}
            {config.enableHotKeyword && <HotKeyword onQuickSearch={handleQuickSearchClick} />}
          </View>
        )}

        {!focus && (
          <MMPullToRefresh
            {...pullToRefreshProps}
            noMoreTextDelay={300}
            style={{ height: '100%' }}
            empty={info.isEmpty && <MMEmpty src={iconEmpty} text="未搜索到相关数据" imgStyle={{ width: 160, height: 160, marginBottom: 15 }} fixed />}
          >
            <View className={styles.masonryList}>
              <MasonryList data={info.list} onClick={jumpToDetail} />
            </View>
          </MMPullToRefresh>
        )}
      </View>
    </PageContainer>
  )
}

const Search = memo(Component)
export default Search
