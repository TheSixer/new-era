import { FC, memo, useReducer } from 'react'
import { Row, Col, Affix } from 'antd'
import MaterialMenu from '../../../components/material/contexts/menu'
import MaterialGroup from '../../../components/material/contexts/group'
import MaterialList from '../../../components/material/contexts/list'
import MaterialBatch from '../../../components/material/contexts/batch'
import { Provider, changeReducer, initialState } from '../../../components/material/contexts/context'

const Component: FC = (props) => {
  const [state, dispatch] = useReducer(changeReducer, initialState)

  return (
    <Provider value={{ state, dispatch }}>
      <MaterialMenu />

      <Row gutter={[4, 4]}>
        <Col span={24}>
          <MaterialBatch />
        </Col>

        <Col span={18}>
          <MaterialList />
        </Col>

        <Col span={6}>
          <Affix offsetTop={48}>
            <MaterialGroup />
          </Affix>
        </Col>
      </Row>
    </Provider>
  )
}

const MMMaterialLibraryPage = memo(Component)
export default MMMaterialLibraryPage
