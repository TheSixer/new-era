import { FC, memo, useEffect, useState } from 'react'
import styles from './index.module.less'
import { IPresentGoodItemProps } from './const'
import { Button, Space, Tag } from 'antd'
import { api } from '~/request'
import { GoodsVO } from '@wmeimob/backend-api'

const Component: FC<IPresentGoodItemProps> = (props) => {
  const { value = {}, disabled } = props

  const [good, setGood] = useState<GoodsVO>({})

  useEffect(() => {
    async function getData() {
      const { data = {} } = await api['/admin/goods/{no}_GET'](value.goodsNo)
      setGood(data)
    }
    if (value.goodsNo) {
      getData()
    }
  }, [value.goodsNo])

  return (
    <Space>
      {!!good.goodsName && <Tag>{good.goodsName}</Tag>}
      {!disabled && (
        <Button size="small" type="link" onClick={props.onChooseGood}>
          选择商品
        </Button>
      )}
    </Space>
  )
}

Component.displayName = 'PresentGoodItem'

const PresentGoodItem = memo(Component)
export default PresentGoodItem
