import { MMEmpty, Navigation, PageContainer, MMRichText } from '@wmeimob/taro-design'
import { useAtomValue } from 'jotai'
import { FC, memo } from 'react'
import { signTaskExplainAtom } from '../../store'
import styles from './index.module.less'

interface ISignTaskExplainProps {}

const Component: FC<ISignTaskExplainProps> = () => {
  const explain = useAtomValue(signTaskExplainAtom)

  return (
    <PageContainer>
      <Navigation title="签到说明" shadow />

      {explain ? <MMRichText html={explain} className={styles.richText} /> : <MMEmpty fixed text="暂无说明" />}
    </PageContainer>
  )
}

const PageSignTaskExplain = memo(Component)
export default PageSignTaskExplain
