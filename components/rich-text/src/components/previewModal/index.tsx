import { FC, memo, CSSProperties } from 'react'
import styles from './index.module.less'
import { IPreviewModalProps } from './const'
import { Modal } from 'antd'

const modalStyle: CSSProperties = {
  top: 0,
  maxWidth: '100vw',
  padding: 0
}

const Component: FC<IPreviewModalProps> = (props) => {
  const { show, htmlString, onClose } = props

  return (
    <Modal title="预览" className={styles.modal} width={window.innerWidth} style={modalStyle} visible={show} onCancel={onClose} footer={null}>
      <div className={styles.content} dangerouslySetInnerHTML={{ __html: htmlString || '' }} />
    </Modal>
  )
}

Component.displayName = 'PreviewModal'

const PreviewModal = memo(Component)
export default PreviewModal
