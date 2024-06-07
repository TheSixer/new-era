import Taro, { useDidShow, useRouter } from '@tarojs/taro'
import { FC, memo, useMemo } from 'react'
import { Image, View } from '@tarojs/components'
import styles from './index.module.less'
import { EAddressType, IAddressListProps, IAddressListRouteParams } from './const'
import MMNavigation from '@wmeimob/taro-design/src/components/navigation'
import MMCard from '@wmeimob/taro-design/src/components/card'
import MMFixFoot from '@wmeimob/taro-design/src/components/fix-foot'
import MMButton from '@wmeimob/taro-design/src/components/button'
import MMPullToRefresh from '@wmeimob/taro-design/src/components/pull-to-refresh'
import useMMPullToRefresh from '@wmeimob/taro-design/src/components/pull-to-refresh/useMMPullToRefresh'
import { useSetAtom } from 'jotai'
import { addressAtom } from '../addressManagement/store'
import { addressAtom as confirmOrderAddressAtom } from '../../../order/confirmOrder/store'
import { addressAtom as integralConfirmOrderAddressAtom } from '../../../integralGoods/confirm/store'
import { routeNames } from '../../../../routes'
import { api } from '@wmeimob/taro-api'
import { UserAddressOutPutDto } from '@wmeimob/taro-api'
import { PageContainer, useDialog } from '@wmeimob/taro-design'
import MMEmpty from '@wmeimob/taro-design/src/components/empty'
import icon_empty from './icon_empty.png'
import { MMButtonType } from '@wmeimob/taro-design/src/components/button/const'

import delImg from './del.png'
import editImg from './edit.png'

const Component: FC<IAddressListProps> = () => {
  const { params = {} } = useRouter() as { params: IAddressListRouteParams }
  const dialog = useDialog()

  const [info, pullToRefresh] = useMMPullToRefresh({
    initRequest: false,
    params: { pageSize: 100 }, // 充当全量，若业务场景会超过该数值，可改大
    getData: (pa) => api['/wechat/mall/address/queryList_GET'](pa as any)
  })
  const setAddressManagement = useSetAtom(addressAtom) // 地址管理atom
  const setConfirmOrderAddress = useSetAtom(confirmOrderAddressAtom) // 确定订单atom
  const setIntegralConfirmOrderAddress = useSetAtom(integralConfirmOrderAddressAtom) // 积分确定订单atom

  const type = useMemo<EAddressType>(() => {
    return (params.type as EAddressType) || EAddressType.List
  }, [params.type])

  useDidShow(() => {
    pullToRefresh.onRefresh()
  })

  async function handleDel(id) {
    dialog?.show({
      title: '是否确认删除此地址？',
      okLoading: true,
      onOk: async () => {
        await api['/wechat/mall/address/delete/{id}_DELETE'](id)
        pullToRefresh.onRefresh()
      }
    })
  }

  function handleClickItem(item: UserAddressOutPutDto) {
    if (type === EAddressType.Choose) {
      Taro.navigateBack().then(() => {
        setConfirmOrderAddress(item)
        setIntegralConfirmOrderAddress(item)
      })
    }
  }

  function handleEditAddress(item: UserAddressOutPutDto) {
    setAddressManagement(item)
    Taro.navigateTo({ url: routeNames.mineAddressAddressManagement })
  }

  return (
    <PageContainer className={styles.addressListStyle}>
      <MMNavigation
        title="收货地址"
        beforeNavBack={() => {
          // 没点击列表项进行返回上一页时
          // 选择收货地址 如果有 修改/删除 前一个页面使用的addressAtom所对应的列表项，需要同步修改
          if (type === EAddressType.Choose) {
            // 前一页面没选地址
            if (!params.selectedId) {
              return true
            }

            const exist = info.list.find((item) => item.id === Number(params.selectedId))

            if (exist) {
              // 有修改
              setConfirmOrderAddress(exist)
              setIntegralConfirmOrderAddress(exist)
            } else {
              // 被删除了
              setConfirmOrderAddress({})
              setIntegralConfirmOrderAddress({})
            }
          }

          return true
        }}
      />
      <MMPullToRefresh {...pullToRefresh} empty={info.isEmpty && <MMEmpty src={icon_empty} imgStyle={{ width: 160, height: 160 }} text="暂无地址" fixed />}>
        <View className={styles.innerContent}>
          {info.list.map((item) => {
            const { province = '', city = '', district = '', address = '' } = item
            const addressDetail = `${province} ${city} ${district} ${address}`

            return (
              <MMCard key={item.id} style={{ marginTop: 10 }}>
                <View onClick={() => handleClickItem(item)}>
                  <View className={styles.listTop}>
                    <View className={styles.name}>{item.name}</View>
                    <View className={styles.line} />
                    <View className={styles.phone}>{item.mobile}</View>
                  </View>
                  <View className={styles.centerAddress}>{addressDetail}</View>
                </View>
                <View className={styles.listBot}>
                  <View className={styles.lRed}>{item.defaulted ? '默认地址' : ''}</View>
                  <View
                    className={styles.choice}
                    onClick={() => {
                      handleEditAddress(item)
                    }}
                  >
                    <Image src={editImg} style={{width:'16px',height: '16px'}}/>
                    {/* <MMIconFont size={14} value={MMIconFontName.Comment} /> */}
                    编辑
                  </View>
                  <View className={styles.choice} onClick={() => handleDel(item.id)}>
                    <Image src={delImg} style={{width:'16px',height: '16px'}}/>
                    {/* <MMIconFont size={15} value={MMIconFontName.Delete} /> */}
                    删除
                  </View>
                </View>
              </MMCard>
            )
          })}
        </View>
      </MMPullToRefresh>

      <MMFixFoot>
        <MMButton
          block
          onClick={() => {
            setAddressManagement({})
            Taro.navigateTo({ url: routeNames.mineAddressAddressManagement })
          }}
        >
          新增收货地址
        </MMButton>
      </MMFixFoot>
    </PageContainer>
  )
}

const AddressList = memo(Component)
export default AddressList
