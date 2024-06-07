import { FormItemProps } from 'antd'
import { FormListFieldData, FormListOperation } from 'antd/lib/form/FormList'
import { FC, memo, ReactNode } from 'react'
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd'
import styles from './index.module.less'

interface IDragFormItemProps<T = any> extends FormItemProps {
  fields: FormListFieldData[]
  operation: FormListOperation
  renderHeader?: (field: FormListFieldData, index: number) => ReactNode
  itemRender?: (fields: FormListFieldData, index: number) => ReactNode
}

const grid = 8

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  margin: `0 0 ${grid}px 0`,
  // styles we need to apply on draggables
  ...draggableStyle
})

const Component: FC<IDragFormItemProps> = (props) => {
  const { fields = [], operation, itemRender, renderHeader = () => '', ...itemProps } = props

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result
    // dropped outside the list
    if (destination) {
      operation.move(source.index, destination.index)
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {fields.map((field, index) => (
              <Draggable key={field.key} draggableId={`${field.key + field.fieldKey}`} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                    className={styles.dragItem}
                  >
                    <div className={styles.dragItem_head}>
                      <span className={styles.dragItem_head_title}>{renderHeader(field, index)}</span>
                      <span
                        className={styles.dragItem_head_delete}
                        onClick={(ev) => {
                          ev.stopPropagation()
                          ev.preventDefault()
                          operation.remove(field.name)
                        }}
                      >
                        删除
                      </span>
                    </div>
                    {itemRender?.(field, index)}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

Component.displayName = 'DragFormItem'

const DragFormItem = memo(Component)
export default DragFormItem
