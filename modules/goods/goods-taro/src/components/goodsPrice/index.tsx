import { CSSProperties, FC, memo, ReactNode, useMemo } from 'react'
import { View, Text } from '@tarojs/components'
import styles from './index.module.less'

export interface IGoodsPriceProps {
  /** 价格 */
  value: string | number

  /** 在value为空时是否显示0 */
  zero?: boolean
  /**
   * 是否显示小数
   *
   * @default 2 默认两位小数
   * @description false-不显示 number-显示几位
   */
  decimal?: number | false

  /**
   * 金额字体大小
   *
   * 如果传递类型为number  整数位与小数位都位fontSize值
   * 如果传递一位数组 则表示整数位为传入值。小数位为fontSize - 6
   * 如果传递两位数组 则表示整数位为fontSize[0] 小数位为fontSize[0]
   * 传递一个表示为最大值 ==> fontSize: 18 表示[18, 12]
   */
  fontSize?: number | [number, number?]

  /** 文本颜色 */
  color?: string
  /** 文本加粗 */
  blod?: boolean
  /** 是否划线 */
  lineThrough?: boolean
  /**
   * 前缀内容
   */
  prefix?: ReactNode
  /** 后缀内容 */
  suffix?: ReactNode
  /**
   * 是否不启用任何样式
   * @default false
   */
  pureStyle?: boolean

  style?: CSSProperties

  className?: any
}

const Component: FC<IGoodsPriceProps> = (props) => {
  const { value = '', decimal = 2, fontSize = [18, 12], color, zero = true, blod = true, lineThrough = false, pureStyle = false } = props
  const { prefix, suffix } = props

  const isNanNum = useMemo(() => !value || isNaN(Number(value)), [value])

  const integral = useMemo(() => {
    if (isNanNum) {
      return zero ? '0' : ''
    }
    const [int] = `${value}`.split('.')
    return parseInt(int, 10).toLocaleString()
  }, [value, isNanNum, zero])

  const isRenderDecimal = useMemo(() => decimal !== false && !!integral && zero, [decimal, integral, zero])

  const decimalNumber = useMemo(() => {
    const nd = decimal as number
    let decimalNum = ''
    if (!isRenderDecimal) {
      return ''
    }

    if (!isNanNum) {
      decimalNum = `${value}`.split('.')[1] || ''
      decimalNum = decimalNum.slice(0, nd)
    }

    return decimalNum.padEnd(nd, '0')
  }, [value, isNanNum, decimal, isRenderDecimal])

  // fontSize大小
  const [intSize, decimalSize] = useMemo(() => {
    if (typeof fontSize === 'number') {
      return [fontSize, fontSize]
    }
    return [fontSize[0], fontSize[1] || fontSize[0] - 6]
  }, [fontSize])

  const rootStyle = !pureStyle
    ? {
        lineHeight: 1,
        color: color || styles.priceColor,
        fontSize: decimalSize,
        fontWeight: blod ? '500' : '400',
        textDecoration: lineThrough ? 'line-through' : 'none'
      }
    : {}

  return (
    <View className={props.className} style={{ ...rootStyle, ...props.style }}>
      {prefix}
      <Text>¥</Text>
      <Text style={!pureStyle ? { fontSize: intSize, marginLeft: '2px' } : {}}>{integral}</Text>
      {isRenderDecimal && <Text>{`.${decimalNumber}`}</Text>}
      {suffix}
    </View>
  )
}

const GoodsPrice = memo(Component)
export default GoodsPrice
