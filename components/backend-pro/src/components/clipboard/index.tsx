import { FC, memo, useEffect, useRef } from 'react'
import styles from './index.module.less'
import { IClipboardProps } from './const'
import ClipboardClass from 'clipboard'

const Component: FC<IClipboardProps> = (props) => {
  // 通过解构定义defaultProps
  const { text = '', onError, onSuccess } = props

  const divRef = useRef<HTMLDivElement>(null)
  const instance = useRef<ClipboardClass | null>(null)

  useEffect(() => {
    instance.current = new ClipboardClass(divRef.current!)

    onSuccess &&
      instance.current.on('success', (e) => {
        onSuccess(e.text, e)
      })

    onError &&
      instance.current.on('error', (e) => {
        onError(e)
      })

    return () => {
      if (instance.current) {
        instance.current.destroy()
        instance.current = null
      }
    }
  }, [props])

  return (
    <span ref={divRef} data-clipboard-text={text} className={styles.clipboardStyle}>
      {props.children}
    </span>
  )
}

Component.displayName = 'Clipboard'

const Clipboard = memo(Component)
export default Clipboard
