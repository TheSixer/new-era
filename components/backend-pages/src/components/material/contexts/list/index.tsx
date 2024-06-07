import { FC, memo, useEffect, useState } from 'react'
import { Row, Col, Pagination, Empty, Spin, Modal, message } from 'antd'
import MaterialCard from '../../components/card'
import { useConsumer } from '../context'
import { MallConfMaterialVo, MaterialTypeText } from '../../const'
import EditModal from '../../components/editModal'
import styles from './index.module.less'
import { changeTreeNum } from '../util'
import useMaterialList from './usematerialList'
import { api } from '@wmeimob/backend-api'

interface IProps {}

/**
 * 素材操作列表(和选择列表不能同时存在)
 */
const MaterialList: FC<IProps> = (props) => {
  const { state, dispatch } = useConsumer()
  const [editItem, setEditItem] = useState<MallConfMaterialVo>()
  const { selectedItems } = state

  const { loading, pageInfo, getList } = useMaterialList()

  async function handlePageChange(pageNum?: number) {
    dispatch({ type: 'SelectedList', selected: [] })
    if (!state.selectedGroup) {
      dispatch({ type: 'ChangeList', list: [] })
    } else {
      const param: any = { pageNum, pageSize: pageInfo.pageSize, groupId: state.selectedGroup! }
      getList(param)
    }
  }

  function handleEditOk() {
    setEditItem(undefined)
    handlePageChange(pageInfo.current)
  }

  function handleCheckedItem(item: MallConfMaterialVo) {
    if (selectedItems.some((id) => item.id === id)) {
      dispatch({ type: 'SelectedList', selected: selectedItems.filter((id) => id !== item.id) })
    } else {
      dispatch({ type: 'SelectedList', selected: [...selectedItems, item.id!] })
    }
  }

  function handleDeleteItem(item: MallConfMaterialVo) {
    Modal.confirm({
      title: '删除',
      content: `确定要删除此${MaterialTypeText[item.type!]}吗？`,
      onOk: async () => {
        await api['/admin/api/mallConfMaterial/delete_DELETE']({ ids: String(item.id) })
        message.success('删除成功')
        handlePageChange(pageInfo.current)
        // 本地修正分组数量
        const newGroup = changeTreeNum(state.group, item.groupId, -1)
        dispatch({ type: 'ChangeGroup', group: newGroup })
      }
    })
  }

  useEffect(() => {
    handlePageChange(1)
  }, [state.selectedGroup])

  const isEmpty = state.list.length === 0

  return (
    <section className={styles.wrapper}>
      <Spin spinning={loading}>
        <Row gutter={[4, 4]}>
          {state.list.map((item, index) => (
            <Col key={`${item.imgUrl}-${index}`} span={8} xl={6} xxl={4}>
              <MaterialCard
                value={item}
                checked={selectedItems.indexOf(item.id!) >= 0}
                onEdit={() => setEditItem(item)}
                onChange={() => handleCheckedItem(item)}
                onDelete={() => handleDeleteItem(item)}
                // disabledEdit={!authMap.DECORATION_MATERIALLIBRARY_UPDATE}
                // disabledDownload={!authMap.DECORATION_MATERIALLIBRARY_DOWNLOAD}
                // disabledLink={!authMap.DECORATION_MATERIALLIBRARY_LINKCOPY}
                // disabledDelete={!authMap.DECORATION_MATERIALLIBRARY_DELETE}
                // disabledChecked={disabledChecked}
              />
            </Col>
          ))}
          {isEmpty && (
            <Col span={24}>
              <Empty className={styles.empty} />
            </Col>
          )}
        </Row>
      </Spin>

      <div className={styles.pagination}>
        <Pagination {...pageInfo} onChange={handlePageChange} />
      </div>

      <EditModal visible={!!editItem} value={editItem} group={state.group} onOk={handleEditOk} onCancel={() => setEditItem(undefined)} />
    </section>
  )
}

export default memo(MaterialList)
