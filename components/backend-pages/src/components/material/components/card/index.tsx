/* eslint-disable radix */
import { FC, useMemo, ReactNode } from 'react'
import { Card, Checkbox, Tooltip, Typography, message, Badge, Tag } from 'antd'
import { DownloadOutlined, EditOutlined, LinkOutlined, DeleteOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import { MallConfMaterialVo, MaterialType } from '../../const'
import { download } from '../../contexts/util'
import styles from './index.module.less'
import { assembleResizeUrl, getVideoSnapshotUrl } from '@wmeimob/tencent-cloud'
import CopyToClipboard from 'copy-to-clipboard'

interface IProps {
  value: MallConfMaterialVo
  /** 是否选中 */
  checked?: boolean
  /** 编辑事件 */
  onEdit?: () => void
  /** 选中事件 */
  onChange?: () => void
  /** 删除事件 */
  onDelete?: () => void
  /** 禁用编辑 */
  disabledEdit?: boolean
  /** 禁用下载 */
  disabledDownload?: boolean
  /** 禁用复制链接 */
  disabledLink?: boolean
  /** 禁用删除 */
  disabledDelete?: boolean
  /** 禁用勾选 */
  disabledChecked?: boolean
}

const { Text } = Typography

function copytext(text: string) {
  CopyToClipboard(text) ? message.success('复制成功') : message.error('复制失败，请打开剪切板权限')
}

function getOssUrl(url?: string, type?: MaterialType) {
  if (url) {
    return type === MaterialType.Video ? url + getVideoSnapshotUrl({}) : url
  }
}

const MaterialCard: FC<IProps> = (props) => {
  const { value } = props

  const actions: ReactNode[] = useMemo(() => {
    const list: ReactNode[] = []
    if (!props.disabledEdit) {
      list.push(
        <Tooltip key="edit" title="编辑素材">
          <EditOutlined onClick={props.onEdit} />
        </Tooltip>
      )
    }
    if (!props.disabledDownload) {
      list.push(
        <Tooltip key="download" title="下载素材">
          <DownloadOutlined onClick={() => download(value.imgUrl!, value.name)} />
        </Tooltip>
      )
    }
    if (!props.disabledLink) {
      list.push(
        <Tooltip key="link" title="复制链接">
          <LinkOutlined onClick={() => copytext(value.imgUrl!)} />
        </Tooltip>
      )
    }
    if (!props.disabledDelete) {
      list.push(
        <Tooltip key="delete" title="删除素材">
          <DeleteOutlined onClick={props.onDelete} />
        </Tooltip>
      )
    }
    return list
  }, [value, props.disabledEdit, props.disabledDownload, props.disabledLink, props.disabledDelete])

  return (
    <Card
      className={props.checked ? styles.cardChecked : undefined}
      size="small"
      actions={actions}
      cover={<MaterialImg onClick={props.onChange} type={value.type} src={value.imgUrl} alt={value.name} extendParams={value.extendParams} />}
    >
      <div className={styles.between}>
        <div className={styles.strut}>
          <Text title={value.name}>{value.name}</Text>
        </div>
        {!props.disabledChecked && (
          <div>
            <Checkbox checked={props.checked} onChange={props.onChange} />
          </div>
        )}
      </div>
      <Text type="secondary">{dayjs(value.gmtCreated).format('YYYY-MM-DD')}上传</Text>
    </Card>
  )
}

export default MaterialCard

function MaterialImg({ type, src, alt, onClick, extendParams }) {
  function getfilesize(size) {
    // 把字节转换成正常文件大小
    if (!size) return ''
    const num = 1024.0 // byte
    if (size < num) return size + 'B'
    if (size < Math.pow(num, 2)) return (size / num).toFixed(2) + 'KB' // kb
    if (size < Math.pow(num, 3)) return (size / Math.pow(num, 2)).toFixed(2) + 'MB' // M
    if (size < Math.pow(num, 4)) return (size / Math.pow(num, 3)).toFixed(2) + 'G' // G
    return (size / Math.pow(num, 4)).toFixed(2) + 'T' // T
  }

  function changetime(value) {
    let secondTime = parseInt(value) // 秒
    let minuteTime = 0 // 分
    const hourTime = 0 // 小时
    if (secondTime > 60) {
      // 如果秒数大于60，将秒数转换成整数
      // 获取分钟，除以60取整数，得到整数分钟
      minuteTime = parseInt(secondTime / 60, 10)
      // 获取秒数，秒数取佘，得到整数秒数
      secondTime = parseInt(secondTime % 60, 10)
      // 如果分钟大于60，将分钟转换成小时
      // if (minuteTime > 60) {
      //   // 获取小时，获取分钟除以60，得到整数小时
      //   hourTime = parseInt(minuteTime / 60)
      //   // 获取小时后取佘的分，获取分钟除以60取佘的分
      //   minuteTime = parseInt(minuteTime % 60)
      // }
    }
    let time = secondTime > 10 ? secondTime : `0${secondTime}`

    if (minuteTime > 0) {
      time = `${minuteTime > 10 ? minuteTime : '0' + minuteTime}:${time}`
    } else {
      time = `00:${time}`
    }
    // if (hourTime > 0) {
    //   time = String(parseInt(hourTime)) + '小时' + time
    // }
    return time
  }

  return (
    <div className={styles.imageBox} onClick={onClick}>
      {/* 视频时长 */}
      {!!extendParams?.duration && <Tag className={styles.videoTime}>{changetime(extendParams?.duration)}</Tag>}
      <img
        className={styles.imageCover}
        src={type === MaterialType.Video ? `${src}${getVideoSnapshotUrl({ width: 200 })}` : assembleResizeUrl(src, { width: 200 })}
        alt={alt}
      />

      {/* 宽高、size信息 */}
      {!!extendParams?.width && (
        <div className={styles.imageMeasure}>
          <div>
            {extendParams?.width} * {extendParams?.height}
          </div>

          <div>{getfilesize(extendParams.size)}</div>
        </div>
      )}
    </div>
  )
}
