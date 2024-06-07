import { FC, useEffect, useMemo, useState } from 'react'
import { Card, Empty, message, Modal, Tree } from 'antd'
import { ModalProps } from 'antd/es/modal'
import CityCard from './cityCard'
import styles from './index.module.less'
import { ICityTree } from '../interface'

interface IModalProps extends Pick<ModalProps, 'visible' | 'onCancel'> {
  dataSource: ICityTree[]
  defaultSelected?: ICityTree[]
  onOk?: (selectedTree: ICityTree[]) => void
}

const Component: FC<IModalProps> = (props) => {
  const [selectedTree, setSelectedTree] = useState<ICityTree[]>([])

  useEffect(() => {
    if (props.visible) {
      setSelectedTree(props.defaultSelected || [])
    }
  }, [props.visible])

  return (
    <Modal
      title="选择区域"
      width={1100}
      visible={props.visible}
      maskClosable={false}
      centered
      destroyOnClose
      onOk={() => {
        if (selectedTree.length <= 0) {
          message.warning('请选至少选择一个区域')
        } else {
          props.onOk?.(selectedTree)
        }
      }}
      onCancel={props.onCancel}
    >
      <div className={styles.wrapper}>
        <div className={styles.cardScrollView}>
          <CityCard dataSource={props.dataSource} selectedData={selectedTree} onChange={(values) => setSelectedTree(values)} />
        </div>
        <Card size="small" className={styles.treeCard}>
          <div>
            <b>已选择区域</b>
            {selectedTree.length > 0 ? <Tree treeData={selectedTree} selectable={false} /> : <Empty className={styles.empty} />}
          </div>
        </Card>
      </div>
    </Modal>
  )
}

export default Component
