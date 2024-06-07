import { ModalForm, ModalFormProps } from '@ant-design/pro-form'
import useProTableForm from '@wmeimob/backend-pro/src/hooks/useProTableForm'
import { Form } from 'antd'
import { FC, memo } from 'react'
import PreviewList from '../../../../components/previewList'
import { IGoodsComment } from '../../const'

export interface IDetailModalProps {
  modalProps: ReturnType<typeof useProTableForm>['modalProps']
  detail?: IGoodsComment
  onFinish: ModalFormProps<IGoodsComment>['onFinish']
}

const Component: FC<IDetailModalProps> = (props) => {
  const { modalProps, detail, onFinish } = props

  return (
    <ModalForm {...modalProps} title="详情" layout="horizontal" labelCol={{ span: 3 }} wrapperCol={{ span: 20 }} onFinish={onFinish}>
      <Form.Item label="用户评价">
        <div>{detail?.content}</div>
        {!!detail?.commentImgs.length && <PreviewList size={80} list={detail?.commentImgs} />}
        <div>{detail?.gmtCreated}</div>
      </Form.Item>

      <Form.Item label="回复内容">
        {detail?.replyContent}
        <div>{detail?.replyAt}</div>
      </Form.Item>

      {detail?.addAt && (
        <Form.Item label="用户追评">
          <div>{detail?.addContent}</div>
          {!!detail?.addCommentImgs.length && <PreviewList size={80} list={detail?.addCommentImgs} />}
          <div>{detail?.addAt}</div>
        </Form.Item>
      )}

      {detail?.addReplyAt && (
        <Form.Item label="回复内容">
          {detail?.addReplyContent}
          <div>{detail?.addReplyAt}</div>
        </Form.Item>
      )}
    </ModalForm>
  )
}

Component.displayName = 'DetailModal'

const DetailModal = memo(Component)
export default DetailModal
