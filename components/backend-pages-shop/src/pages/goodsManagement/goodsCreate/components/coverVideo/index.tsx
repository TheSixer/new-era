import { forwardRef, memo } from 'react'
import styles from './index.module.less'
import { ICoverVideoProps } from './const'
import MaterialSelect from '@wmeimob/backend-pages/src/components/material/components/materialSelect'
import { MaterialType } from '@wmeimob/backend-pages/src/components/material/const'
import { MaterialVo } from '@wmeimob/backend-api'
import { message } from 'antd'

const Component = forwardRef<HTMLDivElement, ICoverVideoProps>((props, ref) => {
  function handleChange(videoUrl: string, materials?: MaterialVo) {
    if (materials && materials?.extendParams?.size && (props.maxSize || props.maxDuration)) {
      if (props.maxSize && materials?.extendParams?.size > props.maxSize * 1024 * 1024) {
        message.error(`视频大小不能超过${props.maxSize}MB`)
        return
      }

      if (props.maxSize && materials?.extendParams?.duration > props.maxDuration) {
        message.error(`视频大小不能超过${props.maxDuration}秒`)
        return
      }
    }
    props.onChange?.(videoUrl)
  }

  return (
    <div className={styles.coverVideoStyle} ref={ref}>
      <MaterialSelect
        maxLength={1}
        repeatTip
        measure={375}
        {...props}
        type={MaterialType.Video}
        value={props.value}
        onChange={(videoUrl, materials) => handleChange(videoUrl as string, materials as MaterialVo)}
      />
      {(props.maxSize || props.maxDuration) && (
        <div>
          视频
          {props.maxSize && <span>不能超过${props.maxSize}MB</span>}
          {props.maxDuration && <span>不能超过${props.maxDuration}秒</span>}
        </div>
      )}
    </div>
  )
})

Component.displayName = 'CoverVideo'

const CoverVideo = memo(Component)
export default CoverVideo
