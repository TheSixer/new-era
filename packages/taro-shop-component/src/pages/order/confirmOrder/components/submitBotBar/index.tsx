import { Text, View } from '@tarojs/components'
import { Button, FixFoot } from '@wmeimob/taro-design'
import MMPopup from '@wmeimob/taro-design/src/components/popup'
import { useAtomValue } from 'jotai'
import { memo, useState, FC } from 'react'
import GoodPrice from '../../../../../components/good/goodPrice'
import { confirmGoodsQtyTotal } from '../../store'
import AmountCells from '../amountCells'
import { ISubmitBotBarProps } from './const'
import styles from './index.module.less'

const Component: FC<ISubmitBotBarProps> = (props) => {
  const { data = {}, onSubmit } = props

  const qtyTotal = useAtomValue(confirmGoodsQtyTotal)

  const [loading, setLoading] = useState(false)
  const [visiblePopup, setVisiblePopup] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    try {
      await onSubmit()
    } catch (error) {}
    setLoading(false)
  }

  const footer = (
    <View className={styles.footer}>
      <View onClick={() => setVisiblePopup((prev) => !prev)}>
        <View className={styles.total}>
          <Text className={styles.qtyTotal}>共{qtyTotal}件</Text>
          <View className={styles.text}>
            <Text>合计：</Text>
            <GoodPrice value={data.payAmount!} />
          </View>
        </View>

        {!!data.totalDiscountAmount && (
          <View className={styles.save}>
            <Text>共省</Text>
            <GoodPrice color="#FF1A4E" value={data.totalDiscountAmount} fontSize={11} blod={false} />
          </View>
        )}
      </View>

      <Button noBorder={true} loading={loading} className={styles.submitButton} onClick={handleSubmit}>
        去支付
      </Button>
    </View>
  )

  return (
    <>
      <FixFoot border style={visiblePopup ? { zIndex: 2000 } : undefined} dynamic>
        <View className={styles.submitBotBarStyle}>{footer}</View>
      </FixFoot>

      <MMPopup close={false} visible={visiblePopup} maskClosable onClose={() => setVisiblePopup(false)}>
        {visiblePopup && <AmountCells order={data} />}
      </MMPopup>
    </>
  )
}

const SubmitBotBar = memo(Component)
export default SubmitBotBar
