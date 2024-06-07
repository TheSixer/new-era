import { ScrollView, View } from '@tarojs/components'
import { MemCouponVo } from '@wmeimob/taro-api'
import MMDivider from '@wmeimob/taro-design/src/components/divider'
import MMPopup from '@wmeimob/taro-design/src/components/popup'
import shopVariable from '@wmeimob/taro-design/src/components/styles/themes/shop.variable'
import { isNewIphone } from '@wmeimob/taro-design/src/components/utils'
import classNames from 'classnames'
import { memo, FC } from 'react'
import CouponItem from '../../../../../components/couponItem'
import styles from './index.module.less'

export interface ICouponSelectProps {
  data: MemCouponVo[]
  selected?: string
  visible?: boolean
  noUseText?: string
  title?: string
  onOk?(couponNo: string): void
  onVisibleChange?(visible: boolean): void
}

const Component: FC<ICouponSelectProps> = (props) => {
  const { title = '', data, selected, visible, noUseText = `不使用${title}`, onOk, onVisibleChange } = props

  return (
    <MMPopup
      visible={visible}
      onClose={() => onVisibleChange?.(false)}
      title={title}
      titleAlign="center"
      backgroundColor={shopVariable.bodyBackground}
      contentStyle={{ padding: 0 }}
      close={true}
      noPlace
    >
      <View className={styles.content}>
        <View className={styles.list}>
          <ScrollView scrollY style={{ height: '100%' }}>
            {visible &&
              data.map((item) => {
                return (
                  <View className={styles.coupon} key={item.id}>
                    <CouponItem
                      data={item}
                      checked={item.couponNo === selected}
                      onClick={() => {
                        onOk?.(item.couponNo!)
                      }}
                    />
                  </View>
                )
              })}

            <View />
          </ScrollView>
        </View>

        <View className={styles.footer}>
          <MMDivider />
          <View
            className={styles.noUse}
            onClick={() => {
              onOk?.('')
            }}
          >
            {noUseText}
          </View>
          {isNewIphone && <View className={classNames('spacingIphone', styles.spacingIphone)} />}
        </View>
      </View>
    </MMPopup>
  )
}

const CouponSelect = memo(Component)
export default CouponSelect
