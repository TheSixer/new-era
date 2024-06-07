import Taro, { useRouter } from '@tarojs/taro'
import { memo, useEffect, useMemo, useState, FC } from 'react'
import { View, Image, Text } from '@tarojs/components'
import { ILogisticsProps } from './const'
import styles from './index.module.less'
import MMNavigation from '@wmeimob/taro-design/src/components/navigation'
import { api } from '@wmeimob/taro-api'
import { ExpressTrackRespDto } from '@wmeimob/taro-api'
import MMCard from '@wmeimob/taro-design/src/components/card'
import iconCar from './images/car.png'
import iconDot from './images/dot.png'
import MMEmpty from '@wmeimob/taro-design/src/components/empty'
import { PageContainer, useToast } from '@wmeimob/taro-design'
import MMSpace from '@wmeimob/taro-design/src/components/space'
import MMCell from '../../../../../../components/taro-design/src/components/cell'
import { isH5 } from '../../../config'

const iconCarStyle = { width: 46, height: 46 }
const Component: FC<ILogisticsProps> = (props) => {
  const {
    params: { expressNo = '', orderNo }
  } = useRouter()

  const [toast] = useToast()

  const [express, setExpress] = useState<ExpressTrackRespDto>({})

  const trackData = useMemo<any[]>(() => (express.trackData ? JSON.parse(express.trackData) : []), [express])

  useEffect(() => {
    async function getdata() {
      toast?.loading()
      try {
        const { data = {} } = await api['/wechat/orders/express_GET']({ expressNo: decodeURIComponent(expressNo), orderNo })
        setExpress(data)
      } catch (error) {}
      toast?.hideLoading()
    }
    if (toast) {
      getdata()
    }
  }, [toast])

  return (
    <PageContainer className={styles.logisticsStyle}>
      <MMNavigation title="物流信息" />
      {/* 快递信息 */}
      {express.expressNo ? (
        <>
          <View className={styles.logistics}>
            {/*<View className={styles.logistics_content}>*/}
            {/*  <Image src={iconCar} style={iconCarStyle} />*/}

            {/*  <View className={styles.logistics_info}>*/}
            {/*    <View className={styles.expressCompany}>{express.expressCompany}</View>*/}
            {/*    <View className={styles.expressNo}>*/}
            {/*      <View className={styles.no}>快递编号：{express.expressNo}</View>*/}

            {/*      <View*/}
            {/*        className={styles.no_copy}*/}
            {/*        onClick={() => {*/}
            {/*          // 设置系统剪贴板的内容。调用成功后，会弹出 toast 提示"内容已复制"，持续 1.5s*/}
            {/*          Taro.setClipboardData({ data: express.expressNo! }).catch(() => {*/}
            {/*            toast?.message('复制失败')*/}
            {/*          })*/}
            {/*        }}*/}
            {/*      >*/}
            {/*        复制*/}
            {/*      </View>*/}
            {/*    </View>*/}
            {/*  </View>*/}
            {/*</View>*/}
            <MMCell title={<View className={styles.title}>订单编号</View>} ><View className={styles.color28}>{orderNo}</View></MMCell>
            <MMCell title={<View className={styles.title}>快递公司</View>} ><View className={styles.color28}>{express.expressCompany}</View></MMCell>
            <MMCell title={<View className={styles.title}>快递编号</View>} ><View className={styles.no}>{express.expressNo}</View>

              <View
                className={styles.no_copy}
                onClick={() => {
                  // 设置系统剪贴板的内容。调用成功后，会弹出 toast 提示"内容已复制"，持续 1.5s
                  Taro.setClipboardData({ data: express.expressNo! ,success(){
                      if (isH5){
                        toast?.message('内容已复制')
                      }
                    }}).catch(() => {
                    toast?.message('复制失败')
                  })
                }}
              >
                复制
              </View></MMCell>
          </View>

          {/* 物流走向 */}
          {/*{!!trackData.length && (*/}
          {/*  <MMCard>*/}
          {/*    {trackData.map((trackdatalist, trackindex) => (*/}
          {/*      <View className={styles.log_list} key={trackdatalist.ftime + trackindex}>*/}
          {/*        <View className={styles.log_list_t}>*/}
          {/*          <View className={styles.log_list_yuan} />*/}
          {/*          <View className={styles.log_list_time}>{trackdatalist.ftime}</View>*/}
          {/*        </View>*/}
          {/*        <View className={styles.log_list_b}>{trackdatalist.context}</View>*/}
          {/*      </View>*/}
          {/*    ))}*/}
          {/*  </MMCard>*/}
          {/*)}*/}
        </>
      ) : (
        <MMEmpty text="没有查询到快递信息" fixed />
      )}
    </PageContainer>
  )
}

const Logistics = memo(Component)
export default Logistics
