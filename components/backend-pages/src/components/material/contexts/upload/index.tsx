import { FC, memo, useCallback, useState } from 'react'
import { Button } from 'antd'
import { CloudUploadOutlined } from '@ant-design/icons'
import UploadModal from '../../components/uploadModal'
import { useConsumer } from '../context'
import { MaterialTypeText } from '../../const'
import { changeTreeNum } from '../util'

interface IProps {}

/**
 * 素材上传按钮
 */
const MaterialUpload: FC<IProps> = (props) => {
  const { state, dispatch } = useConsumer()
  const [visible, setVisible] = useState(false)

  const onOk = useCallback(
    (groupId: number, files: string[]) => {
      setVisible(false)
      const { group, selectedGroup } = state
      const newGroup = changeTreeNum(group, groupId, files.length)
      dispatch({ type: 'ChangeGroup', group: newGroup })
      dispatch({ type: 'SelectedGroup' })
      // 强行刷新列表的魔法
      requestAnimationFrame(() => {
        dispatch({ type: 'SelectedGroup', selected: selectedGroup! })
      })
    },
    [state.group, state.selectedGroup]
  )

  const onCancel = useCallback(() => {
    setVisible(false)
  }, [visible])

  return (
    <>
      <Button type="primary" icon={<CloudUploadOutlined />} onClick={() => setVisible(true)}>
        上传{MaterialTypeText[state.type]}
      </Button>
      <UploadModal visible={visible} group={state.group} currentGroupId={state.selectedGroup} type={state.type} onOk={onOk} onCancel={onCancel} />
    </>
  )
}

export default memo(MaterialUpload)
