import { FC, memo, useMemo, useState } from 'react'
import { Image, Space } from 'antd'
import { IAlbumColumnProps } from './const'

/**
 * 相册列
 * @param props
 * @returns
 */
const Component: FC<IAlbumColumnProps> = (props) => {
  const { value = '', mode = 'album', ...imageProps } = props
  const [visible, setVisible] = useState(false)

  const images = useMemo<string[]>(() => {
    if (!value) {
      return []
    }
    if (typeof value === 'string') {
      return value.split(',')
    }
    return value
  }, [value])

  if (!images.length) return null

  return (
    <>
      {mode === 'album' && <Image width={100} {...imageProps} preview={{ visible: false }} src={images[0] || ''} onClick={() => setVisible(true)} />}
      <div style={{ display: mode === 'album' ? 'none' : 'block' }}>
        <Image.PreviewGroup preview={{ visible, onVisibleChange: (vis) => setVisible(vis) }}>
          <Space>
            {images.map((img, index) => (
              <Image key={img + index} src={img} {...imageProps} />
            ))}
          </Space>
        </Image.PreviewGroup>
      </div>
    </>
  )
}

Component.displayName = 'AlbumColumn'

const AlbumColumn = memo(Component)
export default AlbumColumn
