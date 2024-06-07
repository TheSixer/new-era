import { View, Text, Image } from '@tarojs/components'
import { IAddressInfoCardProps } from './const'
import styles from './index.module.less'
import locationIcon from './images/location.png'
import arrowIcon from './images/arrow.png'
import { useMemo, memo, FC } from 'react'

const Component: FC<IAddressInfoCardProps> = (props) => {
  const { data = {}, showArrow = true } = props

  const address = useMemo(() => {
    const { provinceName = '', cityName = '', areaName = '', singleAddress = '' } = data
    return [provinceName, cityName, areaName, singleAddress].join('  ')
  }, [data])

  return (
    <View className={styles.addressInfoCardStyle} onClick={props.onClick}>
      <Image className={styles.addressIcon} src={locationIcon} />
      <View className={styles.addressContent}>
        <View className={styles.name}>
          {data.name}
          <Text className={styles.phone}>{data.mobile}</Text>
        </View>
        <View className={styles.address}>
          地址:&nbsp;
          {address}
        </View>
      </View>
      {showArrow && <Image className={styles.rightIcon} src={arrowIcon} />}
    </View>
  )
}

const AddressInfoCard = memo(Component)
export default AddressInfoCard
