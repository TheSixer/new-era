import { PlusOutlined } from '@ant-design/icons'
import { Modal, Upload } from 'antd'
import { RcFile, UploadFile, UploadProps } from 'antd/lib/upload/interface'
import { FC, memo, ReactNode, useCallback, useMemo, useState } from 'react'
import styles from './index.module.less'
import { debounce } from 'lodash-es'
import getBase64 from '@wmeimob/utils/src/getBase64'

export interface ImgUploadProps
  extends Omit<UploadProps, 'value' | 'itemRender' | 'fileList' | 'listType' | 'beforeUpload' | 'onChange' | 'onPreview' | 'onRemove'> {
  /** 文件上传方法 */
  upload(fileList: File[]): Promise<string[]>
  /** 值 */
  value?: UploadFile[]
  /** 建议上传尺寸 */
  measure?: number | [number, number]
  /** 自定义提示文本 */
  extra?: ReactNode
  /** 倍率, 默认为两倍图 */
  ratio?: number
  /** 当图片发生变化时 */
  onChange?(files: UploadFile[]): void
}

/**
 * 图片上传组件
 *
 * @description 内置了阿里云上传逻辑
 *
 * @param {*} props
 * @return {*}
 */
const Component: FC<ImgUploadProps> = (props) => {
  const { value = [], maxCount = 1, multiple = false, measure, ratio = 3, extra = '', onChange = () => {}, accept = 'image/*', ...uploadProps } = props

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
    uploadImgs(uFiles.slice(0, maxCount - value.length))
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
        itemRender={(originNode, file) => {
          return file.uid === 'tip' ? tip : originNode
        }}
        multiple={multiple}
        maxCount={maxCount}
        onRemove={handleRemove}
        onPreview={handlePreview}
        accept={accept}
        // onChange={handleChange}
      >
        {uploadButton}
      </Upload>
      <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </div>
  )
}

Component.displayName = 'ImgUpload'

const ImgUpload = memo(Component)
export default ImgUpload
