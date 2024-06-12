import { FC, memo, useState, useMemo } from 'react'
import { Button, Row, Col, Space, Switch, Image } from 'antd'
import { ButtonProps } from 'antd/es/button'
import { CaretDownOutlined } from '@ant-design/icons'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import classnames from 'classnames'
import styles from './index.module.less'
import { IDragCardItemProps, IDragCardProps } from './interface'
import { useDragged } from '../../hooks/createDragged'
import { getResizeUrl } from '@wmeimob/tencent-cloud'
import cc from '../../../../../config'
const { config } = cc.systemConfig

const getItemStyle = (draggableStyle: any, isDragging: boolean) => ({
  userSelect: 'none',
  border: isDragging ? '3px solid #1890FF' : 0,
  background: isDragging ? '#f2f2f6' : '',
  overflow: 'hidden',
  ...draggableStyle
})

const buttonProps: ButtonProps = {
  size: 'small',
  type: 'link'
}

const iconStyle = { width: 50, height: 50 }

const DragCardItem: FC<IDragCardItemProps> = (props) => {
  const { item, level } = props
  const [expand, setExpand] = useState(false)
  // const [childList, setChildList] = useState<IDragItem[]>([])
  const isLastLevel = level >= config.maxClassifyLevel

  const hasChildren = useMemo(() => !!item.children?.length, [item.children])

  useDragged(props.useDraggedId, props.onSort)

  return (
    <>
      <Row className={styles.collapseItem}>
        <Col span={16}>
          {isLastLevel || !hasChildren ? (
            <Space>
              <span className={styles.collapseItemTitle}>{item.title}</span>
              {!!item.origin.pic && <Image src={item.origin.pic + getResizeUrl(iconStyle)} style={iconStyle} preview={{ src: item.origin.pic }} />}
            </Space>
          ) : (
            <span className={styles.collapseItemExpend} onClick={() => setExpand((pre) => !pre)}>
              <Space>
                <span>
                  <CaretDownOutlined className={classnames(styles.mainIcon, expand ? '' : styles.rotate)} />
                </span>
                <span>{item.title}</span>
                {!!item.origin.pic && <Image src={item.origin.pic + getResizeUrl(iconStyle)} style={iconStyle} preview={{ src: item.origin.pic }} />}
              </Space>
            </span>
          )}
        </Col>
        <Col span={8} className={styles.operation}>
          <Space>
            <Switch checked={item.origin.frontShow} disabled checkedChildren="显示" unCheckedChildren="隐藏" />
            {!props.isDeleteDisabled && (
              <Button {...buttonProps} disabled={hasChildren} danger onClick={() => props.onDelete(item)}>
                删除
              </Button>
            )}
            {!props.isEditDisabled && (
              <Button {...buttonProps} onClick={() => props.onEdit(item)}>
                编辑
              </Button>
            )}
          </Space>
        </Col>
      </Row>

      {hasChildren && expand && (
        <DragCard
          isEditDisabled={props.isEditDisabled}
          isDeleteDisabled={props.isDeleteDisabled}
          isStatusDisabled={props.isStatusDisabled}
          droppableId={String(item.key)}
          list={item.children!}
          level={level + 1}
          onSort={props.onSort}
          onEdit={props.onEdit}
          onDelete={props.onDelete}
        />
      )}
    </>
  )
}

/**
 * 递归渲染拖拽组件
 */
const DragCard: FC<IDragCardProps> = (props) => {
  const { list, droppableId, level = 1, ...itemProps } = props

  return (
    <Droppable droppableId={droppableId} type={`${droppableId}-${level}`}>
      {(provided) => (
        <div className={styles.collapseWrapper} ref={provided.innerRef} {...provided.droppableProps}>
          {list.map((item, index) => {
            const { children, ...rest } = item.origin
            const useDraggedId = droppableId + '-' + item.key + '-' + JSON.stringify(rest)

            return (
              <Draggable key={useDraggedId} draggableId={useDraggedId} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    style={getItemStyle(provided.draggableProps.style, snapshot.isDragging)}
                  >
                    <DragCardItem {...itemProps} useDraggedId={useDraggedId} item={item} level={level} />
                  </div>
                )}
              </Draggable>
            )
          })}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}

export default memo(DragCard)
