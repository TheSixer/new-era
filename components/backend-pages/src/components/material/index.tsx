import { FC, useEffect, useReducer } from 'react'
import { Row, Col, Modal } from 'antd'
import MaterialGroup from './contexts/group'
import MaterialListSelect from './contexts/list/selects'
import { MaterialType } from './const'
import { Provider, changeReducer, initialState } from './contexts/context'
import { MaterialVo } from '@wmeimob/backend-api'

export interface IMaterialProps {
  visible: boolean
  /** 选择回调 */
  onOk: (value: string[], material: MaterialVo[]) => void
  /** 取消选择 */
  onCancel: () => void
  /** 素材类型 */
  type?: MaterialType
  /** 最多选择数量 默认10 */
  max?: number
}

/**
 * 素材选择弹窗组件
 */
const Material: FC<IMaterialProps> = (props) => {
  const { type = MaterialType.Image, max = 10 } = props
  const [state, dispatch] = useReducer(changeReducer, { ...initialState, type, maxLinkCount: max })

  useEffect(() => {
    dispatch({ type: 'MaxCount', max })
  }, [max])

  useEffect(() => {
    dispatch({ type: 'ChangeType', selected: type })
  }, [type])

  return (
    <Provider value={{ state, dispatch }}>
      <Modal
        visible={props.visible}
        title="选择素材"
        width="80%"
        centered
        onOk={() =>
          props.onOk(
            state.selectedLinks.map((item) => item.imgUrl!),
            state.selectedLinks
          )
        }
        onCancel={props.onCancel}
        bodyStyle={{ maxHeight: '75vh', overflow: 'auto' }}
        afterClose={() => dispatch({ type: 'SelectedLink', selected: [] })}
      >
        <Row gutter={[4, 4]}>
          <Col span={6}>
            <MaterialGroup />
          </Col>
          <Col span={18}>
            <MaterialListSelect />
          </Col>
        </Row>
      </Modal>
    </Provider>
  )
}

export default Material
