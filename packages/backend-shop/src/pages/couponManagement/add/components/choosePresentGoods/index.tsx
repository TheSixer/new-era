import { api, GoodsVO } from '@wmeimob/backend-api'
import { Button, Space, Typography } from 'antd'
import { FC, memo, useEffect, useMemo, useState } from 'react'
import styles from './index.module.less'

interface IChoosePresentGoodsProps {
  value?: string

  disabled?: boolean

  onChooseGoods(): void
}

const Component: FC<IChoosePresentGoodsProps> = (props) => {
  const { value, disabled } = props

  const [goods, setGoods] = useState<GoodsVO>({})

  const [goodsNo, skuNo] = useMemo(() => {
    return !value ? ['', ''] : value.split('-')
  }, [value])

  const skuName = useMemo(() => {
    const { goodsSkuDetailList = [] } = goods
    return goodsSkuDetailList.find((item) => item.skuNo === skuNo)?.specNames || ''
  }, [goods, skuNo])

  useEffect(() => {
    if (goodsNo) {
      api['/admin/goods/{no}_GET'](goodsNo).then(({ data = {} }) => setGoods(data))
    }
  }, [goodsNo])

  return (
    <div className={styles.choosePresentGoodsStyle}>
      {!value ? (
        <Button type="link" size="small" onClick={props.onChooseGoods}>
          选择商品
        </Button>
      ) : (
        <div>
          <Space>
            <Typography.Text>已选择赠品</Typography.Text>
            {!disabled && (
              <Button type="link" size="small" onClick={props.onChooseGoods}>
                修改
              </Button>
            )}
          </Space>
          <div>
            <Typography.Text>{goods.goodsName}</Typography.Text>
            <div>
              <Typography.Text>{skuName}</Typography.Text>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const ChoosePresentGoods = memo(Component)
export default ChoosePresentGoods
