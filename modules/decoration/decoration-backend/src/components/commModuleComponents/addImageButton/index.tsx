import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { FC, memo } from 'react'
import styles from './index.module.less'

interface IAddImageButtonProps {
  /** 当前数量 */
  current?: number
  /** 最大数量 */
  max?: number
  /** 按钮文本 */
  text?: string
  onClick?: () => void
}

const Component: FC<IAddImageButtonProps> = (props) => {
  const { current = 0, max, text = '添加图片', onClick } = props

  const renderButton = !max || (!!max && current < max)
  return (
    <div>
      {!!max && <div className={styles.tip}>最多可添加{max}项(可拖动排序)</div>}
      {renderButton && (
        <Button block type="primary" icon={<PlusOutlined />} ghost onClick={onClick}>
          {text}
        </Button>
      )}
    </div>
  )
}

Component.displayName = 'AddImageButton'

const AddImageButton = memo(Component)
export default AddImageButton
