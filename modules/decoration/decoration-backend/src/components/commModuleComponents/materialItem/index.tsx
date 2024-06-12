import { FC, ReactNode, useMemo, useState } from 'react'
import { Modal } from 'antd'
import { EditOutlined, EyeOutlined } from '@ant-design/icons'
import { getResizeUrl, getVideoSnapshotUrl } from '@wmeimob/tencent-cloud'
import styles from './index.module.less'
import { MaterialType } from '@wmeimob/backend-pages/src/components/material/const'
import MaterialModal from '@wmeimob/backend-pages/src/components/material'

export interface MaterialProps {
  /** 建议图片尺寸 */
  measure?: number | [number, number]
  /**
   * 尺寸倍数
   * @default 3 移动端默认上传两倍图
   */
  measureMultiple?: number
  /** 额外的Tips */
  extraTips?: ReactNode
  /** 图片框大小 不传则根据建议尺寸来 */
  size?: [number, number]

  value?: string | string[]

  onChange?: (value?: string | string[]) => void
}

function getOssUrl(url: string, type: MaterialType = MaterialType.Image) {
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
const Component: FC<MaterialProps> = (props) => {
  const { size, measure, measureMultiple = 3 } = props
  const imageStyle: { width?: number; height?: number } = {}

  const [visible, setVisible] = useState(false)

  const measureInfo = useMemo(() => {
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

  const list = useMemo(() => valueToList(props.value), [props.value])
  const imgValue = list[0] || ''

  function onPreview() {
    Modal.info({
      icon: null,
      width: 'auto',
      centered: true,
      maskClosable: true,
      okText: '关闭',
      content: (
        <div className={styles.preview}>
          <img className={styles.image} src={imgValue} alt="图片预览" />
        </div>
      )
    })
  }

  return (
    <div>
      <div className={styles.list}>
        <div className={styles.item} style={imageStyle}>
          {!!imgValue && <img className={styles.image} src={getOssUrl(imgValue)} />}
          <div className={styles.hover}>
            <EditOutlined
              onClick={() => {
                setVisible(true)
              }}
            />
            {!!imgValue && <EyeOutlined onClick={() => onPreview()} />}
          </div>
        </div>
      </div>

      <div className={styles.tip}>
        {props.extraTips}
        {measureInfo && (
          <>
            建议尺寸{measureInfo[0]}px * {measureInfo[1]}px
          </>
        )}
      </div>
      <MaterialModal
        visible={visible}
        max={1}
        onOk={([url]) => {
          props.onChange && props.onChange(url)
          setVisible(false)
        }}
        onCancel={() => setVisible(false)}
      />
    </div>
  )
}

Component.displayName = 'MaterialItem'

export default Component
