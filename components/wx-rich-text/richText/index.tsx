import Taro from '@tarojs/taro'
import { FC, memo, useMemo } from 'react'
import { View } from '@tarojs/components'
import { IMMRichTextProps } from './const'
import classNames from 'classnames'

const Component: FC<IMMRichTextProps> = props => {
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
    )
  }, [html])
  console.log(`21312312  ______  `, 21312312)
console.log(`innerHtml  ______  `, innerHtml)
  return (
    <View {...rest} className={classNames(className, 'mmRichText')}>
      {!!html && <wxparse html={innerHtml} />}
    </View>
  )
}

const MMRichText = memo(Component)
export default MMRichText
