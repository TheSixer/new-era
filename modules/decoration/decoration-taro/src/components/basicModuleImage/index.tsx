import { Image, ScrollView, View } from '@tarojs/components'
import { BasicModuleImageDTO, getModuleImageDefaultProps, IJumpLink, ImageLinkDataDTO } from '@wmeimob-modules/decoration-data'
import { EArrangeType } from '@wmeimob-modules/decoration-data/src/enums/EArrangeType'
import { EJumpLinkMode } from '@wmeimob-modules/decoration-data/src/enums/EJumpLinkMode'
import classNames from 'classnames'
import { CSSProperties, FC } from 'react'
import { getMaxScreenWitdh } from '../../const'
import useComponentStyle from '../../hooks/useComponentStyle'
import HotZone from '../hotZone'
import styles from './index.module.less'
import { getImage } from '../../../../../../components/aliyun'

export interface IBasicModuleImageProps extends BasicModuleImageDTO {
  /**
   * 点击链接跳转
   * @param item 跳转配置
   * @param index 图片索引
   */
  onLinkJump?(item: IJumpLink, index: number): void
}

const Component: FC<IBasicModuleImageProps> = (props) => {
  const { arrangeType, data = [], contentStyle, componentStyle } = props
  const { pagePadding = 0 } = componentStyle

  const { style, css } = useComponentStyle(componentStyle)

  let imageStyle: CSSProperties = {}

  if (arrangeType === EArrangeType.Orientation) {
    imageStyle = {
      borderRadius: contentStyle.borderRadius + 'px',
      marginRight: contentStyle.imageMargin + 'px'
    }
  } else if (arrangeType === EArrangeType.Scroll) {
    imageStyle = {
      borderRadius: contentStyle.borderRadius + 'px',
      marginRight: contentStyle.imageMargin + 'px'
    }
  } else {
    imageStyle = {
      width: getMaxScreenWitdh() - pagePadding * 2,
      borderRadius: contentStyle.borderRadius + 'px',
      marginBottom: contentStyle.imageMargin + 'px'
    }
  }

  const rootImageClass = classNames(
    styles.basicModuleImageStyle,
    {
      [EArrangeType.Vertical]: styles.vertical,
      [EArrangeType.Orientation]: styles.orientation
    }[arrangeType]
  )

  const handleClick = (item: ImageLinkDataDTO, index: number) => {
    if (item.jumpMode === EJumpLinkMode.Link) {
      props.onLinkJump?.(item.link, index)
      // navByLink(link.type, link.content, { pageType, pageParams })
    }
  }

  return arrangeType === EArrangeType.Scroll ? (
    <ScrollView scrollX>
      <View style={{ paddingTop: css.paddingTop, paddingBottom: css.paddingBottom }} className={classNames(styles.basicModuleImageStyle, styles.scroll)}>
        <View style={{ width: css.paddingLeft }} className={styles.scoll_place} />
        {data.map((item, index) => (
          <View
            key={item.key}
            style={{ ...imageStyle, marginRight: index === data.length - 1 ? 0 : imageStyle.marginRight }}
            className={styles.scroll_item}
            onClick={() => handleClick(item, index)}
          >
            <View className={styles.scroll_img} style={{ backgroundImage: `url(${getImage(item.url, 400)})` }} />
            <HotZone data={item.hotZones} mode={item.jumpMode} onClick={(it) => props.onLinkJump?.(it.link, index)} />
          </View>
        ))}
        <View style={{ width: css.paddingRight }} className={styles.scoll_place} />
      </View>
    </ScrollView>
  ) : (
    <View className={rootImageClass} style={style}>
      {arrangeType === EArrangeType.Vertical &&
        data.map((item, index) => (
          <View key={item.key} className={styles.imgWrapper} style={imageStyle} onClick={() => handleClick(item, index)}>
            <Image mode="widthFix" src={getImage(item.url, 400)} className={styles.img} />
            <HotZone data={item.hotZones} mode={item.jumpMode} onClick={(it) => props.onLinkJump?.(it.link, index)} />
          </View>
        ))}

      {arrangeType === EArrangeType.Orientation &&
        data.map((item, index) => (
          <View key={item.key} style={imageStyle} className={styles.orientation_item} onClick={() => handleClick(item, index)}>
            {/* <View className={styles.orientation_img} style={{ backgroundImage: `url(${item.url})` }} /> */}
            <Image mode="widthFix" src={getImage(item.url, 400)} className={styles.orientation_img} />
            <HotZone data={item.hotZones} mode={item.jumpMode} onClick={(it) => props.onLinkJump?.(it.link, index)} />
          </View>
        ))}
    </View>
  )
}

Component.defaultProps = getModuleImageDefaultProps()

const BasicModuleImage = Component
export default BasicModuleImage
