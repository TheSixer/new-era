import { FC, memo, useEffect, useMemo, useState } from 'react'
import styles from './index.module.less'

import IconFont from '../iconFont'
import IconFontName from '../iconFont/name'
import { Modal } from 'antd'

interface IIconFontSelectModalProps {
  visible: boolean
  icon: string
  onOk?: (icon: string) => any
  onCancel?: () => any
}

const Component: FC<IIconFontSelectModalProps> = (props) => {
  const { visible, onCancel, onOk, icon } = props
  const [localIcon, setLocalIcon] = useState('')

  const icons = useMemo(() => {
    const list: string[] = []

    for (const key in IconFontName) {
      if (IconFontName.hasOwnProperty(key)) {
        const element = IconFontName[key]
        if (typeof element === 'number') {
          list.push(element)
        }
      }
    }
    return list
  }, [])

  useEffect(() => {
    if (localIcon !== icon) {
      setLocalIcon(icon)
    }
  }, [icon])

  const handleOk = () => {
    onOk && onOk(localIcon)
  }

  return (
    <Modal title="图标选择" width={610} visible={visible} onCancel={onCancel} onOk={handleOk}>
      <div className={styles.iconfontWrapper}>
        {icons.map((icon) => (
          <div key={icon} className={[styles.iconfontItem, localIcon === icon ? styles.active : ''].join(' ')} onClick={() => setLocalIcon(icon)}>
            <IconFont value={icon as any} size={20} />
          </div>
        ))}
      </div>
    </Modal>
  )
}

Component.defaultProps = {}
Component.displayName = 'IconFontSelectModal'

const IconFontSelectModal = memo(Component)
export default IconFontSelectModal
