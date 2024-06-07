import { View } from '@tarojs/components'
import { MMRichText, Navigation, PageContainer } from '@wmeimob/taro-design'
import { FC, memo, useEffect } from 'react'
import { useAtom } from 'jotai'
import styles from './index.module.less'
import { memberCardRightDescAtom } from '../../store'

interface ICardRightsDescriptionProps {}

/**
 * 会员权益说明
 *
 * @param props
 * @returns
 */
const Component: FC<ICardRightsDescriptionProps> = () => {
  const [des, setDesc] = useAtom(memberCardRightDescAtom)

  useEffect(() => {
    return () => {
      setDesc('')
    }
  }, [])

  return (
    <PageContainer className={styles.cardDetailStyle}>
      <Navigation title="会员权益说明" />

      <View className={styles.rightDesc}>
        <MMRichText html={des} />
      </View>
    </PageContainer>
  )
}

const CardRightsDescription = memo(Component)
export default CardRightsDescription
