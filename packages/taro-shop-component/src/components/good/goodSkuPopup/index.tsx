import { memo, useMemo, FC } from 'react'
import { Image, View } from '@tarojs/components'
import { IGoodSkuPopupProps } from './const'
import styles from './index.module.less'
import MMPopup from '@wmeimob/taro-design/src/components/popup'
import MMCell from '@wmeimob/taro-design/src/components/cell'
import MMSkuList from '@wmeimob/taro-design/src/components/sku-list'
import MMStepper from '@wmeimob/taro-design/src/components/stepper'
import GoodPrice from '../goodPrice'
import useGoodSku from './useGoodSku'
import { getResizeUrl } from '@wmeimob/aliyun'
import { systemConfig } from '../../../config'
import GoodsPriceWithIntegral from '@wmeimob-modules/goods-taro/src/components/goodsPriceWithIntegral'

const { config } = systemConfig

const coverStyle = { width: 90, height: 90 }
/**
 * 商品sku弹窗
 * @param props
 * @returns
 */
const Component: FC<IGoodSkuPopupProps> = (props) => {
  const { good, skuValues = [], buyCounts = 1, onSkuChange, onCountChange, ...popProps } = props
  const { skuProps, currentShowSku, handleSkuListClick } = useGoodSku(good, skuValues, onSkuChange)
  const stock = useMemo(() => currentShowSku.activityStock ?? currentShowSku.stock!, [currentShowSku.stock, currentShowSku.activityStock])
  const price = useMemo(() => currentShowSku.activityPrice ?? currentShowSku.salesPrice!, [currentShowSku.salesPrice, currentShowSku.activityPrice])

  const skuImg = currentShowSku.skuImg ? currentShowSku.skuImg + getResizeUrl(coverStyle) : ''

  return (
    <MMPopup {...popProps} noDivider={false}>
      {popProps.visible && (
        <>
          {/* 商品头部 */}
          <View className={styles.goodHead}>
            <Image src={skuImg} style={coverStyle} className={styles.goodImg} />

            <View className={styles.goodInfo} style={{ height: 90 }}>
              <View className={styles.goodPrices}>
                <View className={styles.salePrice}>
                  {/* <GoodPrice value={price!} fontSize={[24, 14]} /> */}
                  <GoodsPriceWithIntegral salePrice={price!} exchangeIntegral={currentShowSku.exchangeIntegral} fontSize={[24, 14]} />
                </View>
                {!!currentShowSku.marketPrice && <GoodPrice value={currentShowSku.marketPrice!} color="#999" fontSize={12} blod={false} lineThrough />}
              </View>

              {config.enableScore && !!currentShowSku.score && (
                <View className={styles.goodInfo_score}>
                  <View className={styles.goodInfo_scoreTag}>积分</View>
                  <View className={styles.goodInfo_scoreText}>购买可获得{currentShowSku.score}积分奖励</View>
                </View>
              )}
            </View>
          </View>

          <MMSkuList {...skuProps} onClick={handleSkuListClick} />

          <MMCell
            title={
              <View className={styles.title}>
                数量 <View className={styles.stock}>库存:&nbsp;{stock}件</View>
              </View>
            }
            style={{ padding: '5px 0' }}
          >
            <MMStepper min={1} max={stock} step={1} disabled={!stock} value={buyCounts} onChange={onCountChange} />
          </MMCell>
        </>
      )}
    </MMPopup>
  )
}

const GoodSkuPopup = memo(Component)
export default GoodSkuPopup
