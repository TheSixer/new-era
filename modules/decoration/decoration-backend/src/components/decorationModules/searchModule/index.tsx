import { EModuleSearcType, getDefaultSearchModuleProps, IBasicModuleSearch, IModuleInfo, BasicModuleSignEnum } from '@wmeimob-modules/decoration-data'
import * as styles from '@wmeimob-modules/decoration-data/src/styles/search'
import { Carousel } from 'antd'
import { FC, memo, useMemo } from 'react'
import useCarousel from '../../../hooks/useCarousel'
import useComponentStyle from '../../../hooks/useComponentStyle'
import searchIcon from './images/icon.png'
import icon from './images/search.png'
import settingComponet from './settingComponet'

interface ISearchModuleProps extends IBasicModuleSearch {}

const Component: FC<ISearchModuleProps> = (props) => {
  const { placeholder, keywords, type, componentStyle } = props
  const { carouselRef } = useCarousel(2)
  const { style } = useComponentStyle(componentStyle)

  const keywordsList = useMemo(() => (keywords || []).filter((it) => it.show), [keywords])

  const renderSwiper = !!keywordsList.length && type === EModuleSearcType.Swiper

  return (
    <div style={{ ...styles.searchModuleStyle, ...style }}>
      <div style={styles.content}>
        <img src={searchIcon} style={styles.icon} />

        <div style={styles.contentWrapper}>
          {renderSwiper && (
            <div style={styles.swiperContent}>
              <Carousel ref={carouselRef} effect="fade" style={styles.swiperContent_swiper}>
                {keywordsList.map((item, index) => {
                  return (
                    <div key={item.text + index} style={{ color: '#CCCCCC' }}>
                      {item.text}
                    </div>
                  )
                })}
              </Carousel>
            </div>
          )}

          <input placeholder={renderSwiper ? undefined : placeholder} style={{ ...styles.input, pointerEvents: 'none' }} readOnly disabled />
        </div>
      </div>
    </div>
  )
}

Component.displayName = 'SearchModule'
Component.defaultProps = getDefaultSearchModuleProps()

const SearchModule = memo(Component)
export default SearchModule

export const moduleInfo: IModuleInfo = {
  type: BasicModuleSignEnum.Search,
  cname: '搜索栏',
  icon,
  getDefaultProps: getDefaultSearchModuleProps,
  settingComponet
}
