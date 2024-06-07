import { Image, Input, Swiper, SwiperItem, Text, View } from '@tarojs/components'
import { EModuleSearcType, getDefaultSearchModuleProps, IBasicModuleSearch } from '@wmeimob-modules/decoration-data'
import * as styles from '@wmeimob-modules/decoration-data/src/styles/search'
import { useLayoutEffect, useMemo, useRef, FC } from 'react'
import useComponentStyle from '../../hooks/useComponentStyle'
import searchIcon from './search.png'
import { getGlobalData } from '@wmeimob/taro-global-data'

interface IBasicModuleSearchProps extends IBasicModuleSearch {
  /** 点击搜索框 */
  onClick(keyword: string): void
}

/**
 *  搜索框组件
 *
 * @param {*} props
 * @return {*}
 */
const Component: FC<IBasicModuleSearchProps> = (props) => {
  // FIXME: 这里的轮播在页面hide之后应该要停止轮播。释放性能
  const { placeholder, type, componentStyle } = props

  const { style } = useComponentStyle(componentStyle)

  const keyword = useRef<string>('')

  const keywordsList = useMemo(() => (props.keywords || []).filter((it) => it.show), [props.keywords]) // 关键词列表

  const renderSwiper = !!keywordsList.length && type === EModuleSearcType.Swiper // 是否渲染轮播

  // 初始化设置keyword
  useLayoutEffect(() => {
    if (type === EModuleSearcType.Swiper) {
      keyword.current = keywordsList[0]?.text
    }
  }, [keywordsList, type])
  const isH5 = getGlobalData('isH5')

  return (
    <View style={{ ...styles.searchModuleStyle, ...style }}>
      <View style={styles.content} onClick={() => props.onClick(keyword.current)}>
        <Image src={searchIcon} style={styles.icon} />

        <View style={styles.contentWrapper}>
          {renderSwiper && (
            <View style={styles.swiperContent}>
              <Swiper
                vertical
                autoplay
                interval={2000}
                circular={!isH5}
                style={styles.swiperContent_swiper}
                onChange={(ev) => (keyword.current = keywordsList[ev.detail.current].text)}
              >
                {keywordsList.map((item, index) => (
                  <SwiperItem key={item.text + index}>
                    <Text style={{ color: '#CCCCCC' }}>{item.text}</Text>
                  </SwiperItem>
                ))}
              </Swiper>
            </View>
          )}

          <Input placeholder={renderSwiper ? undefined : placeholder} style={styles.input} placeholderStyle="color: #CCCCCC;" disabled />
        </View>
      </View>
    </View>
  )
}

Component.defaultProps = getDefaultSearchModuleProps()

const BasicModuleSearch = Component
export default BasicModuleSearch
