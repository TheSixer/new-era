import MMFixFoot from '@wmeimob/taro-design/src/components/fix-foot'
import { FC, memo } from 'react'
import { ActivityOutputDto } from '@wmeimob/taro-api'
import { Button, View } from '@tarojs/components'
import Countdown from '../countdown'
import styles from './index.module.less'

interface IFooterBarProps {
  info: ActivityOutputDto | null
  onSign(): void
}

const Component: FC<IFooterBarProps> = (props) => {
  const { info, onSign } = props

  // 处于进行中的限时抢购 或 【未开始的限时抢购 且没有其他常规活动】
  return (
    <MMFixFoot className={styles.foorter} dynamic>
      <View className={styles.buttons}>
        <Countdown startTime={info?.startTime} endTime={info?.endTime} />
        {
          info?.activityStatus === 1 && <Button className={styles.sign_btn} onClick={() => onSign()}>立即报名</Button>
        }
      </View>
    </MMFixFoot>
  )
}

const FooterBar = memo(Component)
export default FooterBar
