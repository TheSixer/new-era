import Taro from '@tarojs/taro'
import { memo, useMemo, FC } from 'react'
import { View, Image } from '@tarojs/components'
import { IImageListProps } from './const'
import styles from './index.module.less'
import classNames from 'classnames'
import { getGlobalData } from '@wmeimob/taro-global-data'

const Component: FC<IImageListProps> = (props) => {
  const { data, preview = true, gap = styles.spacingBase, column = 3 } = props

  const urls = useMemo(() => {
    return data && data.length ? data.filter((item) => !!item) : []
  }, [data])

  const handleImageClick = (current: string) => {
    if (preview) {
      Taro.previewImage({ current, urls })
    }
  }

  const isWeapp = getGlobalData('isWeapp')

  return (
    <View className={classNames(styles.imageListStyle, props.className)} style={props.style}>
      <View className={styles.content} style={{ width: `calc(100% + ${gap})`, justifyContent: props.justifyContent }}>
        {urls.map((src, index) => (
          <View
            className={styles.item}
            key={src + index}
            style={{
              width: `calc((100% - ${gap} * ${column}) / ${column})`,
              marginRight: gap,
              marginBottom: gap
            }}
          >
            <View className={styles.itemContent} onClick={() => handleImageClick(src)}>
              {isWeapp?<Image src={src} className={styles.itemCotentItem} mode="aspectFit"/>: <img className={styles.itemCotentItem} src={src}/>
              }
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}

const MMImageList = memo(Component)
export default MMImageList
