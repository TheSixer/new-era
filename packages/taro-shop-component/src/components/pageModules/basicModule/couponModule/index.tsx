/* eslint-disable no-nested-ternary */
import { ScrollView, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { EJumpType } from '@wmeimob-modules/decoration-data/src/enums/EJumpType'
import useComponentStyle from '@wmeimob-modules/decoration-taro/src/hooks/useComponentStyle'
import { useToast } from '@wmeimob/taro-design'
import { useSuperLock } from '@wmeimob/utils/src/hooks/useSuperLock'
import { CSSProperties, memo, useEffect, useState, FC } from 'react'
import { useGlobalStore } from '../../../../globalStore'
import { api } from '@wmeimob/taro-api'
import { CouponTemplateVo } from '@wmeimob/taro-api'
import { getCouponOperationText } from '../../../../utils/coupon'
import CouponItem from '../../../couponItem'
import { navByLink } from '../../utils'
import { getDefaultProps, ICouponModuleProps } from './const'
import styles from './index.module.less'
import { routeNames } from '../../../../routes'

const Component: FC<ICouponModuleProps> = (props) => {
  const { componentStyle, data } = props
  const [toast] = useToast()
  const { isLogin } = useGlobalStore()
  const { style, css } = useComponentStyle(componentStyle)
  const { isSmall, contentStyle, itemStyle } = useCouponStyle(data)

  const [coupons, setCoupons] = useState<CouponTemplateVo[]>([])

  useEffect(() => {
    if (data && data.length && isLogin) {
      getCoupon(data.map((it) => it.templateNo))
    }
  }, [data, isLogin])

  const [handleReceiveCoupon] = useSuperLock(async (coupon: CouponTemplateVo) => {
    const { templateNo = '', receiveNum = 0, stock } = coupon
    if (!isLogin) {
      return  Taro.navigateTo({ url: routeNames.auth })
    }
    toast?.loading()
    try {
      await api['/wechat/web/memCoupon/receive_GET']({ templateNo })
      setCoupons((pre) =>
        pre.map((item) =>
          item.templateNo === coupon.templateNo
            ? {
                ...item,
                receiveNum: receiveNum + 1,
                stock: stock - 1
              }
            : item
        )
      )

      const newCoupon = { ...coupon, stock: stock - 1, receiveNum: receiveNum + 1 }
      const { receivedStock } = getCouponOperationText(newCoupon)
      toast?.message({
        message: '领取成功!' + (receivedStock ? `还可领取${receivedStock}张` : ''),
        mask: true,
        duration: 1000
      })
    } catch (error) {}
    toast?.hideLoading()
  })

  async function getCoupon(templateNos: string[]) {
    const res = await api['/wechat/web/memCoupon/getAvailableCouponByTemplateNos_POST'](templateNos)
    setCoupons(res.data || [])
  }

  return isLogin ? (
    <ScrollView scrollX enhanced={true} showScrollbar={false} style={{ width: '100%' }}>
      <View className={styles.couponModuleStyle} style={{ ...style, ...contentStyle }}>
        {coupons.map((item) => {
          const cprops = getCouponOperationText(item)
          return (
            <View key={item.id} style={{ marginBottom: -15, ...itemStyle }}>
              <CouponItem
                data={item}
                {...cprops}
                size={isSmall ? 'small' : undefined}
                onClickRight={() => {
                  handleReceiveCoupon(item)
                }}
              />
            </View>
          )
        })}
      </View>
    </ScrollView>
  ) : (
    <View />
  )
}

Component.defaultProps = getDefaultProps()

const CouponModule = memo(Component)
export default CouponModule

function useCouponStyle(data: any[]) {
  const isSmall = data.length > 1

  let contentStyle: CSSProperties = {}
  let itemStyle: CSSProperties = {}

  if (data.length === 2) {
    contentStyle = {
      display: 'flex',
      justifyContent: 'space-between'
    }

    itemStyle = { width: `calc(50% - 5px)` }
  } else if (data.length > 2) {
    contentStyle = {
      display: 'flex'
    }

    itemStyle = {
      width: `calc(50% - 10px)`,
      flexShrink: 0,
      paddingRight: 10
    }
  }

  return {
    isSmall,
    contentStyle,
    itemStyle
  }
}
