import { FC, memo, useCallback, useState } from 'react'
import { Checkbox, Button, Modal, Row, Col, Space, message, Popconfirm } from 'antd'
import MaterialUpload from '../upload'
import MoveModal from '../../components/moveModal'
import { useConsumer } from '../context'
import { changeTreeNum, download } from '../util'
import styles from './index.module.less'
import { MallConfMaterialVo } from '../../const'
import { api } from '@wmeimob/backend-api'

/**
 * 素材批处理
 */
const MaterialBatch: FC = (props) => {
  const { state, dispatch } = useConsumer()
  const [visible, setVisible] = useState(false)
  const [downing, setDownling] = useState(false)
  // 仅限本页全选 故可以使用length匹配
  const isAllChecked = state.list.length > 0 && state.list.length === state.selectedItems.length
  const isSomeChecked = state.selectedItems.length > 0

  // 强行刷新列表的魔法
  function dispatchUpdateList() {
    const { selectedGroup } = state
    dispatch({ type: 'SelectedGroup' })
    requestAnimationFrame(() => {
      dispatch({ type: 'SelectedGroup', selected: selectedGroup! })
    })
  }

  function onCheckAllChange() {
    if (isAllChecked) {
      dispatch({ type: 'SelectedList', selected: [] })
    } else {
      dispatch({ type: 'SelectedList', selected: state.list.map((item) => item.id!) })
    }
  }

  function onDeleteChecked() {
    const { selectedItems } = state
    Modal.confirm({
      title: '批量删除',
      content: `确定要删除选中的${selectedItems.length}项吗？`,
      onOk: async () => {
        await api['/admin/api/mallConfMaterial/delete_DELETE']({ ids: selectedItems.join(',') })
        message.success('删除成功')
        dispatchUpdateList()
        // 批量修改分组展示数量
        let group = state.group
        state.list.forEach((item) => {
          if (selectedItems.includes(item.id!)) {
            group = changeTreeNum(group, item.groupId, -1)
          }
        })
        dispatch({ type: 'ChangeGroup', group })
      }
    })
  }

  async function onDownloadChecked() {
    const list = state.selectedItems.map((id) => state.list.find((item) => item.id === id)).filter((item) => !!item) as MallConfMaterialVo[]
    try {
      setDownling(true)
      for (const iterator of list) {
        await download(iterator.imgUrl!, iterator.name)
      }
    } catch (error) {
      message.error('素材下载失败！')
    } finally {
      setDownling(false)
    }
  }

  const onOk = useCallback(
    (groupId: number) => {
      setVisible(false)
      dispatchUpdateList()
      // 批量修改分组展示数量
      const { selectedItems } = state
      let group = state.group
      state.list.forEach((item) => {
        if (selectedItems.includes(item.id!)) {
          group = changeTreeNum(group, item.groupId, -1)
        }
      })
      group = changeTreeNum(group, groupId, selectedItems.length)
      dispatch({ type: 'ChangeGroup', group })
    },
    [visible, state.group, state.selectedGroup, state.selectedItems]
  )

  const onCancel = useCallback(() => {
    setVisible(false)
  }, [visible])

  return (
    <div className={styles.wrapper}>
      <Row justify="space-between">
        <Col>
          <Space>
            <Checkbox indeterminate={!isAllChecked && isSomeChecked} checked={isAllChecked} onChange={onCheckAllChange}>
              全选
            </Checkbox>

            <Button danger disabled={!isSomeChecked} onClick={onDeleteChecked}>
              批量删除
            </Button>

            <Popconfirm
              title={
                <div>
                  注意：
                  <br />
                  同时下载多个文件或文件过大时
                  <br />
                  速度会比较慢，请耐心等待。
                </div>
              }
              okText="下载"
              cancelText="取消"
              onConfirm={onDownloadChecked}
              disabled={!isSomeChecked}
            >
              <Button loading={downing} disabled={!isSomeChecked}>
                批量下载
              </Button>
            </Popconfirm>

            <Button disabled={!isSomeChecked} onClick={() => setVisible(true)}>
              移动到
            </Button>
          </Space>
        </Col>
        <Col>
          {/* <Text>
            {MaterialTypeText[state.type]}数量:{state.group.length > 0 ? state.group[0].mateNum : 0}&emsp;
          </Text> */}
          <MaterialUpload />
        </Col>
      </Row>

      <MoveModal visible={visible} value={state.selectedItems} group={state.group} onOk={onOk} onCancel={onCancel} />
    </div>
  )
}

export default memo(MaterialBatch)
