import { View } from '@tarojs/components'
import { Button, Card, MMFeild, PageContainer, useDialog } from '@wmeimob/taro-design'
import MMNavigation from '@wmeimob/taro-design/src/components/navigation'
import shopVariable from '@wmeimob/taro-design/src/components/styles/themes/shop.variable'
import { useSuperLock } from '@wmeimob/utils/src/hooks/useSuperLock'
import { FC, memo, useMemo, useState } from 'react'
import { api } from '@wmeimob/taro-api'
import styles from './index.module.less'

interface ICouponCodeExchangeProps {}

const Component: FC<ICouponCodeExchangeProps> = () => {
  const { code, disabled, setCode, handleExchange, loadingHandleExchange } = useService()

  return (
    <PageContainer className={styles.couponCodeExchangeStyle}>
      <View className={styles.container}>
        <MMNavigation title="" type="Transparent" />

        <Card className={styles.card}>
          <View className={styles.tip}>请输入有效优惠码进行兑换</View>

          <MMFeild
            className={styles.input}
            value={code}
            valueAlign="left"
            placeholder="填写优惠码"
            fieldProps={{ maxlength: 20, focus: true }}
            onChange={setCode}
          />

          <Button
            block
            size="large"
            style={{ margin: `0 ${shopVariable.spacingLarge}px` }}
            disabled={disabled}
            loading={loadingHandleExchange}
            onClick={handleExchange}
          >
            优惠码兑换
          </Button>
        </Card>
      </View>
    </PageContainer>
  )
}

const CouponCodeExchange = memo(Component)
export default CouponCodeExchange

function useService() {
  /** 输入长度超过后才允许点击按钮 */
  const LIMIT = 10
  /** 优惠券过期 */
  const COUPON_ALREADY_TIMEOUT = 60001
  /** 优惠码不存在 */
  const COUPON_NOT_FOUNT = 70000
  /** 重复兑换 */
  const COUPON_CODE_REPEAT_EXCHANGE = 70001

  const errorMap = {
    [COUPON_ALREADY_TIMEOUT]: '对应的优惠券已过期~',
    [COUPON_NOT_FOUNT]: '优惠码错误，请重新输入',
    [COUPON_CODE_REPEAT_EXCHANGE]: '对应优惠券已兑换，请勿重复兑换~'
  }

  const dialog = useDialog()

  const [code, setCode] = useState('')

  const disabled = useMemo(() => code.trim().length < LIMIT, [code.trim()])

  const [handleExchange, loadingHandleExchange] = useSuperLock(async () => {
    const toast = (msg: string) =>
      dialog?.show({
        content: msg,
        cancel: false,
        onOk: () => setCode('')
      })

    try {
      await api['/wechat/mall/couponCode_PUT']({ code }, { errorToast: false })
      toast('兑换成功~已发放至您的账户')
    } catch ({ data: error }) {
      toast(errorMap[error.code] || error.msg)
    }
  })

  return {
    code,
    disabled,
    setCode,
    handleExchange,
    loadingHandleExchange
  }
}
