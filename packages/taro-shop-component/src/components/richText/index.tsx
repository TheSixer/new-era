import { FC, memo, useEffect, useMemo } from 'react'
import { View } from '@tarojs/components'
import { IMMRichTextProps } from './const'
import classNames from 'classnames'
import { isWeapp } from '../../config'
import styles from './index.modules.less'
import { getImage } from '@wmeimob/tencent-cloud'

/**
 *
 * @param {*} props
 * @deprecated 废弃。请使用taro-design中的MMRichText组件
 * @return {*}
 */
const Component: FC<IMMRichTextProps> = (props) => {
  const { html = '', className, ...rest } = props

  const innerHtml = useMemo(() => {
    return (
      html
        // 替换空格
        .replace(/&nbsp;/g, '\xa0')
        // 替换单引号
        .replace(/&quot;/g, "'")
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/<img[^>]+src="([^">]+)"/gim, (_, ...arg) => `<img src="${getImage(arg[0], 400)}"`)
    )
  }, [html])

  // 富文本视频第一帧作为封面
  const videoCover = (item, url) => {
    const video = item // 获取视频对象
    const canvas = document.createElement('canvas') // 创建canvas
    if (url) {
      video.src = url // video的url地址
      const ctx = canvas.getContext('2d') // 绘制2d
      video.crossOrigin = 'anonymous' // 解决跨域问题
      video.currentTime = 1 // 视频第一帧
      video.oncanplay = () => {
        canvas.width = video.clientWidth // 视频宽度
        canvas.height = video.clientHeight // 视频高度
        // 利用canvas对象方法绘图
        ctx?.drawImage(video, 0, 0, video.clientWidth, video.clientHeight)
      }
    }
  }
  useEffect(() => {
    const videos = document.querySelectorAll('video')
    // videos.forEach((item) => {
    //   // 参数item为video元素, item.firstChild.src为视频src地址
    //   console.log(item)
    //   videoCover(item, item?.firstChild?.src!)
    // })
  }, [innerHtml, videoCover])
  return (
    <View {...rest} className={classNames(className, 'mmRichText', styles.RichText)}>
      {!!html && (isWeapp ? <wxparse html={innerHtml} className={styles.RichText} /> : <View dangerouslySetInnerHTML={{ __html: innerHtml }} />)}
    </View>
  )
}

const MMRichText = memo(Component)
export default MMRichText
