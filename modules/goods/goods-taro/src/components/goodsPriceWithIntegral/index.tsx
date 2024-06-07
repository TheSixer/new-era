import { FC, memo, useMemo } from 'react'
import { View } from '@tarojs/components'
import GoodsPrice, { IGoodsPriceProps } from '../goodsPrice'
import styles from './index.module.less'

export interface IGoodsPriceWithIntegralProps {
  /** 售价 */
  salePrice?: number
  /** 兑换积分 */
  exchangeIntegral?: number

  priceProps?: Omit<IGoodsPriceProps, 'value' | 'fontSize' | 'color'>

  fontSize?: IGoodsPriceProps['fontSize']

  /** 文本颜色 */
  color?: IGoodsPriceProps['color']

  /** 是否是去支付位置 */
  isConfirm?: boolean
}

const Component: FC<IGoodsPriceWithIntegralProps> = (props) => {
  const { salePrice, exchangeIntegral, priceProps, fontSize, color, isConfirm = false } = props

  // fontSize大小
  const [intSize, decimalSize] = useMemo(() => {
    if (fontSize === undefined) {
      return [18, 12]
    }
    if (typeof fontSize === 'number') {
      return [fontSize, fontSize]
    }
    return [fontSize[0], fontSize[1] || fontSize[0] - 6]
  }, [fontSize])

  // 没金额 且 没积分
  const empty = !salePrice && !exchangeIntegral &&
    <GoodsPrice {...priceProps} fontSize={[intSize, isConfirm ? intSize : decimalSize]} color={color} value={0} />

  const content = (
    <>
      {!!salePrice && <GoodsPrice {...priceProps} fontSize={[intSize,isConfirm ? intSize : decimalSize]} color={color} value={salePrice!} />}

      {!!salePrice && !!exchangeIntegral && <View style={{ margin: '0 3px' }}>+</View>}

      {!!exchangeIntegral && (
        <>
          <View style={{ fontSize: isConfirm ? decimalSize : intSize }}>{exchangeIntegral}</View>
          <View style={{ fontSize: decimalSize }}>积分</View>
        </>
      )}
    </>
  )

  return (
    <View className={styles.goodsPriceWithIntegralStyle} style={{ color }}>
      {empty || content}
    </View>
  )
}

Component.displayName = 'GoodsPriceWithIntegral'

const GoodsPriceWithIntegral = memo(Component)
export default GoodsPriceWithIntegral
