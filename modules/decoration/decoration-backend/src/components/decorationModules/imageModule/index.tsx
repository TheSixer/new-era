import { IModuleInfo, BasicModuleSignEnum, BasicModuleImageDTO, getModuleImageDefaultProps } from '@wmeimob-modules/decoration-data'
import { EArrangeType } from '@wmeimob-modules/decoration-data/src/enums/EArrangeType'
import classNames from 'classnames'
import { CSSProperties, FC, memo } from 'react'
import useComponentStyle from '../../../hooks/useComponentStyle'
import ModuleInfoCard from '../../moduleInfoCard'
import icon from './icon.png'
import styles from './index.module.less'
import settingComponet from './settingComponet'

interface IImageModuleProps extends BasicModuleImageDTO {}

const Component: FC<IImageModuleProps> = (props) => {
  const { arrangeType, data = [], contentStyle, componentStyle } = props
  const { pagePadding = 0 } = componentStyle

  const { style } = useComponentStyle(componentStyle)

  let imageStyle: CSSProperties = {}

  if (arrangeType === EArrangeType.Orientation) {
    imageStyle = {
      borderRadius: contentStyle.borderRadius,
      marginRight: contentStyle.imageMargin
    }
  } else if (arrangeType === EArrangeType.Scroll) {
    imageStyle = {
      borderRadius: contentStyle.borderRadius,
      marginRight: contentStyle.imageMargin
    }
  } else {
    imageStyle = {
      width: 375 - pagePadding * 2,
      borderRadius: contentStyle.borderRadius,
      marginBottom: contentStyle.imageMargin
    }
  }

  return (
    <div
      className={classNames(
        styles.imageModuleStyle,
        arrangeType === EArrangeType.Orientation && styles.orientation,
        arrangeType === EArrangeType.Scroll && styles.scroll
      )}
      style={style}
    >
      {arrangeType === EArrangeType.Vertical && data.map((item) => <img key={item.key} src={item.url} style={imageStyle} className={styles.img} />)}

      {arrangeType === EArrangeType.Orientation &&
        data.map((item, index) => (
          <div key={item.key} style={imageStyle} className={styles.orientation_item}>
            <img className={styles.orientation_img} src={item.url} />
            {/* {index === data.length - 1 ? (
              <img className={styles.orientation_img1} src={item.url} />
            ) : (
              <div className={styles.orientation_img} style={{ backgroundImage: `url(${item.url})` }} />
            )} */}
          </div>
        ))}

      {arrangeType === EArrangeType.Scroll &&
        data.map((item) => (
          <div key={item.key} style={imageStyle} className={styles.scroll_item}>
            <div className={styles.scroll_img} style={{ backgroundImage: `url(${item.url})` }} />
          </div>
        ))}
      {!data.length && <ModuleInfoCard type={BasicModuleSignEnum.Image} text={false} style={{ minHeight: 140 }} />}
    </div>
  )
}

Component.displayName = 'ImageModule'
Component.defaultProps = getModuleImageDefaultProps()

const ImageModule = memo(Component)
export default ImageModule

export const moduleInfo: IModuleInfo = {
  type: BasicModuleSignEnum.Image,
  cname: '图片导航',
  icon,
  getDefaultProps: getModuleImageDefaultProps,
  settingComponet
}
