import { FC, memo, useEffect, useMemo, useState } from 'react'
import { View, Text } from '@tarojs/components'
import { ICitiesProps } from './const'
import styles from './index.module.less'
import { MMEmpty, PageContainer } from '@wmeimob/taro-design'
import { ArrowRightFilled, PositionFilled } from '../../../components/Icons'
import getParamsUrl from '@wmeimob/taro-utils/src/getParamsUrl'
import Taro from '@tarojs/taro'
import { ActivityCityOutputDto, api } from '@wmeimob/taro-api'
import { routeNames } from '../../../routes'
import emptyImg from '../../../assets/images/icon_empty.png'
import MMNavigation from '@wmeimob/taro-design/src/components/navigation'
import Searchbar from '../../../components/searchbar'
import { useAtom, useSetAtom } from 'jotai'
import { addressAtom } from '../prefecture/store'
import LoadingView from '../../../components/loadingView'

const Component: FC<ICitiesProps> = () => {
  const { cities, loading } = useBasicService()
  const [kw, setKw] = useState('')
  const dataFilter = useMemo(() => cities.filter((item) => !kw || item.province?.includes(kw)), [cities, kw])
  // const setAddressManagement = useSetAtom(addressAtom) // 地址管理atom
  const [address, setAddress] = useAtom(addressAtom)

  const back = (province?: string) => {
    setAddress({ ...address, province })
    Taro.navigateBack({
      delta: 1
    })
  }

  if (loading) {
    return <LoadingView />
  }

  return (
    <PageContainer className={styles.prefectureStyle} noPlace>
      <MMNavigation title='选择城市' type="Transparent" />
      
      <View className={styles.header}>
        <View className={styles.city_info}>
            <PositionFilled width="36rpx" height="36rpx" />
            <Text className={styles.city_title}>{address.province}（当前）</Text>
        </View>
        <Text className={styles.header__text}>{cities.length}个城市有活动</Text>
      </View>
    
      <Searchbar placeholder='搜索城市' onSearch={(value) => setKw(value)} />

      <View className={styles.city_list}>
        {
            dataFilter.map((city) => (
              <View className={styles.city_item} key={city.id} onClick={() => back(city.province)}>

                <Text className={styles.city_name}>{city.province}</Text>
                <View className={styles.city_item_right}>
                    <Text className={styles.city_item_right_text}>{city?.list?.length}个活动</Text>
                    <ArrowRightFilled />
                </View>
              </View>
            ))
        }

        {!loading && dataFilter.length === 0 && (<MMEmpty fixed text='暂时没有城市' src={emptyImg} imgStyle={{ width: '64rpx', height: '64rpx' }} />)}

      </View>

    </PageContainer>
  )
}

const Cities = memo(Component)
export default Cities

function useBasicService() {
  const [loading, setLoading] = useState(false)
  const [cities, setCities] = useState<ActivityCityOutputDto[]>([])

  async function getCityList() {
    setLoading(true)
    const { data = [] } = await api['/wechat/activity/cityList_GET']({})
    setCities(data)
    setLoading(false)
  }

  useEffect(() => {
    getCityList()
  }, [])

  function toActivityDetail(activity: ActivityCityOutputDto) {
    Taro.navigateTo({
      url: getParamsUrl(routeNames.eventsDetail,
        {
          id: activity.id
        })
    })
  }

  return {
    toActivityDetail,
    cities,
    loading
  }
}
