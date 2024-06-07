import { FC, memo, useLayoutEffect, useMemo, useState } from 'react'
import { Modal, Upload, message, TreeSelect, Form, Spin, UploadProps } from 'antd'
import { Rule } from 'antd/es/form'
import { UploadFile } from 'antd/es/upload/interface'
import { PlusOutlined } from '@ant-design/icons'
import { MallConfMaterialGroupVo, MaterialType, MaxUploadCount } from '../../const'
import { api } from '@wmeimob/backend-api'
import { getGlobalData } from '@wmeimob/backend-store'

interface IProps {
  type: MaterialType
  group: MallConfMaterialGroupVo[]
  currentGroupId?: number | null
  visible: boolean
  onOk: (groupId: number, files: string[]) => void
  onCancel: () => void
}

const uploadFilesRules: Rule[] = [
  { required: true, message: '请至少选择一个文件' },
  {
    validator(_rule, value: UploadFile[] = []) {
      const MaxSize = 1024 * 1024 * 20
      if (value.length) {
        const index = value.findIndex((item) => item.size && item.size > MaxSize)
        if (index >= 0) {
          // eslint-disable-next-line prefer-promise-reject-errors
          return Promise.reject(`您的选择第${index + 1}个文件中包含超过20MB的文件，请检查`)
        }
      }
      return Promise.resolve()
    }
  }
]

function getAccept(type: MaterialType) {
  switch (type) {
    case MaterialType.Video:
      return 'video/mp4'
    case MaterialType.Image:
      return 'image/bmp,image/png,image/jpeg,image/jpg,image/gif'
    default:
      return '*'
  }
}

function renderTips(type: MaterialType) {
  switch (type) {
    case MaterialType.Video:
      return (
        <div>
          <p>1. 视频上传支持mp4格式；</p>
          <p>2. 每次最多上传{MaxUploadCount}个视频；</p>
          <p>3. 每个视频的大小不得超过20MB。</p>
        </div>
      )
    case MaterialType.Image:
      return (
        <div>
          <p>1. 图片上传支持bmp、png、jpeg、jpg、gif格式；</p>
          <p>2. 每次最多上传{MaxUploadCount}张图片；</p>
          <p>3. 每个张图片的大小不得超过20MB。</p>
        </div>
      )
  }
}

function MMUpload(props: UploadProps) {
  const { fileList = [] } = props
  return (
    <Upload {...props} showUploadList={{ showPreviewIcon: false }} multiple beforeUpload={() => false} listType="picture-card" maxCount={MaxUploadCount}>
      {fileList.length < MaxUploadCount && (
        <div>
          <div style={{ fontSize: 20, marginTop: 10 }}>
            <PlusOutlined />
          </div>
          <div className="ant-upload-text">上传</div>
        </div>
      )}
    </Upload>
  )
}

