import { PlusOutlined } from '@ant-design/icons'
import { Modal, Upload } from 'antd'
import { RcFile, UploadFile } from 'antd/lib/upload/interface'
import { FC, memo, useCallback, useMemo, useState } from 'react'
import getBase64 from '@wmeimob/utils/src/getBase64'
import { debounce } from 'lodash-es'
import styles from './index.module.less'
import { IVideoUploadProps } from './const'

const Component: FC<IVideoUploadProps> = (props) => {
  const { value = [], maxCount = 1, multiple = false, measure, ratio = 2, extra = '', onChange = () => {}, ...uploadProps } = props

  const [previewVisible, setPreviewVisible] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')

  const memoMeasure = useMemo<[number, number] | undefined>(() => {
    const result = measure ? (typeof measure === 'number' ? [measure, measure] : [measure[0], measure[1] || measure[0]]) : undefined
    return result ? [result[0] * ratio, result[1] * ratio] : result
  }, [measure, ratio])

  const handleCancel = () => setPreviewVisible(false)

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }
    setPreviewImage(file.url || file.preview)
    setPreviewVisible(true)
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
  }

  const handleRemove = useCallback(
    (file: UploadFile) => {
      const newFileList = value.filter((item) => item.uid !== file.uid)
      onChange && onChange(newFileList)
    },
    [value, onChange]
  )

  const handleBeforeUpload = (file: RcFile, uFiles: RcFile[]) => {
    uploadImgs(uFiles)
    return false
  }

  const uploadImgs = debounce(async (uFiles: RcFile[]) => {
    let newValue = value.concat(uFiles.map((item) => ({ ...item, status: 'uploading' })))
    onChange!(newValue)
    try {
      const res = await props.upload(uFiles)
      newValue = newValue.map((file) => {
        const idx = uFiles.findIndex((item) => item.uid === file.uid)
        return idx !== -1 ? { ...file, url: res[idx], status: 'done' } : file
      })
    } catch (error) {
      newValue = newValue.map((file) => {
        const idx = uFiles.findIndex((item) => item.uid === file.uid)
        return idx !== -1 ? { ...file, status: 'error' } : file
        // return idx !== -1 ? { ...file, url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png', status: 'done' } : file;
      })
    }
    onChange(newValue)
  })

  const tip = (
    <div className={styles.tip}>
      {memoMeasure && (
        <>
          <div>建议尺寸</div>
          <div>
            {memoMeasure[0]}px * {memoMeasure[1]}px
          </div>
        </>
      )}
      <div>{extra}</div>
    </div>
  )

  const uploadButton =
    value.length >= maxCount ? null : (
      <div className={styles.uploadButton}>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>上传</div>
        <div className={styles.uploadButton_tip}>{tip}</div>
      </div>
    )

  const tipItem = { url: 'tip', uid: 'tip', name: 'tip' }
  const renderFileList = uploadButton ? value : value.concat([tipItem])

  return (
    <div className={styles.component}>
      <Upload
        {...uploadProps}
        beforeUpload={handleBeforeUpload}
        listType="picture-card"
        fileList={renderFileList}
        iconRender={({ status }) => (status === 'uploading' ? '上传中' : null)}
        itemRender={(originNode, file) => {
          // return file.uid === 'tip' ? tip : <video preload="metadata" src={`${file.url}#t=1`} className={styles.videoTip}/>
          // debugger
          return file.uid === 'tip' ? (
            tip
          ) : (
            <div style={{ width: '100%', height: '100%', position: 'relative' }}>
              <video preload="metadata" src={`${file.url}#t=1`} className={styles.videoTip} />
              {originNode}
            </div>
          )
        }}
        multiple={multiple}
        maxCount={maxCount}
        onRemove={handleRemove}
        onPreview={handlePreview}
      >
        {uploadButton}
      </Upload>
      <Modal visible={previewVisible} title={previewTitle} destroyOnClose footer={null} onCancel={handleCancel}>
        <video controls preload="metadata" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </div>
  )
}

Component.displayName = 'VideoUpload'

const VideoUpload = memo(Component)
export default VideoUpload
