import { FC, memo } from 'react'
import { IOperationsColumnsProps } from './const'
import { Space, Modal } from 'antd'
import styles from './index.module.less'

/**
 * 表格操作列
 * @param props
 * @returns
 */
const Component: FC<IOperationsColumnsProps> = (props) => {
  const { operations = [{ id: 'edit' }, { id: 'del' }] } = props

  return (
    <Space className={styles.operationsColumnsStyle}>
      {operations
        .filter((item) => item.show !== false)
        .map((ops) => {
          if (['edit', 'del'].includes(ops.id)) {
            const { onClick, id } = ops as any
            return {
              edit: (
                <a key={id} onClick={onClick}>
                  {ops.text || '编辑'}
                </a>
              ),
              del: (
                <a key={id} onClick={() => Modal.confirm({ title: '确定删除?', onOk: onClick })}>
                  {ops.text || '删除'}
                </a>
              )
            }[ops.id]
          }

          return (
            <span key={ops.id} className={styles.item}>
              {ops.text}
            </span>
          )
        })}
    </Space>
  )
}

Component.displayName = 'OperationsColumns'

const OperationsColumns = memo(Component)
export default OperationsColumns
