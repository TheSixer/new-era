import { BasicModuleSignEnum, IModuleInfo, getDefaultComponetStyle, IBasicModuleRichText } from '@wmeimob-modules/decoration-data'
import { FC, memo } from 'react'
import useComponentStyle from '../../../hooks/useComponentStyle'
import icon from './icon.png'
import styles from './index.module.less'
import settingComponet from './settingComponet'

interface IImageModuleProps extends IBasicModuleRichText {}

function getDefaultProps() {
  return {
    data: '',
    componentStyle: getDefaultComponetStyle()
  }
}

const Component: FC<IImageModuleProps> = (props) => {
  const { componentStyle, data = '' } = props

  const { style } = useComponentStyle(componentStyle)

  const isEmpty = !data || data === '<p><br></p>'

  return (
    <div className={styles.imageModuleStyle} style={style}>
      {isEmpty ? (
        <div className={styles.img}>
          <img src={icon} />
        </div>
      ) : (
        <div dangerouslySetInnerHTML={{ __html: data }} />
      )}
    </div>
  )
}

Component.displayName = 'RichTextModule'
Component.defaultProps = getDefaultProps()

const RichTextModule = memo(Component)
export default RichTextModule

export const moduleInfo: IModuleInfo = {
  type: BasicModuleSignEnum.RichText,
  cname: '富文本',
  icon,
  getDefaultProps,
  settingComponet
}
