import { FC, memo, useEffect, useState } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { IHotKeywordProps } from './const'
import styles from './index.module.less'
import { HotKeywordDto } from '@wmeimob/taro-api'
import { navByLink } from '../../../../../components/pageModules/utils'
import { JumpTypeValue } from '../../../../../components/pageModules/const'
import { EJumpType } from '@wmeimob-modules/decoration-data/src/enums/EJumpType'
import { api } from '@wmeimob/taro-api'

const Component: FC<IHotKeywordProps> = (props) => {
  const { onQuickSearch } = props

  const [hotKeywords, setHotKeywords] = useState<HotKeywordDto[]>([])

  useEffect(() => {
    getHotKeywords()
  }, [])

  async function getHotKeywords() {
    const { data } = await api['/wechat/hotKeyword/hot_GET']()
    setHotKeywords(data || [])
  }

  function handleHotKeywordClick(item: HotKeywordDto) {
    const jump: JumpTypeValue = item.url ? JSON.parse(item.url) : { type: EJumpType.None, content: {} }

    if (jump.type === EJumpType.None) {
      onQuickSearch?.(item.hotKeyword!)
      return
    }

    navByLink(jump.type, jump.content)
  }

  if (!hotKeywords.length) {
    return null
  }

  return (
    <View className={styles.hotKeywordStyle}>
      <View className={styles.hotSearchTitle}>热门搜索</View>

      <View className={styles.hotSearchContent}>
        {hotKeywords.map((item, index: number) => (
          <View key={index} className={styles.item} onClick={() => handleHotKeywordClick(item)}>
            {item.icon && <Image src={item.icon} className={styles.hotIcon} mode="aspectFit" />}
            <Text>{item.hotKeyword}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}

const HotKeyword = memo(Component)
export default HotKeyword
