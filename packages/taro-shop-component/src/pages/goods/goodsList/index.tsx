import Taro, { useRouter } from '@tarojs/taro'
import { FC, memo, useCallback, useEffect, useRef, useState } from 'react'
import { Image, View } from '@tarojs/components'
import styles from './index.module.less'
import { ISearchProps } from './const'
import MMNavigation from '@wmeimob/taro-design/src/components/navigation'
// import iconFilter from '~/assets/images/search/icon_filter.png'
import iconGrid from '~/assets/images/search/icon_grid.png'
import iconGridList from '~/assets/images/search/icon_grid_list.png'
import MMSearchInput from '@wmeimob/taro-design/src/components/search-input'
import useMMPullToRefresh from '@wmeimob/taro-design/src/components/pull-to-refresh/useMMPullToRefresh'
import MMPullToRefresh from '@wmeimob/taro-design/src/components/pull-to-refresh'
import { api } from '@wmeimob/taro-api'
import GoodList from '../../../components/good/goodList'
import { PageContainer, useToast } from '@wmeimob/taro-design'
import MMFixHead from '@wmeimob/taro-design/src/components/fix-head'
import MmCategorys from '@wmeimob/taro-pages/src/components/mmCategorys'
import Sorts from '../../../components/sorts'
import { EGoodListType } from '../../../components/good/goodList/const'
import { ISortData } from '../../../components/sorts/const'
import { useService as useClassifyService } from '@wmeimob/taro-pages/src/pages/classifys'
import MasonryList from '../../../components/masonryList'
import iconCategory from './images/icon_category.png'
import icon_category_active from './images/icon_category_active.png'
import iconEmpty from './images/icon_empty.png'
import classNames from 'classnames'
import MMEmpty from '@wmeimob/taro-design/src/components/empty'
import { navByLink } from '../../../components/pageModules/utils'
import { EJumpType } from '@wmeimob-modules/decoration-data/src/enums/EJumpType'
import { IGoodsVoWithActivity } from '@wmeimob/taro-api/src/types/goods/IGoodsVoWithActivity'
import { getActivityFormatText, getValidActivities } from '@wmeimob/shop-data/goods/utils/activities'

const { Grid, Item } = EGoodListType

const searchValueLimit = 20 // 20 字符

