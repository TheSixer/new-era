import { getResizeUrl } from '@wmeimob/tencent-cloud'
import IconFont from '@wmeimob/backend-pro/src/components/iconFont'
import IconFontName from '@wmeimob/backend-pro/src/components/iconFont/name'
import { FC, memo } from 'react'
import useComponentStyle from '../../../hooks/useComponentStyle'
import { IModuleInfo, BasicModuleSignEnum } from '@wmeimob-modules/decoration-data'
import { getDefaultProps, ITitleModuleProps } from './const'
import styles from './index.module.less'
import settingComponet from './settingComponet'

const Component: FC<ITitleModuleProps> = (props) => {
  const { name, left, right, componentStyle, contentStyle } = props

  const { backgroundColor, ...restStyle } = contentStyle
  const size = 20
  const sizePx = `${size}px`

  const { style } = useComponentStyle(componentStyle)

  return (
    <div className={styles.titleModuleStyle} style={{ ...style }}>
      <div className={styles.content} style={{ backgroundColor }}>
        {left.show && (
          <div className={styles.left}>
            {left.image ? (
              <img src={left.image + getResizeUrl({ width: size, height: size })} style={{ width: sizePx, height: sizePx }} />
            ) : (
              <IconFont value={left.icon} size={size} color={restStyle.color} />
            )}
          </div>
        )}

        <div className={styles.text} style={restStyle}>
          {name}
        </div>

        <div className={styles.right}>
          {!!right.content && <span className={styles.rightContent}>{right.content}</span>}
          {right.showArrow && <IconFont value={IconFontName.Next} size={12} color="#cccccc" />}
        </div>
      </div>
    </div>
  )
}

Component.displayName = 'TitleModule'
Component.defaultProps = getDefaultProps()

const TitleModule = memo(Component)
export default TitleModule

export const moduleInfo: IModuleInfo = {
  type: BasicModuleSignEnum.Title,
  cname: '标题栏',
  icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAABkCAYAAAAv8xodAAAAAXNSR0IArs4c6QAABUZJREFUeAHt3H9S20YYxvF3bfHTkKYhNAXskhmmmSYXyAVyqByht+kFcoFeoO2kkxlCbGgwUIohAWOj6PX0D2QnRFZWXu3qq5nMxEaW9v3s4420WiLChgACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAALjAmb8DRuv3/z55slA4l9jiV9ILKs2jskxAhEw0jNiXkViXu483XltuyrrgR6FOY5/T8J833ZjOV44AkmoTyNjntsOdc020f8jM2G2DRvY8XTA06zYLst6oEeXGbZbyfGCFCgiK9YDzTVzkNkrpqgC7q/sB7qY0jkqApkECHQmJnbyRYBA+9JTtDOTAIHOxMROvggQaF96inZmEiDQmZjYyRcBAu1LT9HOTAIEOhMTO/kiQKB96SnamUkgyrRXwTvNzc/J+vqaNBrLUqv7/R27Gd7IxcUH6XaP5bp/XbBc8Yev1YzUanUZDAbFn8zCGZwHWsO8/bgp9XrdQjnuD6FfyNV7K7LcWJK3u22vQ601bDU3kkDXpHd2Lgf77yWOY/fId7TA+XCoI3MoYb7trDVpbT5vD9a+H4VZa9AvqQ480ZzzMfBOUueB1suMUDffaxtcpy8zFhYXklC3ZGlpsbRd5jzQpZWhYdI9PJLLj5cpiSiqS2t7S+59V85fRHIeaL2BCnXzvbZhcoO797YjZ2e9VBcZY2Rj85Gs/1C+SyrngdbZgOFwmAIL4YXWpLX5vulN4EHnvRx1TyZuCPUaW28aTTITUpbNeaB1aktnA/QuWqe8fN+0Bq3F9xmO8X44PjoZBfvmJt1HK6sN2d4uz82i9a/WX3/8Xe55nfGe4vVUAnpj2ExG5fHZjsFgKO29jlxd9ac63i/PfraaQecj9FTVs7NzgavLK9ndfffZm8X1Rw+dt49AO+8C/xowTEbj/meeglodanOylHuWPGdRfKw4AZ3h2Gz+KCsrjdRJdEake+j+JphAp7qFF3cJ1JPH+lutzYkHK7rOo723P/X1813nyvszAp1XrmKfi6JIWj9tyvzCfKryfr8/CvP12FPF1E4zfEGgZ4jt66k0xK1kZB6f2dCniO13B6V6jkCgfU3ZjNqt6za2WhsTC8guzj9Ip30w8bBlRs364mlKEeiQ1kN/UdrSD2a53nppeVGaycisy0dvb2f/9UZLSW+/V5a/Ow90aOuhi+7YWa63Xnv4YCLMJ8eno0VLRdeZ9/jpr17eo3zD50JdD/0NJJk+Oov11jrffHvT1Xf6p8yb8xHa9zXDLju3aLvDJLw676w3gyfH/8p578JluZnO7TzQmVrJTk4EdITe7/zj5Nx5T+r8ksP3NcN54W18DrtJReeBDnU99CS13XdCWW9tV0XEeaBDWw9tu4PGjxfqeuvxOvO+LsU1tIbat2u1vOB8rlgB5yN0seVx9KoJEOiq9Xjg9RLowDu4auUR6Kr1eOD1EujAO7hq5RHoqvV44PUS6MA7uGrlEeiq9Xjg9RLowDu4auXZD7SR9P/sVzVR6s0uUEBWrAfaiHmVvSL2rLJAEVmxHuhIzMukoadV7ihq/7qAZkSz8vU9p9vDeqB3nu68jox5nvymw29SwD8p05XH3qUTSDKh2dCMaFZK1z4ahAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAQIACnwBjBUyCY4tJbwAAAABJRU5ErkJggg==',
  getDefaultProps,
  settingComponet
}