const UploadModal: FC<IProps> = (props) => {
  const { visible, type } = props
  const [uploading, setUploading] = useState(false)
  const accept = getAccept(type)
  const [form] = Form.useForm()

  const treeData = useMemo(() => {
    function getTreeData(list: MallConfMaterialGroupVo[]): any[] {
      return list.map((item) => {
        return {
          title: item.name,
          value: item.id,
          children: item.children ? getTreeData(item.children) : []
        }
      })
    }
    return getTreeData(props.group)
  }, [props.group])

  useLayoutEffect(() => {
    if (visible) {
      form.setFieldsValue({ groupId: props.currentGroupId })
    }
  }, [visible])

  function onCancel() {
    !uploading && props.onCancel()
  }

  const { calcExtendParams } = useUpload()

  async function onOk() {
    const { groupId, list } = await form.validateFields()
    setUploading(true)

    const accept = getAccept(type)
    if (accept !== '*') {
      const findIndex = list.findIndex((item) => accept.indexOf(item.type!) === -1)
      if (findIndex >= 0) {
        message.warning(`您的选择第${findIndex + 1}个文件中包含不支持的文件，请检查`)
        return
      }
    }

    try {
      const originFiles = list.map((value) => value.originFileObj as File)
      const files = await getGlobalData('upload')(originFiles)
      const extendParams = await calcExtendParams(originFiles, type)

      await Promise.all(
        list.map((file, index) =>
          api['/admin/api/mallConfMaterial/add_POST']({
            groupId,
            type,
            imgUrl: files[index],
            name: file.name.slice(0, 50), // 防止过长
            extendParams: extendParams[index]
          })
        )
      )
      message.success('上传成功！')
      props.onOk(groupId, files)
    } finally {
      setUploading(false)
    }
  }

  function afterClose() {
    form.resetFields()
  }

  const normFile = (event: any) => {
    return Array.isArray(event) ? event : event?.fileList
  }

  return (
    <Modal
      title="上传"
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      afterClose={afterClose}
      confirmLoading={uploading}
      cancelButtonProps={{ disabled: uploading }}
      width={550}
    >
      <Spin spinning={uploading} tip="正在上传中，请稍后">
        <Form form={form}>
          <Form.Item name="groupId" label="分组" rules={[{ required: true }]}>
            <TreeSelect treeData={treeData} placeholder="请选择分组" treeDefaultExpandAll showSearch allowClear />
          </Form.Item>
          <Form.Item name="list" valuePropName="fileList" getValueFromEvent={normFile} label="文件" rules={uploadFilesRules}>
            <MMUpload accept={accept} />
          </Form.Item>
        </Form>
      </Spin>
      {renderTips(type)}
    </Modal>
  )
}

export default memo(UploadModal)

function useUpload() {
  /**
   * 获取视频时长信息
   * @param video
   * @returns
   */
  function getDuration(video: File) {
    return new Promise<number>((resolve) => {
      const url = URL.createObjectURL(video)
      const videoElem = document.createElement('video')
      videoElem.oncanplaythrough = function () {
        resolve(videoElem.duration)
      }
      videoElem.src = url
    })
  }

  /**
   * 获取视频 宽高、时长信息
   * @param video
   * @returns
   */
  function getVideoInfo(video: File) {
    return new Promise<{ duration: number; width: number; height: number }>((resolve) => {
      const url = URL.createObjectURL(video)
      const videoElem = document.createElement('video')
      videoElem.oncanplaythrough = function () {
        resolve({
          duration: videoElem.duration,
          width: videoElem.videoWidth,
          height: videoElem.videoHeight
        })
      }
      videoElem.src = url
    })
  }

  /**
   * 获取图片尺寸信息
   * @param file
   * @returns
   */
  function getImageSize(file: File) {
    return new Promise<{ width: number; height: number }>((resolve) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (ev: any) => {
        // 读取完成后，数据保存在对象的result属性中
        const img = new Image()
        img.onload = function () {
          resolve({ width: img.width, height: img.height })
        }
        img.src = ev.target.result
      }
    })
  }

  /**
   * 获取一组视频的时长信息
   * @param videos
   * @returns
   */
  async function getDurations(videos: File[]) {
    const durations: number[] = []

    for (const key in videos) {
      if (Object.hasOwn(videos, key)) {
        const element = videos[key]
        durations[key] = await getDuration(element)
      }
    }
    return durations
  }

  /**
   *
   * 计算上传extendParams参数
   * 图片计算图片宽高。视频计算视频宽高时长
   * @param fileList
   * @param type
   * @returns
   */
  async function calcExtendParams(fileList: File[], type: MaterialType) {
    return Promise.all<{ duration?: number; width: number; height: number; size: number }>(
      fileList.map(async (file) => {
        if (type === MaterialType.Video) {
          const info = await getVideoInfo(file)
          return {
            size: file.size,
            ...info
          }
        }

        const imgSize = await getImageSize(file)
        return {
          size: file.size,
          ...imgSize
        }
      })
    )
  }

  return {
    getDurations,
    calcExtendParams
  }
}
