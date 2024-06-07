import { FC, ReactNode, useMemo, useState } from 'react'
import { message, Modal } from 'antd'
import { DeleteOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons'
import MaterialModal from '../../index'
import { getResizeUrl, getVideoSnapshotUrl } from '@wmeimob/aliyun'
import styles from './index.module.less'
import { MaterialType, MaterialTypeText } from '../../const'
import { MaterialVo } from '@wmeimob/backend-api'

export interface MaterialSelectProps {
  /** 开启多选(开启后表单值为数组) */
  multiple?: boolean
  /** 最大上传数 默认10 多选下有效 */
  maxLength?: number
  /** 建议图片尺寸 */
  measure?: number | [number, number]
  /**
   * 尺寸倍数
   * @default 3 移动端默认上传两倍图
   */
  measureMultiple?: number
  /** 额外的Tips */
  extraTips?: ReactNode

  repeatTip?: boolean
  /** 图片框大小 不传则根据建议尺寸来 */
  size?: [number, number]
  /** 素材类型 默认图片 */
  type?: MaterialType

  /**  是否禁用 */
  disabled?: boolean

  value?: string | string[]

  /**
   * 新增的时候materials才存在
   */
  onChange?: (value?: string | string[], materials?: MaterialVo | MaterialVo[]) => void
}

function getOssUrl(url: string, type: MaterialType) {
  return url + (type === MaterialType.Video ? getVideoSnapshotUrl({ width: 200 }) : getResizeUrl({ width: 200 }))
}

function valueToList(value?: string | string[]) {
  if (Array.isArray(value)) {
    return value
  }
  return value ? [value] : []
}

/**
 * 素材选择组件
 */
const MaterialSelect: FC<MaterialSelectProps> = (props) => {
  const { type = MaterialType.Image, repeatTip, multiple, size, disabled, measure, measureMultiple = 3 } = props
  const maxLength = multiple ? props.maxLength || 10 : 1
  const imageStyle: { width?: number; height?: number } = {}

  const measureInfo = useMemo(() => {
    if (type === MaterialType.Video) {
      return
    }
    if (typeof measure === 'number') {
      return [measure * measureMultiple, measure * measureMultiple]
    } else if (!measure) {
      return measure
    }
    return measure.map((item) => (item || 0) * measureMultiple)
  }, [measure, measureMultiple])

  if (size) {
    imageStyle.width = size[0]
    imageStyle.height = size[1]
  }
  // else if (measureInfo) {
  //   const defaultSize = 100
  //   const radio = measureInfo[0] / measureInfo[1]
  //   imageStyle.width = radio > 1 ? Math.round(defaultSize * radio) : defaultSize
  //   imageStyle.height = radio >= 1 ? defaultSize : Math.round(defaultSize / radio)
  // }
  const list = valueToList(props.value)

  const [visible, setVisible] = useState(false)

  function handleChange(values: string[], materials?: MaterialVo[]) {
    if (props.onChange) {
      multiple ? props.onChange(values.length > 0 ? values : '', materials) : props.onChange(values[0] || '', materials?.[0])
    }
  }

  function handleOk(values: string[], materials: MaterialVo[]) {
    // 按链接去重
    const changeValue = list.filter((item) => values.indexOf(item) === -1).concat(values)
    // 重复数量
    const repetitionNum = list.concat(values).length - changeValue.length
    if (repeatTip && repetitionNum) {
      message.info(`${repetitionNum}张已在选择列表中`)
    }

    handleChange(changeValue, materials)
    setVisible(false)
  }

  function handleCancel() {
    setVisible(false)
  }

  function onDelete(index: number) {
    const values = list.splice(0)
    values.splice(index, 1)
    handleChange(values)
  }

  function onPreview(index: number) {
    if (type === MaterialType.Image) {
      Modal.info({
        icon: null,
        width: 'auto',
        centered: true,
        maskClosable: true,
        okText: '关闭',
        content: (
          <div className={styles.preview}>
            <img className={styles.image} src={list[index]} alt="图片预览" />
          </div>
        )
      })
    } else {
      window.open(list[index], '_blank')
    }
  }

  return (
    <div>
      <div className={styles.list}>
        {list.map((url, index) => (
          <div className={styles.item} style={imageStyle} key={index + url}>
            <img className={styles.image} src={getOssUrl(url, type)} alt="" />
            <div className={styles.hover}>
              {!disabled && <DeleteOutlined onClick={() => onDelete(index)} />}
              <EyeOutlined onClick={() => onPreview(index)} />
            </div>
          </div>
        ))}

        {list.length < maxLength && (
          <div className={styles.item} style={imageStyle} onClick={() => !disabled && setVisible(true)}>
            <div>
              <PlusOutlined />
            </div>
            <div className="ant-upload-text">选择{MaterialTypeText[type]}</div>
          </div>
        )}
      </div>

      <div className={styles.tip}>
        {props.extraTips}
        {measureInfo && (
          <>
            建议尺寸{measureInfo[0]} * {measureInfo[1]}
            {multiple && '，'}
          </>
        )}
        {multiple && <>最多选择{maxLength}张</>}
      </div>

      <MaterialModal visible={visible} max={maxLength - list.length} type={type} onOk={handleOk} onCancel={handleCancel} />
    </div>
  )
}

MaterialSelect.displayName = 'MaterialSelect'

export default MaterialSelect
