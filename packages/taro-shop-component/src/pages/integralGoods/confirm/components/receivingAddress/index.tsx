import { FC, memo, useMemo } from 'react'
import { Image, View } from '@tarojs/components'
import styles from './index.module.less'
import MMCard from '@wmeimob/taro-design/src/components/card'
import MMIconFont from '@wmeimob/taro-design/src/components/icon-font'
import location from '../../../../../components/addressInfoCard/images/location.png'
import MMIconFontName from '@wmeimob/taro-design/src/components/icon-font/const'
import { useAtomValue } from 'jotai'
import { addressAtom } from '../../store'
import addressAddIcon from '../../images/address_add.png'
import { routeNames } from '../../../../../routes'
import { EAddressType, IAddressListRouteParams } from '../../../../mine/address/addressList/const'
import Taro from '@tarojs/taro'
import getParamsUrl from '@wmeimob/taro-utils/src/getParamsUrl'

interface IReceivingAddressProps {
}

const Component: FC<IReceivingAddressProps> = () => {
  const address = useAtomValue(addressAtom)

  const addressText = useMemo(() => {
    const { province = '', district = '', city = '', address: add = '' } = address
    return [province, city, district, add].join('  ')
  }, [address])

  return (
    <MMCard>
      <View
        className={styles.receivingAddressStyle}
        onClick={() =>
          Taro.navigateTo({
            url: getParamsUrl(routeNames.mineAddressAddressList,
              { type: EAddressType.Choose, selectedId: address.id || '' } as IAddressListRouteParams)
          })
        }
      >
        {!address.id && (
          <>
            <Image src={addressAddIcon} className={styles.addIcon} />
            <View className={styles.content}>
              <View className={styles.empty}>添加收货地址</View>
            </View>
          </>
        )}

        {address.id && (
          <>
            <Image src={location} className={styles.icon} />
            <View className={styles.content}>
              <View className={styles.contentT}>
                <View className={styles.name}>{address.name || ''}</View>
                <View className={styles.phone}>{address.mobile || ''}</View>
              </View>
              <View className={styles.address}>地址: {addressText}</View>
            </View>
          </>
        )}

        <MMIconFont value={MMIconFontName.Next} size={11} color={styles.gray7} />
      </View>
    </MMCard>
  )
}

const ReceivingAddress = memo(Component)
export default ReceivingAddress
