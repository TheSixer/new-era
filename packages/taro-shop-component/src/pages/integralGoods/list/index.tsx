import { Image, View } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import MMNavigation from '@wmeimob/taro-design/src/components/navigation'
import { FC, memo, useCallback, useEffect, useRef, useState } from 'react'
import styles from './index.module.less'
import MMEmpty from '@wmeimob/taro-design/src/components/empty'
import MMFixHead from '@wmeimob/taro-design/src/components/fix-head'
import MMPullToRefresh from '@wmeimob/taro-design/src/components/pull-to-refresh'
import useMMPullToRefresh from '@wmeimob/taro-design/src/components/pull-to-refresh/useMMPullToRefresh'
import MMSearchInput from '@wmeimob/taro-design/src/components/search-input'
import MmCategorys from '@wmeimob/taro-pages/src/components/mmCategorys'
import { useService as useClassifyService } from '@wmeimob/taro-pages/src/pages/classifys'
import classNames from 'classnames'
import IntegralGoodList from '../../../components/good/integralGoodList'
import { EGoodListType } from '../../../components/good/goodList/const'
import MasonryList from '../../../components/masonryList'
import Sorts from '../../../components/sorts'
import { ISortData } from '../../../components/sorts/const'
import { PageContainer, useToast } from '@wmeimob/taro-design'
import { api } from '@wmeimob/taro-api'
import { routeNames } from '../../../routes'
import iconCategory from './images/icon_category.png'
import icon_category_active from './images/icon_category_active.png'
import iconEmpty from './images/icon_empty.png'
import { EGoodsType } from '@wmeimob/shop-data/goods/enums/EGoodsType'
import GoodSkuPopup from '../../../components/good/goodSkuPopup'
import { confirmGoodsAtom } from '../confirm/store'
import { useSetAtom } from 'jotai'
import useGoodsSkuPopup from '../../../hooks/goods/useGoodsSkuPopup'
import { EOrderType } from '../confirm/const'
import MMButton from '@wmeimob/taro-design/src/components/button'
import { MMButtonType } from '@wmeimob/taro-design/src/components/button/const'
import getParamsUrl from '@wmeimob/taro-utils/src/getParamsUrl'

const { Grid, Item } = EGoodListType

const searchValueLimit = 20 // 20 字符

interface ISearchProps {
}

const Component: FC<ISearchProps> = () => {
  const [toast] = useToast()
  const [searchValue, setSearchValue] = useState('') // 搜索值
  const [listType, setListType] = useState(Item) // 列表排序
  const [classifyVisible, setClassifyVisible] = useState(false) // 显示分类
  const [classifyFilter, setClassifyFilter] = useState(false) // 显示是否筛选分类

  const { classifies } = useClassifyService({ request: () => api['/wechat/goods/classify_GET']({ goodsType: EGoodsType.Integral }) })

  const { params } = useRouter()
  const [paramsObj, setParamsObj] = useState({
    classifyId: params.classifyId,
    classifyPid1: params.classifyPid
  })
  // 排序数据
  const { selectSortType, setSelectSortType, sortsData, valueMap } = useSort()
  // 下拉刷新
  const [info, pullToRefreshProps] = useMMPullToRefresh({
    initRequest: false,
    getData: (queryParams) =>
      api['/wechat/goods_POST']({
        ...paramsObj,
        ...queryParams,
        selectSortType: Number(selectSortType),
        goodsName: searchValue,
        goodsType: EGoodsType.Integral
      })
  })

  const { skuProps, onBuy, open, cannotBuy } = useSku()

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
    Taro.navigateTo({ url: getParamsUrl(routeNames.integralGoodsDetail, { goodsNo: item.goodsNo }) })
  }, [])

  return (
    <PageContainer className={classNames(styles.searchStyle, info.isEmpty && styles.bg_white)} noPlace>
      <MMFixHead>
        <MMNavigation title='兑换商城' />
        {/* 搜索框 */}
        <View className={styles.searchBox}>
          <MMSearchInput
            defaultValue={searchValue}
            clear
            searchText=''
            onClear={() => {
              setSearchValue('')
            }}
            onSearch={handleSearch}
          />
        </View>

        <View
          className={classNames(styles.filterBar, (listType === EGoodListType.Grid || classifyVisible || info.isEmpty) && styles.filterShadowBar)}>
          {/* 排序 */}
          <Sorts data={sortsData} onSortChange={handleSortChange} />
          {/* 分类 */}
          <View className={styles.classifyBox} onClick={() => {
            if (classifyFilter) {
              setClassifyFilter(!classifyFilter)
              setParamsObj({
                classifyId: params.classifyId,
                classifyPid1: params.classifyPid
              })
            } else {
              setClassifyVisible(!classifyVisible)
            }
          }}>
            <View
              className={classNames(styles.classify, (classifyFilter || classifyVisible) && styles.classify_active)}>
              <View>分类</View>
              <Image src={classifyFilter || classifyVisible ? icon_category_active : iconCategory}
                     className={styles.icon_category} />
            </View>
          </View>
        </View>
      </MMFixHead>

      {/* 商品列表 */}
      <View className={styles.listContent}>
        {!classifyVisible && (
          <MMPullToRefresh
            {...pullToRefreshProps}
            noMoreTextDelay={300}
            style={{ height: '100%' }}
            empty={info.isEmpty &&
            <MMEmpty src={iconEmpty} text='未搜索到相关数据' imgStyle={{ width: 160, height: 160, marginBottom: 15 }} fixed />}
          >
            {listType === EGoodListType.Item ? (
              <IntegralGoodList list={info.list} type={EGoodListType.Item} onClick={jumpToDetail}
                                onBuy={(item) => open(item)} />
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

      {/* sku弹窗 */}
      <GoodSkuPopup
        {...skuProps}
        footer={
          <View className={styles.footer}>
            <MMButton type={MMButtonType.h5Red} className={styles.footer_button} onClick={() => onBuy()}
                      disabled={cannotBuy}>
              立即兑换
            </MMButton>
          </View>
        }
      />
    </PageContainer>
  )
}

const Search = memo(Component)
export default Search

/**
 * 排序
 * @returns
 */
function useSort() {
  const [selectSortType, setSelectSortType] = useState('1')
  const [sortsData] = useState<ISortData[]>([
    { label: '综合', value: 'default' },
    { label: '销量', value: 'sales', sort: 'asc' },
    { label: '时间', value: 'time', sort: 'asc' },
    { label: '积分', value: 'integral', sort: 'asc' }
  ])

  const valueMap = useRef({
    default: '1',
    'sales,desc': '2',
    'sales,asc': '3',
    'time,desc': '6',
    'time,asc': '7',
    'integral,desc': '8',
    'integral,asc': '9'
  })

  return {
    selectSortType,
    setSelectSortType,
    sortsData,
    valueMap
  }
}

function useSku() {
  const setConfirmGoodsAtom = useSetAtom(confirmGoodsAtom)

  const { cannotBuy, skuProps, open, onBuy } = useGoodsSkuPopup({
    type: 'list',
    onBuy(data) {
      setConfirmGoodsAtom([data])
      Taro.navigateTo({ url: getParamsUrl(routeNames.integralGoodsConfirm, { orderType: EOrderType.Buy }) })
    }
  })

  return {
    cannotBuy,
    skuProps,
    open,
    onBuy
  }
}
