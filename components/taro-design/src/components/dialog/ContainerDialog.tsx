import MMDialog from '.'
import { IDialogProps } from './const'
import { useImperativeHandle, useState, forwardRef, memo } from 'react'

type IContainerDialogProps = Omit<IDialogProps, 'visible'>

export interface IContainerDialogRef {
  /**
   * 显示弹窗
   * @param option
   */
  show(option: IContainerDialogProps): void
}

/**
 * 对话框容器组件
 *
 * 对外暴露通用show方法来使用
 */
const Component = forwardRef<IContainerDialogRef, IContainerDialogProps>((props, ref) => {
  const initProps = () => ({ ...props, visible: false })
  const [dialogProps, setDialogProps] = useState(initProps)

  useImperativeHandle(
    ref,
    () => {
      function hide() {
        setDialogProps(initProps())
      }

      return {
        show(option: Omit<IDialogProps, 'visible'>) {
          const { onCancel, onOk, ...rest } = option
          setDialogProps((pre) => ({
            ...pre,
            ...rest,
            visible: true,
            onCancel: () => {
              hide()
              onCancel?.()
            },
            onOk: async () => {
              try {
                await onOk?.()
                hide()
              } catch (error) {}
            }
          }))
        }
      }
    },
    [props]
  )

  return <MMDialog {...dialogProps} />
})

const ContainerDialog = memo(Component)
export default ContainerDialog
