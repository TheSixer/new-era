import { FC, memo, useState } from 'react'
import styles from './index.module.less'
import { ISearchInputProps } from './const'
import MMNavigation from '../../components/navigation'
import MMSearchInput from '../../components/search-input'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import MMIconFont from '~/components/icon-font'
import MMIconFontName from '~/components/icon-font/const'
import { H3 } from '~/components'

const Component: FC<ISearchInputProps> = props => {
  const handleSearch = data => {
    Taro.showToast({ icon: 'none', title: data })
  }

  return (
    <View className={styles.searchInputStyle}>
      <MMNavigation title="搜索栏2" />

      <View className="spacing" />
      <H3>普通搜索框</H3>
      <MMSearchInput placeholder="请输入商品查询" onSearch={handleSearch} />

      <View className="spacing" />
      <H3>自定义后缀</H3>
      <MMSearchInput placeholder="请输入商品查询" onSearch={handleSearch} renderSuffix={<MMIconFont value={MMIconFontName.Search} />} />

      <View className="spacing" />
      <H3>只读</H3>
      <MMSearchInput defaultValue="奥妙洗衣液" readonly />
    </View>
  )
}

Component.displayName = 'SearchInput'

const SearchInputPage = memo(Component)
export default SearchInputPage
