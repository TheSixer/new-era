import { memo, FC, useEffect, useState } from 'react'
import { RichText, View } from '@tarojs/components'
import { IComponentProps } from '../types'
import classNames from 'classnames'
import { nextTick } from '@tarojs/taro'
import styles from './index.module.less'
import { getImage } from '@wmeimob/tencent-cloud'

interface IRichTextProps extends IComponentProps {
  /**
   * 文本
   */
  html?: string
}

/**
 * 富文本组件
 *
 * @param props
 * @description 这里的组件只是富文本容器。要使用富文本组件。需要在页面的index.config.ts中声明
 * usingComponents: {
    wxparse: '../../../components/richText/wxParse/index' // 书写第三方富文本组件。具体组件位置以项目放置为准
  }
 * @returns
 */
const Component: FC<IRichTextProps> = (props) => {
  const { html, className, ...rest } = props

  const [innerHtml, setInnerHtml] = useState('')

  useEffect(() => {
    const converHtml = (html || '')
      // 替换空格
      .replace(/&nbsp;/g, '\xa0')
      // 替换单引号
      .replace(/&quot;/g, "'")
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/<img[^>]+src="([^">]+)"/gim, (_, ...arg) => `<img src="${getImage(arg[0], 400)}"`)
    setInnerHtml('')

    setTimeout(() => {
      setInnerHtml(converHtml)
    }, 100)
  }, [html])

  return (
    <View {...rest} className={classNames(className, 'mmRichText')}>
      <RichText nodes={innerHtml} className={styles.RichText} />
      {/*{!!innerHtml && <wxparse html={innerHtml} />}*/}
    </View>
  )
}

const MMRichText = memo(Component)
export default MMRichText
