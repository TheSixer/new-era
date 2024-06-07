import Taro, { useRouter } from '@tarojs/taro'
import { FC, memo } from 'react'
import { Image, View } from '@tarojs/components'
import styles from './index.module.less'
import { ISplitLogisticsProps } from './const'
import MMNavigation from '@wmeimob/taro-design/src/components/navigation'
import { useAtomValue } from 'jotai'
import { orderShippingDtoAtom } from '../store'
import MMCell from '@wmeimob/taro-design/src/components/cell'
import icon_package from './images/package.png'
import MMCard from '@wmeimob/taro-design/src/components/card'
import MMSpace from '@wmeimob/taro-design/src/components/space'
import MMIconFont from '@wmeimob/taro-design/src/components/icon-font'
import MMIconFontName from '@wmeimob/taro-design/src/components/icon-font/const'
import { PageContainer } from '@wmeimob/taro-design'
import { routeNames } from '../../../routes'
import getParamsUrl from '@wmeimob/taro-utils/src/getParamsUrl'

const imgStyle = { width: 90, height: 90 }
const Component: FC<ISplitLogisticsProps> = () => {
  const {
    params: { orderNo }
  } = useRouter()

  const orderShippingDto = useAtomValue(orderShippingDtoAtom)

  return (
    <PageContainer className={styles.splitLogisticsStyle}>
      <MMNavigation title='物流信息' />

      <MMCell icon={<Image src={icon_package} style={{ width: 18, height: 18 }} />}
              title={`${orderShippingDto.length}个包裹已发出`} />

      {orderShippingDto.map((item) => {
        const { orderShippingItemDtoList = [] } = item

        let imgs: string[] = []
        imgs = orderShippingItemDtoList.reduce((result, sitem) => result.concat(sitem.skuImg!), imgs).slice(0, 3)

        return (
          <MMCard
            key={item.expressNo}
            title={`${item.expressCompany}: ${item.expressNo}`}
            extra={
              <MMSpace className={styles.more} gap={2}>
                <View>查看详情</View>
                <MMIconFont value={MMIconFontName.Next} size={11} />
              </MMSpace>
            }
            style={{ marginTop: 10 }}
            onClick={() => {
              Taro.navigateTo({ url: getParamsUrl(routeNames.orderLogistics, { orderNo, expressNo: item.expressNo }) })
            }}
          >
            <MMSpace>
              {imgs.map((img) => (
                <Image src={img} key={img} style={imgStyle} />
              ))}
            </MMSpace>
          </MMCard>
        )
      })}
    </PageContainer>
  )
}

const SplitLogistics = memo(Component)
export default SplitLogistics
