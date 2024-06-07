import { memo, useState, FC } from 'react'
import { Text, View } from '@tarojs/components'
import styles from './index.module.less'
import MMButton from '@wmeimob/taro-design/src/components/button'
import { useAtomValue } from 'jotai'
import { confirmGoodsQtyTotal } from '../../store'
import shopVariable from '@wmeimob/taro-design/src/components/styles/themes/shop.variable'
import GoodsPriceWithIntegral from '@wmeimob-modules/goods-taro/src/components/goodsPriceWithIntegral'
import { OrderCalculateResponse } from '@wmeimob/taro-api'
import { MMButtonType } from '@wmeimob/taro-design/src/components/button/const'

interface ISubmitBotBarProps {
  data: OrderCalculateResponse

  disabled: boolean

  onSubmit: () => Promise<any>

  isTop: boolean

  isConfirm?: boolean
}

const Component: FC<ISubmitBotBarProps> = (props) => {
  const { data = {}, onSubmit, isTop= false,isConfirm=false} = props

  const qtyTotal = useAtomValue(confirmGoodsQtyTotal)

  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    try {
      await onSubmit()
    } catch (error) {}
    setLoading(false)
  }

  const footer = (
    <View className={styles.footer}>
      <View className={isTop?styles.footer_top:''}>
        <View className={styles.total}>
          <Text className={styles.qtyTotal}>共{qtyTotal}件</Text>
          <View className={styles.text}>
            <Text>合计：</Text>

            <GoodsPriceWithIntegral color="#FF1A4E" salePrice={data.payAmount!} exchangeIntegral={data.scoreBO?.usedScore} fontSize={[shopVariable.fontSize,18]} isConfirm={isConfirm} />
          </View>
        </View>
        {/*
        {!!data.discountAmount && (
          <View className={styles.save}>
            <Text>共省</Text>
            <GoodPrice value={data.discountAmount} fontSize={11} blod={false} />
          </View>
        )} */}
      </View>

      <MMButton type={MMButtonType.h5Red} loading={loading} className={styles.submitButton} disabled={props.disabled} onClick={handleSubmit}>
        去支付
      </MMButton>
    </View>
  )

  return <View className={styles.submitBotBarStyle}>{footer}</View>
}

const SubmitBotBar = memo(Component)
export default SubmitBotBar
