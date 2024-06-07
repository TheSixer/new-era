import { Modal, ModalProps, Tabs } from 'antd'
import { FC, memo, useEffect, useState } from 'react'
import { BasicModuleProductDTO, BasicModuleProductGood } from '@wmeimob-modules/decoration-data'
import { EProductDataType } from '@wmeimob-modules/decoration-data/src/enums/EProductDataType'
import GoodsList from './goodsList'

type DataType = BasicModuleProductDTO
interface IGoodsSelectModalProps extends Omit<ModalProps, 'onOk'> {
  data: DataType
  onOk(data: DataType): void
}

const { TabPane } = Tabs

const Component: FC<IGoodsSelectModalProps> = (props) => {
  // 通过解构定义defaultProps
  const { data, visible, onOk } = props
  const [activeKey, setActiveKey] = useState(EProductDataType.Partial)
  const [innerGoods, setInnerGoods] = useState<BasicModuleProductGood[]>([])

  useEffect(() => {
    if (visible) {
      setActiveKey(data.type)
      setInnerGoods(data.goods)
    }
  }, [visible, data])

  const handleOk = () => {
    const goods = activeKey !== EProductDataType.Partial ? [] : innerGoods
    onOk({ ...data, goods, type: activeKey })
  }

  return (
    <Modal {...props} visible={visible} title="选择商品" width={996} onOk={handleOk}>
      <Tabs activeKey={activeKey} tabPosition="left" onChange={(va: any) => setActiveKey(va)}>
        <TabPane tab="选择商品" key={EProductDataType.Partial}>
          <GoodsList value={innerGoods} onChange={(goods) => setInnerGoods(goods)} />
        </TabPane>
        {/* <TabPane tab="全部商品" key={EProductDataType.All}>
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="已选全部商品参与，新增商品会自动参与" />
        </TabPane> */}
      </Tabs>
    </Modal>
  )
}

Component.displayName = 'GoodsSelectModal'

const GoodsSelectModal = memo(Component)
export default GoodsSelectModal
