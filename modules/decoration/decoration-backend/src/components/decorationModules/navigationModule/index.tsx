import { getResizeUrl } from '@wmeimob/tencent-cloud'
import { getGlobalData } from '@wmeimob/backend-store'
import { IModuleInfo, BasicModuleSignEnum } from '@wmeimob-modules/decoration-data'
import { ENavArrangeType } from '@wmeimob-modules/decoration-data/src/enums/ENavArrangeType'
import { FC, memo } from 'react'
import useComponentStyle from '../../../hooks/useComponentStyle'
import { getDefaultProps, INavigationModuleProps } from './const'
import icon from './icon.png'
import styles from './index.module.less'
import settingComponet from './settingComponet'

const { decorationConfig } = getGlobalData('systemConfig')

const { size: imgSize } = decorationConfig.nav

const Component: FC<INavigationModuleProps> = (props) => {
  const { size, data = [], componentStyle, arrangeType, iconShape } = props

  const { style } = useComponentStyle(componentStyle)
  const { paddingTop, paddingBottom, backgroundColor, ...rootStyle } = style

  return (
    <div className={styles.navigationModuleStyle} style={rootStyle}>
      <div className={styles.content} style={{ paddingTop, paddingBottom }}>
        <div className={styles.innerContent} style={{ backgroundColor, borderRadius: 8 }}>
          {data.map((value, index) => (
            <div className={styles.item} key={index} style={{ [arrangeType === ENavArrangeType.Average ? 'flex' : 'width']: size === 'large' ? '25%' : '20%' }}>
              {value.url ? (
                <img
                  src={value.url + getResizeUrl({ height: imgSize, width: imgSize })}
                  style={{ width: imgSize, height: imgSize, borderRadius: iconShape === 'square' ? undefined : '50%' }}
                />
              ) : (
                <div className={styles.img_placeholder} />
              )}
              <div className={styles.text}>{value.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

Component.displayName = 'NavigationModule'
Component.defaultProps = getDefaultProps()

const NavigationModule = memo(Component)
export default NavigationModule

export const moduleInfo: IModuleInfo = {
  type: BasicModuleSignEnum.Navigation,
  cname: '导航',
  icon,
  getDefaultProps,
  settingComponet
}
