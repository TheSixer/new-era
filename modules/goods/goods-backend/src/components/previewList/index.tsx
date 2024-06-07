import { memo, FC, CSSProperties } from 'react'
import { Badge, Image, Space } from 'antd'
import { ImageProps } from 'antd/es/image'
import { getResizeUrl } from '@wmeimob/aliyun'

interface IProps extends Pick<ImageProps, 'fallback'> {
  /** 首图是否标签化 */
  firstBadge?: boolean
  /** 资源列表 */
  list?: string | string[]
  /** 单个图片大小 */
  size?: number | [number, number]
  /** 默认cover */
  mode?: 'cover' | 'fill' | 'contain' | 'none' | 'scale-down'
}

/**
 * 多媒体列表(预览)组件 暂只支持图片、有需要可以扩展视频等
 */
const Component: FC<IProps> = (props) => {
  const { mode = 'cover', list, size = 120, firstBadge } = props

  const [width, height] = Array.isArray(size) ? size : [size, size]

  const style: CSSProperties = { objectFit: mode }

  const images = Array.isArray(list) ? list : [list]

  return (
    <Image.PreviewGroup>
      <Space wrap>
        {images.map((src, index) => {
          const key = `${src}-${index}`

          const imgProps: ImageProps = {
            src: src + getResizeUrl({ width }),
            style,
            width,
            height,
            preview: { src }
          }

          return firstBadge && index === 0 ? (
            <Badge.Ribbon text="主图" placement="start">
              <Image key={key} {...imgProps} />
            </Badge.Ribbon>
          ) : (
            <Image key={key} {...imgProps} />
          )
        })}
      </Space>
    </Image.PreviewGroup>
  )
}

const PreviewList = memo(Component)
export default PreviewList