const Component: FC<ISearchProps> = () => {
  const [toast] = useToast()
  const [searchValue, setSearchValue] = useState('') // 搜索值
  const [listType, setListType] = useState(Grid) // 列表排序
  const [classifyVisible, setClassifyVisible] = useState(false) // 显示分类
  const [classifyFilter, setClassifyFilter] = useState(false) // 显示是否筛选分类

  const { classifies } = useClassifyService({ request: () => api['/wechat/goods/classify_GET']({}) })

  const { params } = useRouter()
  const [paramsObj, setParamsObj] = useState({
    classifyId: params.classifyId,
    classifyPid1: params.classifyPid
  })
  // 排序数据
  const { selectSortType, setSelectSortType, sortsData, valueMap } = useSort()
  // 下拉刷新
  const [info, pullToRefreshProps] = useMMPullToRefresh<IGoodsVoWithActivity>({
    initRequest: false,
    dataFormat: (list) => {
      return list.map((item) => {
        const activities = getValidActivities(item.marketingActivityList || [])
        const format = activities.reduce<string[]>((result, activity) => result.concat(getActivityFormatText(activity).map(({ text }) => text)), [])

        return {
          ...item,
          formatActivitiesText: format
        }
      })
    },
    getData: (queryParams) => api['/wechat/goods_POST']({ ...paramsObj, ...queryParams, selectSortType: Number(selectSortType), goodsName: searchValue })
  })

  useEffect(() => {
    Promise.resolve(pullToRefreshProps.onRefresh()).then(() => {
      toast?.hideLoading()
    })
  }, [selectSortType, paramsObj, searchValue])

  const handleSearch = (value: string) => {
    const _value = value.trim().slice(0, searchValueLimit)
    setSearchValue(_value)
  }

  // 点击排序
  const handleSortChange = (_item, value, sort) => {
    toast?.loading({ hidden: true })
    setClassifyVisible(false) // 点击排序 隐藏分类
    const key = [value, sort].filter((it) => !!it).join(',')
    setSelectSortType(valueMap.current[key])
  }

  const jumpToDetail = useCallback((item) => {
    navByLink(EJumpType.GoodDetail, { goodsNo: item.goodsNo })
    // Taro.navigateTo({ url: routeNames.goodsGoodDetail, params: { goodsNo: item.goodsNo } })
  }, [])

  return (
    <PageContainer className={styles.searchStyle} noPlace>
      <MMFixHead>
        <MMNavigation title="商品列表" />
        {/* 搜索框 */}
        <View className={styles.searchBox}>
          <MMSearchInput
            defaultValue={searchValue}
            clear
            renderSuffix={
              <Image
                src={listType === Grid ? iconGridList : iconGrid}
                className={styles.listType_icon}
                onClick={() => setListType(listType === Grid ? Item : Grid)}
              />
            }
            onClear={() => {
              setSearchValue('')
            }}
            onSearch={handleSearch}
          />
        </View>

        <View className={classNames(styles.filterBar, (listType === EGoodListType.Grid || classifyVisible || info.isEmpty) && styles.filterShadowBar)}>
          {/* 排序 */}
          <Sorts data={sortsData} onSortChange={handleSortChange} />
          {/* 分类 */}
          {!params.classifyId && (
            <View
              className={styles.classifyBox}
              onClick={() => {
                if (classifyFilter) {
                  setClassifyFilter(!classifyFilter)
                  setParamsObj({
                    classifyId: params.classifyId,
                    classifyPid1: params.classifyPid
                  })
                } else {
                  setClassifyVisible(!classifyVisible)
                }
              }}
            >
              <View className={classNames(styles.classify, (classifyFilter || classifyVisible) && styles.classify_active)}>
                <View>分类</View>
                <Image src={classifyFilter || classifyVisible ? icon_category_active : iconCategory} className={styles.icon_category} />
              </View>
            </View>
          )}
          {/* 筛选 */}
          {/* <View className={styles.classifyBox} onClick={() => setShowFilterDrawer(true)}>
                <View className={styles.classify}>筛选</View>
              </View> */}
        </View>
      </MMFixHead>

      {/* 商品列表 */}
      <View className={styles.listContent}>
        {!classifyVisible && (
          <MMPullToRefresh
            {...pullToRefreshProps}
            noMoreTextDelay={300}
            style={{ height: '100%' }}
            empty={info.isEmpty && <MMEmpty src={iconEmpty} text="未搜索到相关数据" imgStyle={{ width: 160, height: 160, marginBottom: 15 }} fixed />}
          >
            {listType === EGoodListType.Item ? (
              <GoodList list={info.list} type={EGoodListType.Item} onClick={jumpToDetail} />
            ) : (
              <View className={styles.masonryList}>
                <MasonryList data={info.list} onClick={jumpToDetail} />
              </View>
            )}
          </MMPullToRefresh>
        )}

        {classifyVisible && (
          <View className={styles.classifyContent}>
            <MmCategorys
              data={classifies}
              onClick={(item) => {
                const { id, pid } = item.origin
                setParamsObj((pre) => ({ ...pre, classifyId: `${id!}`, classifyPid1: `${pid!}` }))
                setClassifyVisible(false)
                setClassifyFilter(true)
              }}
            />
          </View>
        )}
      </View>

      {/* 筛选框 */}
      {/* <FilterDrawer visible={showFilterDrawer} onCancel={() => setShowFilterDrawer(false)} onOk={() => setShowFilterDrawer(false)} /> */}
    </PageContainer>
  )
}

const Search = memo(Component)
export default Search

// 排序相关数据
function useSort() {
  const [selectSortType, setSelectSortType] = useState('1')
  const [sortsData] = useState<ISortData[]>([
    { label: '综合', value: 'default' },
    { label: '销量', value: 'sales', sort: 'asc' },
    { label: '价格', value: 'price', sort: 'asc' }
    // { label: '时间', value: 'time', sort: 'asc' }
  ])

  const valueMap = useRef({
    default: '1',
    'sales,desc': '2',
    'sales,asc': '3',
    'price,desc': '4',
    'price,asc': '5',
    'time,desc': '6',
    'time,asc': '7'
  })

  return {
    selectSortType,
    setSelectSortType,
    sortsData,
    valueMap
  }
}

/**
 * 侧边栏筛选
 *
 * @description 代码注释。可以解开来看一下
 * @returns
 */
function useFilterDrawer() {
  const [showFilterDrawer, setShowFilterDrawer] = useState(false) // 显示筛选侧边栏

  return {
    showFilterDrawer,
    setShowFilterDrawer
  }
}
